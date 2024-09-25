// Copyright (c) 2023, Circle Technologies, LLC. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import type { FirebaseOptions } from 'firebase/app'

// Enums
/**
 * ChallengeType.
 */
export enum ChallengeType {
  INITIALIZE = 'INITIALIZE',
  SET_PIN = 'SET_PIN',
  CHANGE_PIN = 'CHANGE_PIN',
  RESTORE_PIN = 'RESTORE_PIN',
  SET_SECURITY_QUESTIONS = 'SET_SECURITY_QUESTIONS',
  CREATE_WALLET = 'CREATE_WALLET',
  CREATE_TRANSACTION = 'CREATE_TRANSACTION',
  ACCELERATE_TRANSACTION = 'ACCELERATE_TRANSACTION',
  CANCEL_TRANSACTION = 'CANCEL_TRANSACTION',
  SIGN_MESSAGE = 'SIGN_MESSAGE',
  SIGN_TYPEDDATA = 'SIGN_TYPEDDATA',
  SIGN_TRANSACTION = 'SIGN_TRANSACTION',
  UNKNOWN = 'UNKNOWN',
}

/**
 * ChallengeStatus.
 */
export enum ChallengeStatus {
  COMPLETE = 'COMPLETE',
  EXPIRED = 'EXPIRED',
  FAILED = 'FAILED',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING = 'PENDING',
}

/**
 * Security question type.
 */
export enum QuestionType {
  DATE = 'DATE',
  TEXT = 'TEXT',
}

/**
 * Error code.
 */
export enum ErrorCode {
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

  userOTPTokenExpiredError = 155130,
  userOTPTokenInvalidError = 155131,
  userOTPNotFoundError = 155132,
  userOTPInvalidError = 155133,
  userOTPNotMatchError = 155134,
  userEmailInvalidError = 155135,
  userEmailMismatchError = 155136,
  deviceIDInvalidError = 155137,
  emailSendingFailedError = 155138,
  socialLoginTokenExpiredError = 155139,
  socialLoginProviderAppIDNotMatchError = 155140,
  userOTPIsLockedError = 155141,
  userOTPSendCountsOverLimitError = 155142,
  deviceTokenExpiredError = 155143,
  deviceTokenInvalidError = 155144,
  deviceTokenNotFoundError = 155145,

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

  userSecretMissing = 155717,
  invalidUserTokenFormat = 155718,
  userTokenMismatch = 155719,

  walletIdNotFound = 156001,
  tokenIdNotFound = 156002,
  transactionIdNotFound = 156003,
  entityCredentialNotFound = 156004,
  walletSetIdNotFound = 156005,
}

// Settings and Authentication
export interface AppSettings {
  /**
   * Application ID. You can get the application ID from the W3S console.
   */
  appId: string
}

export interface Authentication {
  /**
   * User token.
   */
  userToken: string
  /**
   * Encryption key. This key is used to encrypt the user token.
   */
  encryptionKey: string
}

/**
 * Social Login Provider.
 */
export enum SocialLoginProvider {
  APPLE = 'Apple',
  FACEBOOK = 'Facebook',
  GOOGLE = 'Google',
}

/**
 * Login configurations, including Google, Facebook, and Apple.
 */
export interface LoginConfigs {
  google?:
    | {
        /**
         * Google client ID.
         */
        clientId: string
        /**
         * Google redirect URI.
         */
        redirectUri: string
      }
    | undefined
  facebook?:
    | {
        /**
         * Facebook app ID.
         */
        appId: string
        /**
         * Facebook redirect URI.
         */
        redirectUri: string
      }
    | undefined
  /**
   * We use firebase for Apple login. You can provide the firebase configuration here.
   */
  apple?: FirebaseOptions | undefined
  deviceToken: string
  deviceEncryptionKey: string
  otpToken?: string
}

/**
 * Configuration settings for the SDK.
 */
export interface Configs {
  /**
   * Application settings.
   */
  appSettings: AppSettings
  /**
   * Authentication settings.
   */
  authentication?: Authentication
  /**
   * Login configurations.
   */
  loginConfigs?: LoginConfigs
}

// Challenge Related
export interface Challenge {
  /**
   * Challenge ID.
   */
  challengeId: string
  /**
   * Social login user secret.
   */
  userSecret?: string
}

// Device Information
export interface DeviceInfo {
  /**
   * SDK type.
   */
  model: string
  /**
   * SDK version.
   */
  version: string
}

/**
 * Base challenge result interface. Holds the challenge type and status.
 */
export interface ChallengeResult {
  /**
   * Challenge type.
   */
  type: ChallengeType
  /**
   * Challenge status.
   */
  status: ChallengeStatus
}

/**
 * Result for sign message and sign typed-data challenges.
 */
