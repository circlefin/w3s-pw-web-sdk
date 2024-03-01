# Circle Programmable Wallets Web SDK

## Table of Contents

- [Circle Programmable Wallets Web SDK](#circle-programmable-wallets-web-sdk)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Prerequisites](#prerequisites)
    - [Initiating the SDK](#initiating-the-sdk)
  - [Documentation](#documentation)
  - [Examples](#examples)

---

## Overview

Programmable Wallets Web SDK empowers developers to build web3 wallets on web apps with ease. It’s a non-custodial wallet solution that brings seamless onboarding & transaction experience for end-users and utilizes industry standard MPC cryptographic technology to ensure the security of private key as well as the safety of user assets.

## Installation

```bash
$ npm install @circle-fin/w3s-pw-web-sdk
```

## Usage

### Prerequisites

Sign up for [Circle's Dev Console](https://developers.circle.com/w3s/docs/circle-developer-account) to obtain an APP ID.

### Initiating the SDK

A minimal example for initiating the SDK is as follows:

```jsx
import { W3SSdk } from '@circle-fin/w3s-pw-web-sdk'

const sdk = new W3SSdk()

sdk.setAppSettings({
  appId: '<Your App Id>',
})
sdk.setAuthentication({
  userToken: '<Your user token>',
  encryptionKey: '<Your encryption key>',
})

sdk.execute(challengeId, (error, result) => {
  if (error) {
    console.log(
      `${error?.code?.toString() || 'Unknown code'}: ${
        error?.message ?? 'Error!'
      }`
    )

    return
  }

  console.log(`Challenge: ${result.type}`)
  console.log(`status: ${result.status}`)

  if (result.data) {
    console.log(`signature: ${result.data?.signature}`)
  }
})
```

## Documentation

Check out the developer documentations below for an easy-breezy setup and smoother usage experience.

- [Web SDK doc](https://developers.circle.com/w3s/docs/web)
- [Web SDK UI Customization API doc](https://developers.circle.com/w3s/docs/web-sdk-ui-customizations)

## Examples

We provide 3 frontend examples for you to try out:

- [js-example](https://github.com/circlefin/w3s-pw-web-sdk/tree/master/examples/js-example)
- [react-example](https://github.com/circlefin/w3s-pw-web-sdk/tree/master/examples/react-example)
- [vue-example](https://github.com/circlefin/w3s-pw-web-sdk/tree/master/examples/vue-example)

Please follow the steps below to start building:

1. Clone this repo.
2. Obtain the APP ID from [Circle Developer Console](https://console.circle.com/).
3. Running the script. please follow the README.md in the example folder to execute the sample app.
