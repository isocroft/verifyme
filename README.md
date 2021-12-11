# VerifyMe

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

A NodeJS Wrapper for [VerifyMe](https://www.verifyme.ng/)

## Overview
This project provides an easy-to-use object-oriented API to access endpoints delineated at https://docs.verifyme.ng/introduction/getting-started

## Getting Started

>Install from the NPM Registry

```bash

    $ npm i --save verifyme-node

```

# Usage

```js

let VerifyMe = require('verifyme-node')

let API_TEST_KEY = ''
let API_LIVE_KEY = ''

const environment = process.env.NODE_ENV

const verifyme = new VerifyMe(
    environment !== 'production' ? API_TEST_KEY : API_LIVE_KEY,
    environment
)
```

### Mocking the Instance (for Unit/Integration Tests)
>Setting up mocks for testing with the paystack instance is now as easy as fliping a switch like so:

```js

let VerifyMe = require('verifyme-node')

let API_LIVE_KEY = 'eyD.2hWyQ6HW73jS8p1IkXmSWOlE4y9Inhgyd6g5f2R7'
let API_TEST_API = ''

const environment = process.env.NODE_ENV

const verifyme = new VerifyMe(
    APIKEY,
    environment
)

// call the real API methods
const { body } = verifyme.chargeCard({
})

// mocking call made on the constructor

// start mocking (without making http request using test persona)
VerifyMe.engageMock()

// start mocking (while making http request using test persona)
VerifyMe.engageMock({
    pingRemoteTestPersona: true
})

// call the mock API methods
const { body } = await verifyme.chargeBank({
})

// replace mocked methods (! don't use arrow functions !)
VerifyMe.mockMacro(
  '', 
  async function j (reqPayload = {}) {
    // validation for (reqPayload) is already taken care of!

    // @TODO: optionally, connect to a in-memory db (redis) for mocking purposes

    // return mocked response object
    return { status: 200, body: { status: "success", data: reqPayload } };
})

const { body } = await verifyme.getCustomers({
})

// stop mocking
// mocking call made on the constructor
VerifyMe.disengageMock()
```

## API Resources

>Each method expects an object literal with both **route parameters** and **request parameters (query / body)**. Please, go through the _src/endpoints_ folder to see the specific items that should make up the object literal for each method

- xxxxxxx
  - verifyme.createCustomer()
  - verifyme.getCustomer()
- yyyyyyy
  - verifyme.listDisputes()
- zzzzzzzz
  - verifyme.createDedicatedNuban()
- aaaaaaaaa
  - verifyme.listDedicatedNubans()

# License

MIT

# Credits

- [Ifeora Okechukwu](https://twitter.com/isocroft)

# Contributing

See the [CONTRIBUTING.md](https://github.com/isocroft/verifyme/blob/main/CONTRIBUTING.md) file for info

[npm-image]: https://img.shields.io/npm/v/verifyme-node.svg?style=flat-square
[npm-url]: https://npmjs.org/package/verifyme-node

[travis-image]: https://img.shields.io/travis/isocroft/verifyme/main.svg?style=flat-square
[travis-url]: https://travis-ci.org/isocroft/verifyme

## Support 

**Coolcodes** is a non-profit software foundation (collective) created by **Oparand** - parent company of StitchNG, Synergixe based in Abuja, Nigeria. You'll find an overview of all our work and supported open source projects on our [Facebook Page](https://www.facebook.com/coolcodes/).

>Follow us on facebook if you can to get the latest open source software/freeware news and infomation.

Does your business depend on our open projects? Reach out and support us on [Patreon](https://www.patreon.com/coolcodes/). All pledges will be dedicated to allocating workforce on maintenance and new awesome stuff.