export interface SignMessageResult extends ChallengeResult {
  /**
   * Challenge type.
   */
  type: ChallengeType.SIGN_MESSAGE | ChallengeType.SIGN_TYPEDDATA
  data?: {
    /**
     * Signature.
     */
    signature: string
  }
}

/**
 * Result for sign transaction challenge.
 */
export interface SignTransactionResult extends ChallengeResult {
  /**
   * Challenge type.
   */
  type: ChallengeType.SIGN_TRANSACTION
  data?: {
    /**
     * Signature.
     */
    signature: string
    /**
     * Transaction hash.
     */
    txHash: string
    /**
     * Signed transaction.
     */
    signedTransaction: string
    /**
     * The `v` field of the elliptic curve signature. It is used to calculate the public key.
     */
    v?: string
    /**
     * The `r` field of the elliptic curve signature. It is part of the actual signature along with the `s` field.
     */
    r?: string
    /**
     * The `s` field of the elliptic curve signature. It is part of the actual signature along with the `r` field.
     */
    s?: string
  }
}

/**
 * Result for oauth login.
 */
export interface OAuthInfo {
  provider: SocialLoginProvider
  scope?: string[]
  socialUserUUID?: string
  socialUserInfo?: {
    email?: string
    name?: string
    phone?: string
  }
}

/**
 * Social login result.
 */
export interface SocialLoginResult {
  userToken: string
  encryptionKey: string
  refreshToken: string
  oAuthInfo: OAuthInfo
}

/**
 * Email login result.
 */
export interface EmailLoginResult
  extends Omit<SocialLoginResult, 'oAuthInfo'> {}

export interface SecurityQuestion {
  /**
   * Custom security question.
   */
  question: string
  /**
   * Question type.
   */
  type: QuestionType
}

// Error and Events
export interface Error {
  /**
   * Internal error code. You can look up the error code in the error code table in the documentation.
   */
  code?: ErrorCode
  /**
   * Error message.
   */
  message: string
}

export type ChallengeCompleteCallback = (
  error: Error | undefined,
  result:
    | ChallengeResult
    | SignMessageResult
    | SignTransactionResult
    | undefined,
) => Promise<void> | void

export type LoginCompleteCallback = (
  error: Error | undefined,
  result: SocialLoginResult | EmailLoginResult | undefined,
) => Promise<void> | void

export interface PostMessageEvent extends MessageEvent {
  data: {
    onFrameReady?: boolean
    onComplete?: boolean
    onForgotPin?: boolean
    onLearnMore?: boolean
    onResendOtpEmail?: boolean
    onError?: boolean
    onClose?: boolean
    showUi?: boolean
    onSocialLoginVerified?: {
      error: Error | undefined
      result: SocialLoginResult | undefined
    }
    onEmailLoginVerified?: {
      error: Error | undefined
      result: EmailLoginResult | undefined
    }
    deviceId?: string
    error?: Error
    result?: ChallengeResult | SignMessageResult | SignTransactionResult
  }
}

export interface Common {
  continue?: string
  showPin?: string
  hidePin?: string
  confirm?: string
  sign?: string
  retry?: string
}

export interface ConfirmPincode {
  headline?: string
  headline2?: string
  subhead?: string
}

export interface EnterPincode {
  headline?: string
  headline2?: string
  subhead?: string
  forgotPin?: string
}

export interface NewPincode {
  headline?: string
  headline2?: string
  subhead?: string
}

export interface RecoverPincode {
  headline?: string
  headline2?: string
  subhead?: string
  answerInputHeader?: string
  answerInputPlaceholder?: string
}

export interface SecurityConfirm {
  title?: string
  headline?: string
  inputHeadline?: string
  inputPlaceholder?: string
  inputMatch?: string
}

export interface SecurityIntros {
  headline?: string
  headline2?: string
  description?: string
  link?: string
}

export interface SecurityQuestions {
  title?: string
  questionHeader?: string
  questionPlaceholder?: string
  requiredMark?: string
  answerHeader?: string
  answerPlaceholder?: string
  answerHintHeader?: string
  answerHintPlaceholder?: string
}

export interface SecuritySummary {
  title?: string
  question?: string
}

export interface SocialEmailConfirm {
  title?: string
  headline?: string
}

export interface TransactionRequest {
  title?: string
  subtitle?: string

  mainCurrency?: {
    amount?: string | number
    symbol?: string
  }
  exchangeValue?: {
    amount?: string | number
    symbol?: string
  }

  fromLabel?: string
  from?: string
  toLabel?: string
  to?: string[]

  networkFeeLabel?: string
  networkFeeTip?: string
  networkFee?: string
  exchangeNetworkFee?: string

  totalLabel?: string
  total?: string[]
  exchangeTotalValue?: string

  rawTxDescription?: string
  rawTx?: string
}

