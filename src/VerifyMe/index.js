'use strict'

// const got = require('got')
const querystring = require('querystring')
const FormData = require('form-data')
const _ = require('lodash')

/*
 * Provides a convenience extension to _.isEmpty which allows for
 * determining an object as being empty based on either the default
 * implementation or by evaluating each property to undefined, in
 * which case the object is considered empty.
 */
_.mixin(function () {
    // reference the original implementation
    var _isEmpty = _.isEmpty
    return {
      // If defined is true, and value is an object, object is considered
      // to be empty if all properties are undefined, otherwise the default
      // implementation is invoked.
      isEmpty: function (value, defined) {
        if (defined && _.isObject(value)) {
          return !_.some(value, function (value, key) {
            return value !== undefined
          })
        }
        return _isEmpty(value)
      }
    }
  }())
  
  const isBase64String = (b64String) => {
    let base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    return typeof b64String !== 'string'
      ? false
      : b64String.length % 4 == 0 && base64Regex.test(b64String)
  }
  
  const isLiteralFalsey = (variable) => {
    return (variable === '' || variable === false || variable === 0)
  }
  
  const checkTypeName = (target, type) => {
    let typeName = ''
    if (isLiteralFalsey(target)) {
      typeName = (typeof target)
    } else {
      typeName = ('' + (target && target.constructor.name))
    }
    return !!(typeName.toLowerCase().indexOf(type) + 1)
  }
  
  const isTypeOf = (value, type) => {
    let result = false
  
    type = type || []
  
    if (typeof type === 'object') {
      if (typeof type.length !== 'number') {
        return result
      }
  
      let bitPiece = 0
      type = [].slice.call(type)
  
      type.forEach(_type => {
        if (typeof _type === 'function') {
          _type = (_type.name || _type.displayName).toLowerCase()
        }
        bitPiece |= (1 * (checkTypeName(value, _type)))
      })
  
      result = !!(bitPiece)
    } else {
      if (typeof type === 'function') {
        type = (type.name || type.displayName).toLowerCase()
      }
  
      result = checkTypeName(value, type)
    }
  
    return result
  }
  
  const setPathName = (config, values) => {
    return config.path.replace(/\{:([\w]+)\}/g, function (
      match,
      string,
      offset) {
      let _value = values[string]
      return isTypeOf(
        _value,
        config.route_params[string]
      )
        ? _value
        : null
    })
  }
  
  const _jsonify = (data) => {
    if (data instanceof Buffer) {
      return data.toString('base64');
    }
  
    if (data instanceof Date) {
      return data.toLocaleDateString()
    }
  
    return !data ? 'null'
      : (typeof data === 'object'
        ? ('toJSON' in data) ? data.toJSON() : JSON.stringify(data)
        : data)
  }
  
  const setInputValues = (config, inputs) => {
    let httpReqOptions = {}
    let inputValues = {}
    let label = ''
  
    switch (config.method) {
      case 'GET':
      case 'HEAD':
        label = 'query'
        break
  
      case 'POST':
      case 'PUT':
      case 'PATCH':
      case 'DELETE':
        label = 'body'
        break
    }
  
    httpReqOptions[label] = {}
  
    if (config.param_defaults) {
      inputs = Object.assign({}, config.param_defaults, inputs)
    }
  
    for (var input in config.params) {
      if (config.params.hasOwnProperty(input)) {
        let param = input.replace('$', '')
        let _input = inputs[param]
        let _type = config.params[input]
        let _required = false
  
        if ((input.indexOf('$') + 1) === (input.length)) {
          _required = true
        }
  
        if (_input === void 0 || _input === '' || _input === null) {
          if (_required) { throw new Error(`param: "${param}" is required but not provided; please provide as needed`) }
        } else {
          httpReqOptions[label][param] = isTypeOf(_input, _type)
            ? (label === 'query'
              ? querystring.escape(_jsonify(_input))
              : _jsonify(_input))
            : null
  
          if (httpReqOptions[label][param] === null) {
            throw new Error(`param: "${param}" is not of type ${_type.name}; please provided as needed`)
          }
        }
      }
    }
  
    inputValues[label] = (label === 'body'
      ? (config.send_form
        ? httpReqOptions[label]
        : JSON.stringify(httpReqOptions[label])
      )
      : querystring.stringify(httpReqOptions[label]))
  
    return inputValues
  }
  
  const makeMethod = function (config) {
    let httpConfig = {
      headers: {
        'Cache-Control': 'no-cache',
        'Accept': 'application/json'
      }
    }
  
    if (config.send_json) {
      httpConfig.headers['Content-Type'] = httpConfig.headers['Accept']
      httpConfig.form = false
    } else if (config.send_form) {
      httpConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      httpConfig.form = true
    } else if (config.send_multipart) {
      let form = new FormData()
      httpConfig.headers = Object.assign(form.getHeaders(), httpConfig.headers)
      httpConfig.headers['Content-Type'] = httpConfig.headers['content-type']
      delete httpConfig.headers['content-type']
      httpConfig.body = form
    }
  
    return function (requestParams = {}) {
      let pathname = false
      let payload = false
  
      if (!isTypeOf(requestParams, 'object')) {
        throw new TypeError('invalid argument type')
      }
  
      if (!_.isEmpty(requestParams, true)) {
        if (config.params !== null) {
          payload = setInputValues(config, requestParams)
        }
  
        if (config.route_params !== null) {
          pathname = setPathName(config, requestParams)
        } else {
          pathname = config.path
        }
      } else {
        if (config.params !== null ||
               config.route_params !== null) {
          throw new Error('requestParam(s) Are Not Meant To Be Empty!')
        }
      }
  
      if (payload === false) {
        payload = {}
      }

      let reqBody = {}

      for (let type in payload) {
        if (payload.hasOwnProperty(type)) {
          if (config.send_multipart) {
            if (httpConfig[type] instanceof FormData) {
              let form = httpConfig[type]
              let entityBody = JSON.parse(payload[type])
  
              _.forEach(entityBody, (value, key) => {
                if (isBase64String(value)) {
                  form.append(key, Buffer.from(value, 'base64'))
                  return;
                }
  
                form.append(key, value)
              })
  
              reqBody = httpConfig[type] = form
            }
          } else {
            reqBody = httpConfig[type] = (type === 'query') ? payload[type] : JSON.parse(payload[type])
          }
        }
      }
  
      let reqVerb = config.method.toLowerCase()
  
      const canInvokeTestingMock = (
        this._mock !== null &&
        typeof this._mock[methodName] === 'function'
      )
  
      if (canInvokeTestingMock) {
        if (methodName !== 'getPhotoMatchValidityResult') {
          return this._mock[methodName](
            Object.assign(
              httpConfig,
              { 'method': config.method }
            ))
        } else if (isTypeOf(reqBody.card, Object) ||
                   isTypeOf(reqBody.bank, Object)) {
  
          
  
          // 
          const isTestPersonaNIN = /^(?:057|011)$/.test(String(code))
          /* eslint-disable-next-line camelcase */
          const isTestPersonaName = account_number === '0000000000'
          const isTestFacePhoto = (isTestPersonaNIN && isTestPersonaName)
  
          if (!isTestFacePhoto) {
            return this._mock[methodName](
              Object.assign(
                httpConfig,
                { 'method': config.method }
              )
            )
          }
        }
      }

      return this.httpBaseClient[reqVerb](pathname, httpConfig)
    }
  }
  
  class VerifyMeAPI extends Mockable {
    get httpClientBaseOptions () {
      return {
        headers: { },
        hooks: {
          beforeResponse: [
            async options => {
              // console.log(options)
            }
          ],
          onError: [
            error => {
                const { response } = error
                if (response && response.body) {
                  error.name = 'VerifyMeError'
                  error.message = `${response.body.message} (${error.statusCode})`
                }

                return error
            }
          ]
        },
      }
    }
    constructor (got, accessToken, isProd = true) {
      super()
      /* eslint-disable camelcase */
      var api_base = {
        sandbox: 'https://vapi.verifyme.ng',
        live: 'https://vapi.verifyme.ng'
      }
  
      const bearerHeaderValue = `Bearer ${accessToken}`
      const clientOptions = this.httpClientBaseOptions

      clientOptions.baseUrl = !isProd ? api_base.sandbox : api_base.live
      clientOptions.headers['Authorization'] = bearerHeaderValue

      /* eslint-enable camelcase */
      this.httpBaseClient = got.extend(clientOptions)
    }
  }
  
  for (let methodName in apiEndpoints) {
    if (apiEndpoints.hasOwnProperty(methodName)) {
      VerifyMeAPI.prototype[methodName] = makeMethod(apiEndpoints[methodName])
    }
  }
  
  module.exports = VerifyMeAPI
  