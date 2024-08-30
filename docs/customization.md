# Customization Documentation

## Table of Contents

- [Customization Documentation](#customization-documentation)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Enums](#enums)
    - [QuestionType](#questiontype)
  - [Interfaces](#interfaces)
    - [SecurityQuestion](#securityquestion)
    - [Localizations](#localizations)
    - [Common](#common)
    - [ConfirmPincode](#confirmpincode)
    - [EnterPincode](#enterpincode)
    - [NewPincode](#newpincode)
    - [RecoverPincode](#recoverpincode)
    - [SecurityConfirm](#securityconfirm)
    - [SecurityIntros](#securityintros)
    - [SecurityQuestions](#securityquestions)
    - [SecuritySummary](#securitysummary)
    - [SocialEmailConfirm](#socialemailconfirm)
    - [TransactionRequest](#transactionrequest)
    - [ContractInteraction](#contractinteraction)
    - [SignatureRequest](#signaturerequest)
    - [EmailOtp](#emailotp)
    - [ThemeColor](#themecolor)
    - [Resources](#resources)
    - [CustomLinks](#customlinks)
  - [Class Definition](#class-definition)
    - [W3SSdk](#w3ssdk)
      - [Methods](#methods)
        - [setCustomSecurityQuestions](#setcustomsecurityquestions)
        - [setLocalizations](#setlocalizations)
        - [setResources](#setresources)
        - [setThemeColor](#setthemecolor)
        - [setCustomLinks](#setcustomlinks)
        - [setOnForgotPin](#setonforgotpin)
        - [setOnResendOtpEmail](#setonresendotpemail)

---

## Overview

Programmable Wallets Web SDK provides customization functionality that enables developers to tailor the desired user experience for the end-users. The scope includes customization of security questions, adaptation to various languages and regional settings, predefined error message, and unique themes and resource elements.

## Enums

### QuestionType

Enumerates the types of security questions.

```typescript
enum QuestionType {
  DATE,
  TEXT,
}
```

## Interfaces

### SecurityQuestion

Holds information about a custom security question.

- `question` [\<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Custom security question
- `type` [\<QuestionType>](#questiontype) Type of the question

### Localizations

Holds localization settings.

- `common` [\<Common | undefined>](#common) The settings for common texts.
- `confirmInitPincode` [\<ConfirmPincode | undefined>](#confirmpincode) The settings for `ConfirmInitPincode` screen.
- `confirmNewPincode` [\<ConfirmPincode | undefined>](#confirmpincode) The settings for `ConfirmNewPincode` screen.
- `enterPincode` [\<EnterPincode | undefined>](#enterpincode) The settings for `EnterPincode` screen.
- `initPincode` [\<NewPincode | undefined>](#newpincode) The settings for `InitPincode` screen.
- `newPincode` [\<NewPincode | undefined>](#newpincode) The settings for `NewPincode` screen.
- `recoverPincode` [\<RecoverPincode | undefined>](#recoverpincode) The settings for `RecoverPincode` screen.
- `securityConfirm` [\<SecurityConfirm | undefined>](#securityconfirm) The settings for `SecurityConfirm` screen.
- `securityIntros` [\<SecurityIntros | undefined>](#securityintros) The settings for `SecurityIntros` screen.
- `securityQuestions` [\<SecurityQuestions | undefined>](#securityquestions) The settings for `SecurityQuestions` screen.
- `securitySummary` [\<SecuritySummary | undefined>](#securitysummary) The settings for `SecuritySummary` screen.
- `socialEmailConfirm` [\<SocialEmailConfirm | undefined>](#socialemailconfirm) The settings for `SocialEmailConfirm` screen.

### Common

Holds localization settings for common texts.

- `continue` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Continue text
- `showPin` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Show pin text
- `hidePin` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Hide pin text
- `confirm` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Confirm text

### ConfirmPincode

Holds localization settings for `ConfirmInitPincode` or `ConfirmNewPincode` screen.

- `headline` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Headline text
- `headline2` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Headline text 2
- `subhead` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Subhead text

### EnterPincode

Holds localization settings for `EnterPincode` screen.

- `headline` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Headline text
- `headline2` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Headline text 2
- `subhead` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Subhead text
- `forgotPin` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Forgot pin text

### NewPincode

Holds localization settings for `InitPincode` or `NewPincode` screen.

- `headline` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Headline text
- `headline2` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Headline text 2
- `subhead` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Subhead text

### RecoverPincode

Holds localization settings for `RecoverPincode` screen.

- `headline` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Headline text
- `headline2` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Headline text 2
- `subhead` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Subhead text
- `answerInputHeader` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Answer input header text
- `answerInputPlaceholder` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Answer input placeholder text

### SecurityConfirm

Holds localization settings for `SecurityConfirm` screen.

- `title` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Title text
- `headline` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Headline text
- `inputHeadline` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Input headline text
- `inputPlaceholder` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Input placeholder text
- `inputMatch` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Input match text

### SecurityIntros

Holds localization settings for `SecurityIntros` screen.

- `headline` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Headline text
- `headline2` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Headline text 2
- `description` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Description text
- `link` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Link text

### SecurityQuestions

Holds localization settings for `SecurityQuestions` screen.

- `title` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Title text
- `questionHeader` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Question header text
- `questionPlaceholder` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Question placeholder text
- `requiredMark` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Required mark text
- `answerHeader` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Answer header text
- `answerPlaceholder` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Answer placeholder text
- `answerHintHeader` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Answer hint header text
- `answerHintPlaceholder` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Answer hint placeholder text

### SecuritySummary

Holds localization settings for `SecuritySummary` screen.

- `title` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Title text
- `question` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Question text

### SocialEmailConfirm

Holds localization settings for `SocialEmailConfirm` screen.

- `title` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Title text
- `headline` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Headline text

### TransactionRequest

Holds localization settings for a transaction request screen.

- `title` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Title text.
- `subtitle` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Subtitle text.
- `mainCurrency` [\<object | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#objects) Main currency details:
  - `amount` [\<string | number | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type) Main currency amount.
  - `symbol` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Main currency symbol.
- `exchangeValue` [\<object | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#objects) Exchange currency details:
  - `amount` [\<string | number | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type) Exchange currency amount.
  - `symbol` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Exchange currency symbol.
- `fromLabel` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) From label text.
- `from` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) From address or label text.
- `toLabel` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) To label text.
- `to` [\<string[] | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) To addresses.
- `networkFeeLabel` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Network fee label text.
- `networkFeeTip` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Network fee tooltip text.
- `networkFee` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Network fee amount.
- `exchangeNetworkFee` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Exchange network fee amount.
- `totalLabel` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Total label text.
- `total` [\<string[] | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Total amounts.
- `exchangeTotalValue` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Exchange total value.
- `rawTxDescription` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Raw transaction description.
- `rawTx` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Raw transaction data.

### ContractInteraction

Holds localization settings for a contract interaction screen.

- `title` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Title text.
- `subtitle` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Subtitle text.
- `mainCurrency` [\<object | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#objects) Main currency details:
  - `amount` [\<string | number | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type) Main currency amount.
  - `symbol` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Main currency symbol.
- `exchangeValue` [\<object | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#objects) Exchange value details:
  - `amount` [\<string | number | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type) Exchange value amount.
  - `symbol` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Exchange value symbol.
- `fromLabel` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) From label text.
- `from` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) From address or label text.
- `contractAddressLabel` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Contract address label text.
- `contractInfo` [\<string[] | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Contract information.
- `networkFeeLabel` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Network fee label text.
- `networkFeeTip` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Network fee tooltip text.
- `networkFee` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Network fee amount.
- `exchangeNetworkFee` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Exchange network fee amount.
- `totalLabel` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Total label text.
- `total` [\<string[] | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Total amounts.
- `exchangeTotalValue` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Exchange total value.
- `dataDetails` [\<object | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#objects) Data details:
  - `dataDetailsLabel` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Data details label.
  - `callData` [\<object | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#objects) Call data:
    - `callDataLabel` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Call data label.
    - `data` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Call data string.
  - `abiInfo` [\<object | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#objects) ABI information:
    - `functionNameLabel` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Function name label.
    - `functionName` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Function name string.
    - `parametersLabel` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Parameters label.
    - `parameters` [\<string[] | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Parameters strings.

### SignatureRequest

Holds localization settings for a signature request screen.

- `title` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Title text.
- `contractName` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Contract name.
- `contractUrl` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Contract URL.
- `subtitle` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Subtitle text.
- `descriptionLabel` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Description label text.
- `description` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Description text.

### EmailOtp

Holds localization settings for an email OTP (One-Time Password) screen.

- `title` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Title text.
- `subtitle` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Subtitle text.
- `resendHint` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Resend hint text.
- `resend` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Resend button text.

### ThemeColor

Holds customization color settings.

- `backdrop` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Backdrop color, e.g. `'#000000'`.
- `backdropOpacity` [\<number | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type) Backdrop opacity, e.g. `0.5`.
- `divider` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Divider color, e.g. `'#808080'` or `'grey'`.
- `bg` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Background color e.g. `'#FFFFFF'` or `'white'`.
- `success` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Success color, e.g. `'#008000'` or `'green'`.
- `error` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Error color, e.g. `'#FF0000'` or `'red'`.
- `textMain` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Main text color, e.g. `'#000000'` or `'black'`.
- `textMain2` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Main text color 2, e.g. `'#000000'` or `'black'`.
- `textAuxiliary` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Primary auxiliary color, e.g. `'#000000'` or `'black'`.
- `textAuxiliary2` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Auxiliary text color 2, e.g. `'#000000'` or `'black'`.
- `textSummary` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Summary text color, e.g. `'#000000'` or `'black'`.
- `textSummaryHighlight` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Summary highlight text color, e.g. `'#000000'` or `'black'`.
- `textPlaceholder` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Placeholder text color, e.g. `'#808080'` or `'grey'`.
- `pinDotBase` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Fill color for pincode input dot, e.g. `'#FFFFFF'` or `'white'`.
- `pinDotBaseBorder` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Stroke color for pincode input dot, e.g. `'#000000'` or `'black'`.
- `pinDotActivated` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Fill color for inputted pincode input dot, e.g. `'#0000ff'` or `'blue'`.
- `enteredPinText` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Text color for entered pincode input, e.g. `'#000000'` or `'black'`.
- `inputText` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Text color for text input, e.g. `'#000000'` or `'black'`.
- `inputBorderFocused` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Outline color for text input on focused, e.g. `'#0000ff'` or `'blue'`.
- `inputBorderFocusedError` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Outline color for text input when error, e.g. `'#FF0000'` or `'red'`.
- `inputBg` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Background color for text input, e.g. `'#FFFFFF'` or `'white'`.
- `inputBgDisabled` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Background color for disabled text input, e.g. `'#FFFFFF'` or `'white'`.
- `dropdownBg` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Background color for dropdown, e.g. `'#FFFFFF'` or `'white'`.
- `dropdownBorderIsOpen` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Outline color for dropdown is open, e.g. `'#0000ff'` or `'blue'`.
- `dropdownBorderError` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Outline color for dropdown when error, e.g. `'#FF0000'` or `'red'`.
- `mainBtnText` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Text color for primary button, e.g. `'#FFFFFF'` or `'white'`.
- `mainBtnTextDisabled` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Text color for disabled primary button, e.g. `'#FFFFFF'` or `'white'`.
- `mainBtnTextOnHover` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Text color for primary button on hover, e.g. `'#FFFFFF'` or `'white'`.
- `mainBtnBg` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Background color for primary button, e.g. `'#000000'` or `'black'`.
- `mainBtnBgOnHover` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Background color for primary button on hover, e.g. `'#000000'` or `'black'`.
- `mainBtnBgDisabled` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Background color for disabled primary button, e.g. `'#000000'` or `'black'`.
- `secondBtnText` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Text color for secondary button, e.g. `'#000000'` or `'black'`.
- `secondBtnTextDisabled` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Text color for disabled secondary button, e.g. `'#000000'` or `'black'`.
- `secondBtnTextOnHover` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Text color for secondary button on hover, e.g. `'#000000'` or `'black'`.
- `secondBtnBorder` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Outline color for secondary button, e.g. `'#000000'` or `'black'`.
- `secondBtnBorderOnHover` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Outline color for secondary button on hover, e.g. `'#000000'` or `'black'`.
- `secondBtnBgOnHover` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Background color for secondary button on hover, e.g. `'#FFFFFF'` or `'white'`.
- `secondBtnBorderDisabled` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Outline color for disabled secondary button, e.g. `'#FFFFFF'` or `'white'`.
- `plainBtnText` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Text color for plain text button, e.g. `'#000000'` or `'black'`.
- `plainBtnTextDisabled` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Text color for disabled plain text button, e.g. `'#000000'` or `'black'`.
- `plainBtnTextOnHover` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Text color for plain text button on hover, e.g. `'#000000'` or `'black'`.
- `plainBtnBg` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Background color for plain text button, e.g. `'#FFFFFF'` or `'white'`.
- `plainBtnBgOnHover` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Background color for plain text button on hover, e.g. `'#FFFFFF'` or `'white'`.
- `recoverPinHintTitle` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Text color for recover pincode hint title, e.g. `'#FFFFFF'` or `'white'`.
- `recoverPinHintTitleBg` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Background color for recover pincode hint title, e.g. `'#FFFFFF'` or `'white'`.
- `recoverPinHint` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Text color for recover pincode hint, e.g. `'#FFFFFF'` or `'white'`.
- `titleGradients` [\<string[] | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#array_type) Background color for linear-gradient text, e.g. `['#B090F5', '#1AA3FF']`.

### Resources

Holds resource urls and properties, such as images or font-family settings. These resource properties should be hosted on a public server. SDK will load these resources from the urls provided.

- `naviClose` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Close icon
- `naviBack` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Back icon
- `securityIntroMain` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Security intro main image
- `dropdownArrow` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Dropdown arrow icon
- `selectCheckMark` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Select check mark icon
- `securityConfirmMain` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Security confirm main image
- `errorInfo` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Error info icon
- `fontFamily` [\<{ name?: string, url?: string } | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#object_type) Font family settings

### CustomLinks

Holds custom links.

- `learnMoreUrl` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Learn more link

## Class Definition

### W3SSdk

#### Methods

##### setCustomSecurityQuestions

Sets custom security questions.

- `questions` [\<SecurityQuestion\[\] | undefined>](#questiontype) Array of `SecurityQuestion`
- `requiredCount` [\<number | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type) Required count of `SecurityQuestion`. The value is 2 by default.
- `securityConfirmItems` [\<string[] | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#array_type) Array of customized disclaimers on `SecurityConfirm` screen. The value is `undefined` by default.

##### setLocalizations

Sets custom localizations

- `localizations` [\<Localizations | undefined>](#localizations) Settings of `Localizations`

##### setResources

Sets custom resources

- `resources` [\<Resources | undefined>](#resources) Settings of `Resources`

##### setThemeColor

Sets custom theme colors

- `themeColor` [\<ThemeColor | undefined>](#themecolor) Settings of `ThemeColor`

##### setCustomLinks

Sets custom links

- `customLinks` [\<CustomLinks | undefined>](#customlinks) Settings of `CustomLinks`

##### setOnForgotPin

Sets callback function for `ForgotPin` button click event

- `onForgotPin` [\<Function | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Callback function
- `shouldCloseModalOnForgotPin` [\<boolean | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type) Should close modal on forgot pin click event

##### setOnResendOtpEmail

Sets callback function for `Resend OTP Email` button click event

- `onResendOtpEmail` [\<Function | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Callback function