export interface ContractInteraction {
  title?: string
  subtitle?: string

  mainCurrency?: {
    amount?: string | number
    symbol?: string
  }
  exchangeValue?: {
    amount?: string | number
    symbol?: string
  }

  fromLabel?: string
  from?: string
  contractAddressLabel?: string
  contractInfo?: string[]

  networkFeeLabel?: string
  networkFeeTip?: string
  networkFee?: string
  exchangeNetworkFee?: string

  totalLabel?: string
  total?: string[]
  exchangeTotalValue?: string

  dataDetails?: {
    dataDetailsLabel?: string
    callData?: {
      callDataLabel?: string
      data?: string
    }
    abiInfo?: {
      functionNameLabel?: string
      functionName?: string
      parametersLabel?: string
      parameters?: string[]
    }
  }
}

export interface SignatureRequest {
  title?: string
  contractName?: string
  contractUrl?: string

  subtitle?: string

  descriptionLabel?: string
  description?: string
}

export interface EmailOtp {
  title?: string
  subtitle?: string

  resendHint?: string
  resend?: string
}

export interface Localizations {
  common?: Common
  confirmInitPincode?: ConfirmPincode
  confirmNewPincode?: ConfirmPincode
  enterPincode?: EnterPincode
  initPincode?: NewPincode
  newPincode?: NewPincode
  recoverPincode?: RecoverPincode
  securityConfirm?: SecurityConfirm
  securityIntros?: SecurityIntros
  securityQuestions?: SecurityQuestions
  securitySummary?: SecuritySummary
  socialEmailConfirm?: SocialEmailConfirm
  transactionRequest?: TransactionRequest
  contractInteraction?: ContractInteraction
  signatureRequest?: SignatureRequest
  emailOtp?: EmailOtp
}

