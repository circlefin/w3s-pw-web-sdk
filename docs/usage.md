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
    - [AppSettings](#appsettings)
    - [Authentication](#authentication)
    - [Challenge](#challenge)
    - [SignMessageResult](#signmessageresult)
    - [ChallengeResult](#challengeresult)
    - [Error](#error)
  - [Class Definition](#class-definition)
    - [W3SSdk](#w3ssdk)
      - [Constructor](#constructor)
      - [Methods](#methods)
        - [setAppSettings](#setappsettings)
        - [setAuthentication](#setauthentication)
        - [execute](#execute)

---

## Overview

`w3s-pw-web-sdk` offers developers a suite of tools and interfaces for interacting with W3S services. This SDK supports various challenge types, including wallet creation and transaction handling, making it an essential tool for developers working with web3 services.

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
  walletIdNotFound = 156001,
  tokenIdNotFound = 156002,
  transactionIdNotFound = 156003,
  entityCredentialNotFound = 156004,
  walletSetIdNotFound = 156005,
}
```

## Interfaces

### AppSettings

Holds application settings.

- `appId` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Application ID, retrieved from Circle Web3 Services Console

### Authentication

Holds authentication information.

- `userToken` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) User token
- `encryptionKey` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Encryption key

### Challenge

Holds information about a challenge.

- `challengeId` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Challenge Id

### SignMessageResult

Holds the result of a sign message or sign typed-data challenge.

- `signature` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Signature result after signing

### ChallengeResult

Holds the result of a challenge.

- `type` [\<ChallengeType>](#challengetype) Challenge type
- `status` [\<ChallengeStatus>](#challengestatus) Challenge status
- `data` [\<SignMessageResult | undefined>](#signmessageresult) Sign message response

### Error

Holds error information.

- `code` [\<integer | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type) Internal error code
- `message` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Error message

## Class Definition

### W3SSdk

#### Constructor

Initializes a new instance of `W3SSdk`.

#### Methods

##### setAppSettings

Sets the application settings.

- `appSettings` [\<AppSettings>](#appsettings) Application settings object

##### setAuthentication

Sets the authentication information.

- `auth` [\<Authentication>](#authentication) Authentication object

##### execute

Executes a challenge.

- `challengeId` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Challenge ID
- `onCompleted` [\<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Callback function
  - `error` [\<Error>](#error) Presents if error occurs
  - `result`[\<ChallengeResult>](#challengeresult) Presents when success
