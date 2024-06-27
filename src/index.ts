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

import { getApps, initializeApp } from 'firebase/app'
import {
  OAuthProvider,
  getAuth,
  getRedirectResult,
  signInWithRedirect,
} from 'firebase/auth'
import { decode } from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

import { SocialLoginProvider } from './types'

import type {
  AppSettings,
  Authentication,
  Challenge,
  ChallengeCompleteCallback,
  Configs,
  CustomLinks,
  DeviceInfo,
  Localizations,
  LoginCompleteCallback,
  PostMessageEvent,
  Resources,
  SecurityQuestion,
  ThemeColor,
} from './types'
import type { FirebaseApp } from 'firebase/app'
import type { UserCredential } from 'firebase/auth'
import type { JwtPayload } from 'jsonwebtoken'

const packageInfo = require('../package.json') as { version: string }

export class W3SSdk {
  private readonly serviceUrl = 'https://pw-auth.circle.com'
  private static instance: W3SSdk | null = null
  private readonly iframe: HTMLIFrameElement
  private readonly window: Window = window
  private configs?: Configs
  private challenge?: Challenge
  private securityQuestions?: SecurityQuestion[] | null
  private securityQuestionsRequiredCount = 2
  private securityConfirmItems?: string[]
  private localizations?: Localizations
  private themeColor?: ThemeColor
  private resources?: Resources
  private customLinks?: CustomLinks
  private deviceInfo?: DeviceInfo
  private socialLoginToken?: string | null
  private socialLoginProvider?: SocialLoginProvider
  private firebaseApp?: FirebaseApp

  /**
   * Callback function that is called when the challenge is completed.
   */
  private onComplete?: ChallengeCompleteCallback
  /**
   * Callback function that is called when the page is redirected back from the social login provider and receives the verification result.
   */
  private onLoginComplete?: LoginCompleteCallback
  private shouldCloseModalOnForgotPin = false
  /**
   * Callback function that is called when the user clicks the forgot pin button.
   */
  private onForgotPin?: () => void
  private receivedResponseFromService = false
  /**
   * Promise that is resolved when the device ID is received.
   */
  private resolveDeviceIdPromise?: (deviceId: string) => void
  /**
   * Promise that is rejected when the device ID is not received.
   */
  private rejectDeviceIdPromise?: (reason: string) => void
  /**
   * Callback function that is called when the user clicks the resend OTP email button.
   */
  private onResendOtpEmail?: () => void

  constructor(configs?: Configs, onLoginComplete?: LoginCompleteCallback) {
    if (W3SSdk.instance != null) {
      this.setupInstance(configs, onLoginComplete)

      return W3SSdk.instance
    }

    this.iframe = document.createElement('iframe')
    this.setupInstance(configs, onLoginComplete)
    W3SSdk.instance = this
  }

  /**
   * Sets the application settings.
   * This method will be deprecated in the future. Please use the constructor to set the application settings.
   * @param appSettings - Application settings.
   */
  setAppSettings(appSettings: AppSettings): void {
    if (this.configs) {
      this.configs.appSettings = appSettings
    } else {
      this.configs = { appSettings }
    }
  }

  /**
   * Sets the authentication information.
   * @param auth - Authentication information.
   */
  setAuthentication(auth: Authentication): void {
    if (this.configs) {
      this.configs.authentication = auth
    } else {
      this.configs = {
        appSettings: {
          appId: '',
        },
        authentication: auth,
      }
    }
  }

  /**
   * Updates the configurations.
   * @param configs - Configurations.
   * @param onLoginComplete - Callback function that is called when the page is redirected back from the social login provider and receives the verification result.
   */
  updateConfigs(configs?: Configs, onLoginComplete?: LoginCompleteCallback) {
    this.setupInstance(configs, onLoginComplete ?? this.onLoginComplete)
  }

