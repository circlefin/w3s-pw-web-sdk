# Usage Documentation

## Table of Contents

- [Usage Documentation](#usage-documentation)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Enums](#enums)
    - [ChallengeType](#challengetype)
    - [ChallengeStatus](#challengestatus)
    - [ErrorCode](#errorcode)
  - [Interfaces](#interfaces)
    - [Configs](#configs)
    - [AppSettings](#appsettings)
    - [Authentication](#authentication)
    - [LoginConfigs](#loginconfigs)
      - [Definitions](#definitions)
    - [SocialLoginProvider](#socialloginprovider)
    - [Challenge](#challenge)
    - [ChallengeResult](#challengeresult)
    - [SignMessageResult](#signmessageresult)
    - [SignTransactionResult](#signtransactionresult)
    - [SocialLoginResult](#socialloginresult)
    - [EmailLoginResult](#emailloginresult)
    - [OauthInfo](#oauthinfo)
    - [Error](#error)
    - [SocialLoginCompleteCallback](#sociallogincompletecallback)
  - [Class Definition](#class-definition)
    - [W3SSdk](#w3ssdk)
      - [Constructor](#constructor)
      - [Methods](#methods)
        - [setAppSettings](#setappsettings)
        - [setAuthentication](#setauthentication)
        - [updateConfigs](#updateconfigs)
        - [getDeviceId](#getdeviceid)
        - [performLogin](#performlogin)
        - [verifyOtp](#verifyotp)
        - [execute](#execute)

---

## Overview

Programmable Wallets Web SDK secures the process when users input their secret data, for example, PIN code and recovery questions. It also has various interfaces to interact with the [W3S APIs](https://developers.circle.com/w3s/reference/createuserwithpinchallenge) as in wallet creation, transaction initiation, also sign message (EIP-191) and sign typed-data (EIP-712) via the `challengeId`.

## Enums

### ChallengeType

Enumerates the types of challenges supported.

```typescript
enum ChallengeType {
  RESTORE_PIN,
  SET_SECURITY_QUESTIONS,
  CREATE_WALLET,
  CREATE_TRANSACTION,
  ACCELERATE_TRANSACTION,
  CANCEL_TRANSACTION,
  CONTRACT_EXECUTION,
  SIGN_MESSAGE,
  SIGN_TYPEDDATA,
  UNKNOWN,
}
```

### ChallengeStatus

Enumerates the possible statuses for a challenge.

```typescript
enum ChallengeStatus {
  COMPLETE,
  EXPIRED,
  FAILED,
  IN_PROGRESS,
  PENDING,
}
```

### ErrorCode

Enumerates the types of error code.

```typescript
enum enum ErrorCode {
  unknown = -1,
  success = 0,
  apiParameterMissing = 1,
  apiParameterInvalid = 2,
  forbidden = 3,
  unauthorized = 4,
  retry = 9,
  customerSuspended = 10,
  pending = 11,
  invalidSession = 12,
  invalidPartnerId = 13,
  invalidMessage = 14,
  invalidPhone = 15,
  userAlreadyExisted = 155101,
  userNotFound = 155102,
  userTokenNotFound = 155103,
  userTokenExpired = 155104,
  invalidUserToken = 155105,
  userWasInitialized = 155106,
  userHasSetPin = 155107,
  userHasSetSecurityQuestion = 155108,
  userWasDisabled = 155109,
  userDoesNotSetPinYet = 155110,
  userDoesNotSetSecurityQuestionYet = 155111,
  incorrectUserPin = 155112,
  incorrectDeviceId = 155113,
  incorrectAppId = 155114,
  incorrectSecurityAnswers = 155115,
  invalidChallengeId = 155116,
  invalidApproveContent = 155117,
  invalidEncryptionKey = 155118,
  userPinLocked = 155119,
  securityAnswersLocked = 155120,
  notEnoughFunds = 155201,
  notEnoughBalance = 155202,
  exceedWithdrawLimit = 155203,
  minimumFundsRequired = 155204,
  invalidTransactionFee = 155205,
  rejectedOnAmlScreening = 155206,
  tagRequired = 155207,
  gasLimitTooLow = 155208,
  transactionDataNotEncodedProperly = 155209,
  fullNodeReturnedError = 155210,
  walletSetupRequired = 155211,
  lowerThenMinimumAccountBalance = 155212,
  rejectedByBlockchain = 155213,
  droppedAsPartOfReorg = 155214,
  operationNotSupport = 155215,
  amountBelowMinimum = 155216,
  wrongNftTokenIdNumber = 155217,
  invalidDestinationAddress = 155218,
  tokenWalletChainMismatch = 155219,
  wrongAmountsNumber = 155220,
  walletIsFrozen = 155501,
  maxWalletLimitReached = 155502,
  walletSetIdMutuallyExclusive = 155503,
  metadataUnmatched = 155504,
  userCanceled = 155701,
  launchUiFailed = 155702,
  pinCodeNotMatched = 155703,
  insecurePinCode = 155704,
  hintsMatchAnswers = 155705,
  networkError = 155706,
  biometricsSettingNotEnabled = 155708,
  deviceNotSupportBiometrics = 155709,
  biometricsKeyPermanentlyInvalidated = 155710,
  biometricsUserSkip = 155711,
  biometricsUserDisableForPin = 155712,
  biometricsUserLockout = 155713,
  biometricsUserLockoutPermanent = 155714,
  biometricsUserNotAllowPermission = 155715,
  biometricsInternalError = 155716,
  invalidUserSecret= 155718,
  walletIdNotFound = 156001,
  tokenIdNotFound = 156002,
  transactionIdNotFound = 156003,
  entityCredentialNotFound = 156004,
  walletSetIdNotFound = 156005,
}
```

## Interfaces

### Configs

- `appSettings` [\<AppSettings>](#appsettings) Application settings object
- `authentication` [\<Authentication>](#authentication) Authentication object
- `socialLoginConfig` [\<SocialLoginConfig>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) Social login configuration object

### AppSettings

Holds application settings.

- `appId` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Application ID, retrieved from Circle Web3 Services Console

### Authentication

Holds authentication information.

- `userToken` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) User token
- `encryptionKey` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Encryption key

### LoginConfigs

Holds login configuration information.

- `google` [\<object> | undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#objects) (optional): Configuration for Google login.
  - `clientId` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type): Google client ID.
  - `redirectUri` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type): Google redirect URI.
- `facebook` [\<object> | undefined](<[#facebook](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#objects)>) (optional): Configuration for Facebook login.
  - `appId` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type): Facebook app ID.
  - `redirectUri` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type): Facebook redirect URI.
- `apple` [\<FirebaseOptions> | undefined](https://firebase.google.com/docs/reference/kotlin/com/google/firebase/FirebaseOptions) (optional): Configuration for Apple login, using Firebase.
- `deviceToken` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type): Device token.
- `deviceEncryptionKey` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type): Device encryption key.
- `otpToken` [\<string> | undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) (optional): OTP token.

#### Definitions

- **google**: Configuration object for Google login.
  - **clientId**: The Client ID for Google login.
  - **redirectUri**: The Redirect URI for Google login.
- **facebook**: Configuration object for Facebook login.
  - **appId**: The App ID for Facebook login.
  - **redirectUri**: The Redirect URI for Facebook login.
- **apple**: Configuration for Apple login, using Firebase.
- **FirebaseOptions**: The Firebase configuration object.
- **deviceToken**: The token used to identify the device.
- **deviceEncryptionKey**: The encryption key used for the device.
- **otpToken**: The optional OTP token for verification.

### SocialLoginProvider

- `APPLE` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Apple login provider
- `FACEBOOK` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Facebook login provider
- `GOOGLE` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Google login provider

### Challenge

Holds information about a challenge.

- `challengeId` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Challenge Id

### ChallengeResult

Holds the basic information of a challenge.

- `type` [\<ChallengeType>](#challengetype) Challenge type
- `status` [\<ChallengeStatus>](#challengestatus) Challenge status

### SignMessageResult

Inherits from [ChallengeResult](#challengeresult). Holds the result of a sign message or sign typed-data challenge.

- `signature` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Signature result after signing

### SignTransactionResult

Inherits from [ChallengeResult](#challengeresult). Holds the result of a sign transaction challenge.

- `signature` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Signature result after signing
- `txHash` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Transaction hash
- `signedTransaction` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Signed transaction

### SocialLoginResult

Holds the result of a social login.

- `userToken` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) User token
- `encryptionKey` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Encryption key
- `refreshToken` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Refresh token
- `oAuthInfo` [\<object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#objects) OAuth information

### EmailLoginResult

Holds the result of an email login.

- `userToken` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) User token
- `encryptionKey` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Encryption key
- `refreshToken` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Refresh token

### OauthInfo

Holds the OAuth information.

- `provider` [\<SocialLoginProvider>](#socialloginprovider) Social login
- `scope` [\<string[]>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) OAuth scope
- ssoUserUUID [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) SSO user UUID
- `ssoUserInfo` [\<object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#objects) SSO user information
  - email [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Email
  - name [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Name
  - phone [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Phone

### Error

Holds error information.

- `code` [\<number | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type) Internal error code
- `message` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Error message

### SocialLoginCompleteCallback

Callback function for social login completion.

- `error` [\<Error>](#error) Presents if error occurs
- `result` [\<SocialLoginResult>](#socialloginresult) | [\<EmailLoginResult>](#emailloginresult) | undefined> Presents and contains the result of the social login when the social login is completed

## Class Definition

### W3SSdk

#### Constructor

Initializes a new instance of `W3SSdk`.

The constructor initializes a new instance of the W3SSdk class. If an instance already exists, it will set up the instance with the provided configurations and callback function, then return the existing instance. If an instance does not already exist, it will create a new one, setting up with the provided configurations and callback function, and assign the created instance to W3SSdk.instance.

- `configs` [\<Configs>](#configs) Configurations object
- `socialLoginCompleteCallback` [\<SocialLoginCompleteCallback | undefined>](#sociallogincompletecallback) Callback function

#### Methods

##### setAppSettings

Sets the application settings.

- `appSettings` [\<AppSettings>](#appsettings) Application settings object

##### setAuthentication

Sets the authentication information.

- `auth` [\<Authentication>](#authentication) Authentication object

##### updateConfigs

Updates the configurations.

- `configs` [\<Configs>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) Configurations object
- `onSocialLoginComplete` [\<Function | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Callback function
  - `error` [\<Error>](#error) Presents if error occurs
  - `result` [\<SocialLoginResult>](#socialloginresult) | [\<EmailLoginResult>](#emailloginresult) | undefined> Presents and contains the result of the social login when the social login is completed

##### getDeviceId

Gets the device ID.

##### performLogin

Performs a social login.

- `provider` [\<SocialLoginProvider>](#socialloginprovider) Social login provider

##### verifyOtp

Verifies the OTP.

##### execute

Executes a challenge.

- `challengeId` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Challenge ID
- `onCompleted` [\<Function | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Callback function
  - `error` [\<Error>](#error) Presents if error occurs
  - `result`<[ChallengeResult](#challengeresult) | [SignMessageResult](#signmessageresult) | [SignTransactionResult](#signtransactionresult) | undefined> Presents and contains the result of the challenge when the challenge is completed
