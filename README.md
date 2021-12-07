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

const verifyme = new VerifyMe(API_TEST_KEY, environment)
```

# License

MIT

# Credits

- [Ifeora Okechukwu](https://twitter.com/isocroft)

# Contributing

See the [CONTRIBUTING.md](https://github.com/isocroft/verifyme/blob/master/CONTRIBUTING.md) file for info

[npm-image]: https://img.shields.io/npm/v/verifyme-node.svg?style=flat-square
[npm-url]: https://npmjs.org/package/verifyme-node

[travis-image]: https://img.shields.io/travis/stitchng/verifyme/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/isocroft/verifyme

## Support 

**Coolcodes** is a non-profit software foundation (collective) created by **Oparand** - parent company of StitchNG, Synergixe based in Abuja, Nigeria. You'll find an overview of all our work and supported open source projects on our [Facebook Page](https://www.facebook.com/coolcodes/).

>Follow us on facebook if you can to get the latest open source software/freeware news and infomation.

Does your business depend on our open projects? Reach out and support us on [Patreon](https://www.patreon.com/coolcodes/). All pledges will be dedicated to allocating workforce on maintenance and new awesome stuff.
