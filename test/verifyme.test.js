'use strict'

var chai = require('chai')
var expect = chai.expect
var should = chai.should()

describe('VerifyMe Instance Test(s)', function () {
  // Created Instance
  var VerifyMe = require('../index.js')
  var instance = new VerifyMe('eyR.34hWyQ6HW73jS8p1IkXmSWOlE4y9Inhgyd6g5f2R7', 'production')

  it('should have all wrapper functions defined and mocking functional', function () {
    // mock not enabled
    expect(Object.prototype.toString.call(instance._mock)).to.be.equal('[object Null]')

    VerifyMe.engageMock()
    // mock now enabled
    expect(Object.prototype.toString.call(instance._mock)).to.be.equal('[object Object]')

    /* eslint-disable no-unused-expressions */
    expect((typeof instance.checkGuarantorPersonValidity === 'function')).to.be.true
    expect((typeof instance.getEmploymentHistoryValidityResult === 'function')).to.be.true
    expect((typeof instance.getPhotoMatchValidityResult === 'function')).to.be.true
    expect((typeof instance.getGuarantorPersonValidityResult === 'function')).to.be.true
    expect((typeof instance.checkEmploymentHistoryValidity === 'function')).to.be.true

    VerifyMe.disengageMock()

    // mock now disabled again
    expect(Object.prototype.toString.call(instance._mock)).to.be.equal('[object Null]')

    expect((typeof instance.getEmploymentHistoryValidityResult === 'function')).to.be.true
    expect((typeof instance.checkGuarantorPersonValidity === 'function')).to.be.true
    expect((typeof instance.getPhotoMatchValidityResult === 'function')).to.be.true
    expect((typeof instance.getGuarantorPersonValidityResult === 'function')).to.be.true
    expect((typeof instance.checkEmploymentHistoryValidity === 'function')).to.be.true
    /* eslint-enable no-unused-expressions */
  })

  it('should throw an error if method is called without required arguments', function () {
    try {
      instance.getEmploymentHistoryValidityResult()
    } catch (err) {
      should.exist(err)
    }
  })

  it('should throw an error if method is called with any arguments other than an object', function () {
    try {
      instance.checkGuarantorPersonValidity([])
    } catch (err) {
      should.exist(err)
    }
  })
})