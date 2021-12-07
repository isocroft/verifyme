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

let VerifyMe = require('paystack-node')

let API_TEST_KEY = ''
let API_LIVE_KEY = ''

const environment = process.env.NODE_ENV

const verifyme = new VerifyMe(API_TEST_KEY, environment)
```