  /**
   * Gets the device ID.
   * @returns Promise<string> - Device ID.
   */
  getDeviceId(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.resolveDeviceIdPromise = resolve
      this.rejectDeviceIdPromise = reject

      this.subscribeMessage()
      this.appendIframe(false, 'device-id')

      setTimeout(() => {
        if (!this.receivedResponseFromService) {
          this.rejectDeviceIdPromise?.('Failed to receive deviceId')
          this.closeModal()
          this.unSubscribeMessage()
        }
      }, 1000 * 10)
    })
  }

  /**
   * Performs social login.
   * @param provider - Social login provider.
   */
  performLogin(provider: SocialLoginProvider): void {
    if (provider === SocialLoginProvider.GOOGLE) {
      this.performGoogleLogin()
    } else if (provider === SocialLoginProvider.FACEBOOK) {
      this.performFacebookLogin()
    } else if (provider === SocialLoginProvider.APPLE) {
      this.performAppleLogin()
    } else {
      void this.onLoginComplete?.(
        {
          code: 155140,
          message: 'Invalid social login provider',
        },
        undefined
      )
    }
  }

  /**
   * Executes email OTP verification.
   */
  verifyOtp() {
    this.subscribeMessage()
    this.appendIframe(true, 'sso/verify-email')

    setTimeout(() => {
      if (!this.receivedResponseFromService) {
        void this.onComplete?.(
          {
            code: 155706,
            message: 'Network error',
          },
          undefined
        )
      }
    }, 1000 * 10)
  }

  /**
   * Executes the challenge.
   * @param challengeId - Challenge ID.
   * @param onCompleted - Callback function that is called when the challenge is completed.
   */
  execute(challengeId: string, onCompleted?: ChallengeCompleteCallback): void {
    this.subscribeMessage()
    this.setChallenge({ challengeId })
    this.exec(onCompleted, false)
  }

  /**
   * Sets the custom security questions. If the user doesn't provide the custom security questions, the default security questions will be used.
   * @param questions - Custom security questions.
   * @param requiredCount - Required number of security questions.
   * @param securityConfirmItems - Security confirm disclaimer items.
   */
  setCustomSecurityQuestions(
    questions?: SecurityQuestion[] | null,
    requiredCount = 2,
    securityConfirmItems?: string[]
  ): void {
    this.securityQuestions = questions
    this.securityConfirmItems = securityConfirmItems

    if (requiredCount <= 0) {
      this.securityQuestionsRequiredCount = 2
    } else {
      this.securityQuestionsRequiredCount = requiredCount
    }
  }

  /**
   * Sets the localizations.
   * @param localizations - Localizations.
   */
  setLocalizations(localizations: Localizations): void {
    this.localizations = localizations
  }

  /**
   * Sets the resources.
   * @param resources - Resources.
   */
  setResources(resources: Resources): void {
    this.resources = resources
  }

  /**
   * Sets the theme color.
   * @param themeColor - Theme color.
   */
  setThemeColor(themeColor: ThemeColor): void {
    this.themeColor = themeColor
  }

  /**
   * Sets the custom links.
   * @param customLinks - Custom links.
   */
  setCustomLinks(customLinks: CustomLinks): void {
    this.customLinks = customLinks
  }

  /**
   * Sets the callback function that is called when the user clicks the forgot pin button.
   * @param onForgotPin - Callback function that is called when the user clicks the forgot pin button.
   * @param shouldCloseModalOnForgotPin - Indicates whether the modal should be closed when the user clicks the forgot pin button.  Default is false.
   */
  setOnForgotPin(
    onForgotPin: () => void,
    shouldCloseModalOnForgotPin = false
  ): void {
    this.shouldCloseModalOnForgotPin = shouldCloseModalOnForgotPin

    this.onForgotPin = () => {
      if (this.shouldCloseModalOnForgotPin) {
        this.closeModal()
      }

      onForgotPin?.()
    }
  }

  /**
   * Sets the callback function that is called when the user clicks the resend OTP email button.
   * @param onResendOtpEmail - Callback function that is called when the user clicks the resend OTP email button.
   */
  setOnResendOtpEmail(onResendOtpEmail: () => void): void {
    this.onResendOtpEmail = onResendOtpEmail
  }

  /**
   * Sets up the instance.
   * @param configs - Configurations.
   * @param onLoginComplete - Callback function that is called when the page is redirected back from the social login provider and receives the verification result.
   */
  private setupInstance(
    configs?: Configs,
    onLoginComplete?: LoginCompleteCallback
  ) {
    if (configs?.loginConfigs?.apple && getApps().length === 0) {
      this.firebaseApp = initializeApp(configs.loginConfigs.apple)
    } else if (getApps().length !== 0) {
      this.firebaseApp = getApps()[0]
    }

    this.onLoginComplete = onLoginComplete
    this.configs = configs
    this.deviceInfo = {
      model: 'Web',
      version: packageInfo.version,
    }

    void this.execSocialLoginStatusCheck()
  }

  /**
   * Sets the challenge.
   * @param challenge - Challenge.
   */
  private setChallenge(challenge: Challenge): void {
    this.challenge = challenge
  }

  /**
   * Appends the iframe to the document body.
   * @param showIframe - Indicates whether the iframe should be shown. Default is true.
   * @param subRoute - Sub route.
   */
  private appendIframe(showIframe = true, subRoute = '') {
    const protocol = this.window.location.protocol
    const host = this.window.location.host
    const fullDomainWithProtocol = `${protocol}//${host}`

    this.iframe.src = `${this.serviceUrl}/${subRoute}?origin=${fullDomainWithProtocol}`
    this.iframe.id = 'sdkIframe'
    this.iframe.width = showIframe ? '100%' : '0%'
    this.iframe.height = showIframe ? '100%' : '0%'
    this.iframe.style.zIndex = showIframe ? '2147483647' : '-1'
    this.iframe.style.display = 'none'

    if (showIframe) {
      this.iframe.style.position = 'fixed'
      this.iframe.style.top = '50%'
      this.iframe.style.left = '50%'
      this.iframe.style.transform = 'translate(-50%, -50%)'
      this.iframe.style.display = ''
    }

    document.body.appendChild(this.iframe)
  }

  /**
   * Executes the challenge.
   * @param onCompleted - Callback function that is called when the challenge is completed.
   * @param showIframe - Indicates whether the iframe should be shown. Default is true.
   */
  private exec(onCompleted?: ChallengeCompleteCallback, showIframe = true) {
    this.appendIframe(showIframe)
    this.onComplete = onCompleted

    setTimeout(() => {
      if (!this.receivedResponseFromService) {
        void this.onComplete?.(
          {
            code: 155706,
            message: 'Network error',
          },
          undefined
        )
      }
    }, 1000 * 10)
  }

  private performAppleLogin() {
    if (!this.firebaseApp) {
      void this.onLoginComplete?.(
        {
          code: 155140,
          message: 'Please provide the Apple social login configurations.',
        },
        undefined
      )

      return
    }

    this.saveOAuthInfo(SocialLoginProvider.APPLE)
    const provider = new OAuthProvider('apple.com')
    const auth = getAuth(this.firebaseApp)

    void signInWithRedirect(auth, provider)
  }

  private performFacebookLogin() {
    if (!this?.configs?.loginConfigs?.facebook) {
      void this.onLoginComplete?.(
        {
          code: 155140,
          message: 'Please provide the Facebook social login configurations.',
        },
        undefined
      )

      return
    }

    const { appId, redirectUri } = this.configs.loginConfigs.facebook

    const { url = '', state = '' } =
      this.generateOauthUrlWithParams(
        SocialLoginProvider.FACEBOOK,
        appId,
        redirectUri
      ) || {}

    this.saveOAuthInfo(SocialLoginProvider.FACEBOOK, state)
    this.window.location.href = url
  }

  private performGoogleLogin() {
    if (!this.configs?.loginConfigs?.google) {
      void this.onLoginComplete?.(
        {
          code: 155140,
          message: 'Please provide the Google social login configurations.',
        },
        undefined
      )

      return
    }

    const { clientId, redirectUri } = this.configs.loginConfigs.google

    const {
      url = '',
      state = '',
      nonce = '',
    } = this.generateOauthUrlWithParams(
      SocialLoginProvider.GOOGLE,
      clientId,
      redirectUri
    ) || {}

    this.saveOAuthInfo(SocialLoginProvider.GOOGLE, state, nonce)
    this.window.location.href = url
  }

  /**
   * Generates the OAuth URL with the necessary parameters.
   * @param provider - Social login provider.
   * @param id - Client ID or Application ID.
   * @param redirectUri - Redirect URI.
   * @returns OAuth URL with the necessary parameters.
   */
  private generateOauthUrlWithParams(
    provider: SocialLoginProvider,
    id: string,
    redirectUri: string
  ):
    | {
        url: string
        state: string
        nonce?: string
      }
    | undefined {
    const state = uuidv4()

    if (provider === SocialLoginProvider.GOOGLE) {
      const scope = encodeURIComponent(
        'openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
      )
      const responseType = encodeURIComponent('id_token token')
      const nonce = uuidv4()

      return {
        url: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${id}&redirect_uri=${encodeURIComponent(
          redirectUri
        )}&scope=${scope}&state=${state}&response_type=${responseType}&nonce=${nonce}`,
        state,
        nonce,
      }
    } else if (provider === SocialLoginProvider.FACEBOOK) {
      const scope = encodeURIComponent('email')

      return {
        url: `https://www.facebook.com/v13.0/dialog/oauth?client_id=${id}&redirect_uri=${encodeURIComponent(
          redirectUri
        )}&scope=${scope}&state=${state}&response_type=token`,
        state,
      }
    }
  }
  /**
   * Executes the social login status check before sending the token to the verification service.
   */
  private async execSocialLoginStatusCheck(): Promise<void> {
    const socialLoginProvider = this.window.localStorage.getItem(
      'socialLoginProvider'
    ) as SocialLoginProvider

    if (socialLoginProvider === SocialLoginProvider.APPLE) {
      await this.handleAppleLoginResponse()
    } else if (this.isValidHash(this.window.location.hash)) {
      this.handleHashLoginResponse(socialLoginProvider)
    }
  }

  /**
   * Handles the Apple login response.
   * @returns Promise<void>.
   */
  private async handleAppleLoginResponse(): Promise<void> {
    const auth = getAuth(this.firebaseApp)

    try {
      const result = await getRedirectResult(auth)

      if (!result || !this.extractTokenFromResultAndSave(result)) {
        return
      }

      // Send the token to the verification service and reset the social login provider
      this.verifyTokenViaService()
      this.window.localStorage.setItem('socialLoginProvider', '')
    } catch (error) {
      this.handleLoginFailure()
    }
  }

  /**
   * Handles the hash login responses.
   * @param socialLoginProvider - Social login provider.
   */
  private handleHashLoginResponse(
    socialLoginProvider: SocialLoginProvider
  ): void {
    const hashParams = new URLSearchParams(window.location.hash.slice(1))

    if (socialLoginProvider === SocialLoginProvider.GOOGLE) {
      this.handleGoogleLogin(hashParams)
    } else if (socialLoginProvider === SocialLoginProvider.FACEBOOK) {
      this.handleFacebookLogin(hashParams)
    }

    // Send the token to the verification service
    this.verifyTokenViaService()

    // Clear the hash
    history.replaceState(null, '', window.location.href.split('#')[0])
  }

  private handleGoogleLogin(hashParams: URLSearchParams): void {
    if (
      this.isLoginStateValid(hashParams) &&
      this.isLoginNonceValid(hashParams)
    ) {
      this.socialLoginToken = hashParams.get('id_token')
      this.socialLoginProvider = SocialLoginProvider.GOOGLE
    }
  }

  private handleFacebookLogin(hashParams: URLSearchParams): void {
    if (this.isLoginStateValid(hashParams)) {
      this.socialLoginToken = hashParams.get('access_token')
      this.socialLoginProvider = SocialLoginProvider.FACEBOOK
    }
  }

  private isLoginStateValid(hashParams: URLSearchParams): boolean {
    return this.checkSocialLoginState(hashParams)
  }

  private isLoginNonceValid(hashParams: URLSearchParams): boolean {
    return this.checkSocialLoginNonce(hashParams)
  }

  private isValidHash(hash: string): boolean {
    const validHashPattern =
      /^#(?:[a-zA-Z0-9-_.%]+=[^&]*&)*[a-zA-Z0-9-_.%]+=[^&]*$/

    return validHashPattern.test(hash)
  }

  private extractTokenFromResultAndSave(result: UserCredential): boolean {
    const credential = OAuthProvider.credentialFromResult(result)

    if (credential && credential.idToken) {
      this.socialLoginToken = credential.idToken
      this.socialLoginProvider = SocialLoginProvider.APPLE
      return true
    }

    return false
  }

  private handleLoginFailure(): void {
    void this.onLoginComplete?.(
      {
        code: 155140,
        message: 'Failed to validate the idToken / accessToken',
      },
      undefined
    )
  }

  private verifyTokenViaService(): void {
    this.subscribeMessage()
    this.appendIframe(false, 'sso/verify-token')

    setTimeout(() => {
      if (!this.receivedResponseFromService) {
        void this.onComplete?.(
          {
            code: 155706,
            message: 'Network error',
          },
          undefined
        )
      }
    }, 1000 * 10)
  }

  /**
   * Saves the OAuth information to the local storage in order to check the state and nonce value later.
   * @param provider - Social login provider.
   * @param state - State value.
   * @param nonce - Nonce value.
   */
  private saveOAuthInfo(
    provider: SocialLoginProvider,
    state?: string,
    nonce?: string
  ): void {
    this.window.localStorage.setItem('socialLoginProvider', provider)
    this.window.localStorage.setItem('state', state ?? '')
    this.window.localStorage.setItem('nonce', nonce ?? '')
  }

  /**
   * Checks the state value from the social login response.
   * @param hashParams - Hash parameters.
   * @returns Indicates whether the state value is valid.
   */
  private checkSocialLoginState(hashParams: URLSearchParams) {
    const state = hashParams.get('state')
    const storedState = this.window.localStorage.getItem('state')

    if (!storedState || state !== storedState) {
      void this.onLoginComplete?.(
        {
          code: 155140,
          message: 'Failed to validate the idToken / accessToken',
        },
        undefined
      )

      return false
    }

    return true
  }

  /**
   * Checks the nonce value from the social login response. Only id token is going to have nonce value.
   * @param hashParams - Hash parameters.
   * @returns Indicates whether the nonce value is valid.
   */
  private checkSocialLoginNonce(hashParams: URLSearchParams): boolean {
    const token = hashParams.get('id_token')
    const decodedToken = decode(token || '')

    const errorPayload = {
      code: 155140,
      message: 'Failed to validate the idToken/ accessToken',
    }

    if (decodedToken === null) {
      void this.onLoginComplete?.(errorPayload, undefined)

      return false
    }

    try {
      const storedNonce = this.window.localStorage.getItem('nonce')

      if (!storedNonce || (decodedToken as JwtPayload)?.nonce !== storedNonce) {
        void this.onLoginComplete?.(errorPayload, undefined)

        return false
      }
    } catch {
      void this.onLoginComplete?.(errorPayload, undefined)

      return false
    }

    return true
  }

  /**
   * Handles the postMessage event.
   * @param event - PostMessageEvent.
   */
  readonly messageHandler = (event: PostMessageEvent): void => {
    if (event.origin !== this.serviceUrl) {
      return
    }

    if (event.data?.onFrameReady) {
      this.receivedResponseFromService = true
      const iframe = this.window.document.getElementById(
        'sdkIframe'
      ) as HTMLIFrameElement
      iframe?.contentWindow?.postMessage(
        {
          w3s: {
            appSettings: this.configs?.appSettings,
            auth: this.configs?.authentication,
            challenge: this.challenge,
            customizations: {
              securityQuestions: {
                questions: this.securityQuestions,
                requiredCount: this.securityQuestionsRequiredCount,
                securityConfirmItems: this.securityConfirmItems,
              },
              themeColor: this.themeColor,
              localizations: this.localizations,
              resources: this.resources,
              customLinks: this.customLinks,
            },
            deviceInfo: this.deviceInfo,
            ssoVerification: {
              token: this.socialLoginToken,
              deviceToken: this.configs?.loginConfigs?.deviceToken,
              deviceEncryptionKey:
                this.configs?.loginConfigs?.deviceEncryptionKey,
              socialLoginProvider: this.socialLoginProvider,
            },
            emailVerification: {
              deviceToken: this.configs?.loginConfigs?.deviceToken,
              deviceEncryptionKey:
                this.configs?.loginConfigs?.deviceEncryptionKey,
              otpToken: this.configs?.loginConfigs?.otpToken,
            },
          },
        },
        this.serviceUrl
      )
    } else if (event.data?.onForgotPin) {
      this.onForgotPin?.()
    } else if (event.data?.onComplete) {
      const iframe = this.window.document.getElementById(
        'sdkIframe'
      ) as HTMLIFrameElement
      iframe?.parentNode?.removeChild(iframe)

      void this.onComplete?.(undefined, event.data?.result)
    } else if (event.data?.deviceId) {
      this.resolveDeviceIdPromise?.(event.data.deviceId)

      this.closeModal()
      this.unSubscribeMessage()
    } else if (event.data?.showUi) {
      this.iframe.width = '100%'
      this.iframe.height = '100%'
      this.iframe.style.zIndex = '2147483647'
      this.iframe.style.position = 'fixed'
      this.iframe.style.top = '50%'
      this.iframe.style.left = '50%'
      this.iframe.style.transform = 'translate(-50%, -50%)'
      this.iframe.style.display = ''
    } else if (event.data?.onSocialLoginVerified) {
      void this.onLoginComplete?.(
        event.data.onSocialLoginVerified.error,
        event.data.onSocialLoginVerified.result
      )

      this.closeModal()
      this.unSubscribeMessage()
    } else if (event.data?.onEmailLoginVerified) {
      void this.onLoginComplete?.(
        event.data.onEmailLoginVerified.error,
        event.data.onEmailLoginVerified.result
      )

      if (
        event.data.onEmailLoginVerified.result &&
        !event.data.onEmailLoginVerified.error
      ) {
        this.unSubscribeMessage()
        this.closeModal()
      }
    } else if (event.data?.onResendOtpEmail) {
      this.onResendOtpEmail?.()
    } else if (event.data?.onError) {
      void this.onComplete?.(event.data?.error, undefined)
    } else if (event.data?.onClose) {
      this.closeModal()
      this.unSubscribeMessage()
    }
  }

  /**
   * Closes the modal.
   */
  private closeModal(): void {
    const iframe = this.window.document.getElementById(
      'sdkIframe'
    ) as HTMLIFrameElement
    iframe?.parentNode?.removeChild(iframe)
  }

  /**
   * Subscribes to the postMessage event.
   */
  private subscribeMessage(): void {
    this.window.addEventListener('message', this.messageHandler, false)
  }

  /**
   * Unsubscribes to the postMessage event.
   */
  private unSubscribeMessage(): void {
    this.window.removeEventListener('message', this.messageHandler, false)
  }
}
