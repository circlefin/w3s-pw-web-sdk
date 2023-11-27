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

---

## Overview

`w3s-pw-web-sdk` is a comprehensive toolkit designed for developers to enhance user interaction with W3S services through customization. This SDK excels in providing extensive customization options, allowing developers to tailor the user experience to meet specific needs. Key areas of customization include security questions, localization settings, UI themes, and resource management. With its flexible customization capabilities, the SDK empowers developers to create a more personalized and engaging interface for web3 service interactions.

This customization-focused approach enables the integration of custom security questions, adaptation to various languages and regional settings, and the application of unique themes and resource elements. By leveraging these customization features, developers can significantly enhance the user experience, ensuring that the interface aligns with the branding and usability requirements of their applications.

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

### Common

Holds localization settings for common texts.

- `continue` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Continue text
- `showPin` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Show pin text
- `hidePin` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Hide pin text

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
- `textAuxiliary` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Auxiliary text color, e.g. `'#000000'` or `'black'`.
- `textAuxiliary2` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Auxiliary text color 2, e.g. `'#000000'` or `'black'`.
- `textSummary` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Summary text color, e.g. `'#000000'` or `'black'`.
- `textSummaryHighlight` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Summary highlight text color, e.g. `'#000000'` or `'black'`.
- `textPlaceholder` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Placeholder text color, e.g. `'#808080'` or `'grey'`.
- `pinDotBase` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Fill color for pincode input dot, e.g. `'#FFFFFF'` or `'white'`.
- `pinDotBaseBorder` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Stroke color for pincode input dot, e.g. `'#000000'` or `'black'`.
- `pinDotActivated` [\<string | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type) Fill color for inputted pincode input dot, e.g. `'#0000ff'` or `'blue'`.
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
- `requiredCount` [\<integer | undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number_type) Required count of `SecurityQuestion`. The value is 2 by default.
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