export interface ThemeColor {
  /**
   * Modal backdrop color, e.g. '#000000'.
   */
  backdrop?: string
  /**
   * Modal backdrop opacity, e.g. 0.5.
   */
  backdropOpacity?: number
  /**
   * Divider border color, e.g. '#808080' or 'grey'.
   */
  divider?: string
  /**
   * Modal background color, e.g. '#FFFFFF' or 'white'.
   */
  bg?: string
  /**
   * Success text color, e.g. '#008000' or 'green'.
   */
  success?: string
  /**
   * Error text color, e.g. '#FF0000' or 'red'.
   */
  error?: string
  /**
   * Primary color, e.g. '#000000' or 'black'.
   */
  textMain?: string
  /**
   * Secondary color, e.g. '#000000' or 'black'.
   */
  textMain2?: string
  /**
   * Primary auxiliary color, e.g. '#000000' or 'black'.
   */
  textAuxiliary?: string
  /**
   * Secondary auxiliary color, e.g. '#000000' or 'black'.
   */
  textAuxiliary2?: string
  /**
   * Summary text color, e.g. '#000000' or 'black'.
   */
  textSummary?: string
  /**
   * Summary highlight text color, e.g. '#000000' or 'black'.
   */
  textSummaryHighlight?: string
  /**
   * Text input placeholder color, e.g. '#808080' or 'grey'.
   */
  textPlaceholder?: string
  /**
   * Text color for contraction interaction collapsible toggle label text, e.g. '#000000' or 'black'.
   */
  textDetailToggle?: string
  /**
   * Text color for interactive text, e.g. '#000000' or 'black'.
   */
  textInteractive?: string
  /**
   * Container background color for interactive text, e.g. '#FFFFFF' or 'white'.
   */
  interactiveBg?: string
  /**
   * Text color for tooltip content text, e.g. '#000000' or 'black'.
   */
  tooltipText?: string
  /**
   * Background color for tooltip content, e.g. '#FFFFFF' or 'white'.
   */
  tooltipBg?: string
  /**
   * Fill color for pincode input dot, e.g. '#FFFFFF' or 'white'.
   */
  pinDotBase?: string
  /**
   * Stroke color for pincode input dot, e.g. '#000000' or 'black'.
   */
  pinDotBaseBorder?: string
  /**
   * Fill color for inputted pincode input dot, e.g. '#0000ff' or 'blue'.
   */
  pinDotActivated?: string
  /**
   * Text color for entered pincode input, e.g. `'#000000'` or `'black'`.
   */
  enteredPinText?: string
  /**
   * Text color for text input, e.g. '#000000' or 'black'.
   */
  inputText?: string
  /**
   * Outline color for text input on focused, e.g. '#0000ff' or 'blue'.
   */
  inputBorderFocused?: string
  /**
   * Outline color for text input when error, e.g. '#FF0000' or 'red'.
   */
  inputBorderFocusedError?: string
  /**
   * Background color for text input, e.g. '#FFFFFF' or 'white'.
   */
  inputBg?: string
  /**
   * Background color for disabled text input, e.g. '#FFFFFF' or 'white'.
   */
  inputBgDisabled?: string
  /**
   * Background color for dropdown, e.g. '#FFFFFF' or 'white'.
   */
  dropdownBg?: string
  /**
   * Outline color for dropdown is open, e.g. '#0000ff' or 'blue'.
   */
  dropdownBorderIsOpen?: string
  /**
   * Outline color for dropdown when error, e.g. '#FF0000' or 'red'.
   */
  dropdownBorderError?: string
  /**
   * Text color for primary button, e.g. '#FFFFFF' or 'white'.
   */
  mainBtnText?: string
  /**
   * Text color for disabled primary button, e.g. '#FFFFFF' or 'white'.
   */
  mainBtnTextDisabled?: string
  /**
   * Text color for primary button on hover, e.g. '#FFFFFF' or 'white'.
   */
  mainBtnTextOnHover?: string
  /**
   * Background color for primary button, e.g. '#000000' or 'black'.
   */
  mainBtnBg?: string
  /**
   * Background color for primary button on hover, e.g. '#000000' or 'black'.
   */
  mainBtnBgOnHover?: string
  /**
   * Background color for disabled primary button, e.g. '#000000' or 'black'.
   */
  mainBtnBgDisabled?: string
  /**
   * Text color for secondary button, e.g. '#000000' or 'black'.
   */
  secondBtnText?: string
  /**
   * Text color for disabled secondary button, e.g. '#000000' or 'black'.
   */
  secondBtnTextDisabled?: string
  /**
   * Text color for secondary button on hover, e.g. '#000000' or 'black'.
   */
  secondBtnTextOnHover?: string
  /**
   * Outline color for secondary button, e.g. '#000000' or 'black'.
   */
  secondBtnBorder?: string
  /**
   * Outline color for secondary button on hover, e.g. '#000000' or 'black'.
   */
  secondBtnBorderOnHover?: string
  /**
   * Background color for secondary button on hover, e.g. '#FFFFFF' or 'white'.
   */
  secondBtnBgOnHover?: string
  /**
   * Outline color for disabled secondary button, e.g. '#FFFFFF' or 'white'.
   */
  secondBtnBorderDisabled?: string
  /**
   * Text color for plain text button, e.g. '#000000' or 'black'.
   */
  plainBtnText?: string
  /**
   * Text color for disabled plain text button, e.g. '#000000' or 'black'.
   */
  plainBtnTextDisabled?: string
  /**
   * Text color for plain text button on hover, e.g. '#000000' or 'black'.
   */
  plainBtnTextOnHover?: string
  /**
   * Background color for plain text button, e.g. '#FFFFFF' or 'white'.
   */
  plainBtnBg?: string
  /**
   * Background color for plain text button on hover, e.g. '#FFFFFF' or 'white'.
   */
  plainBtnBgOnHover?: string
  /**
   * Text color for recover pincode hint title, e.g. '#FFFFFF' or 'white'.
   */
  recoverPinHintTitle?: string
  /**
   * Background color for recover pincode hint title, e.g. '#FFFFFF' or 'white'.
   */
  recoverPinHintTitleBg?: string
  /**
   * Text color for recover pincode hint, e.g. '#FFFFFF' or 'white'.
   */
  recoverPinHint?: string
  /**
   * Background color for linear-gradient text, e.g. ['#B090F5', '#1AA3FF'].
   */
  titleGradients?: string[]
}

export interface Resources {
  /*
   * Close icon for the navigation bar.
   */
  naviClose?: string
  /*
   * Back icon for the navigation bar.
   */
  naviBack?: string
  /*
   * Security intros image url for the security intros page.
   */
  securityIntroMain?: string
  /*
   * Arrow icon for the dropdown and collapsible section.
   */
  dropdownArrow?: string
  /*
   * Selected item icon for the dropdown.
   */
  selectCheckMark?: string
  /**
   * Security confirm image url for the security confirm page.
   */
  securityConfirmMain?: string
  /**
   * Error icon for form validation.
   */
  errorInfo?: string
  /**
   * Token icon for the transaction request page.
   */
  transactionTokenIcon?: string
  /**
   * DApp icon for customization for the sign message page.
   */
  dAppIcon?: string
  /**
   * Tooltip icon for customization.
   */
  tipIcon?: string
  /**
   * Email icon for customization.
   */
  emailIcon?: string
  /**
   * Font-family for customization.
   * E.g. \{ name: 'Edu TAS Beginner', url: 'https://fonts.googleapis.com/css2?family=Edu+TAS+Beginner:wght@400;500;600;700&display=swap' \}.
   */
  fontFamily?: {
    name?: string
    url?: string
  }
}

export interface CustomLinks {
  /**
   * External link for the learn more button link.
   */
  learnMoreUrl?: string
}
