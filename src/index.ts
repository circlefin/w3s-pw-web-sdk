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

import type {
  AppSettings,
  Authentication,
  Challenge,
  ChallengeCompleteCallback,
  CustomLinks,
  Localizations,
  PostMessageEvent,
  Resources,
  SecurityQuestion,
  SsoSettings,
  ThemeColor,
} from './types'

export class W3SSdk {
  private readonly serviceUrl = 'https://pw-auth.circle.com'
  private static instance: W3SSdk | null = null
  private readonly iframe: HTMLIFrameElement
  private readonly window: Window = window
  private appSettings?: AppSettings
  private auth?: Authentication
  private challenge?: Challenge
  private securityQuestions?: SecurityQuestion[] | null
  private securityQuestionsRequiredCount = 2
  private securityConfirmItems?: string[]
  private localizations?: Localizations
  private themeColor?: ThemeColor
  private resources?: Resources
  private customLinks?: CustomLinks
  private ssoSettings?: SsoSettings
  /**
   * Callback function that is called when the challenge is completed.
   */
  private onComplete?: ChallengeCompleteCallback
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

  constructor() {
    if (W3SSdk.instance != null) {
      this.iframe = W3SSdk.instance.iframe

      return W3SSdk.instance
    }

    this.iframe = document.createElement('iframe')

    W3SSdk.instance = this
  }

  /**
   * Executes the challenge.
   * @param challengeId - Challenge ID.
   * @param onCompleted - Callback function that is called when the challenge is completed.
   */
  execute(challengeId: string, onCompleted?: ChallengeCompleteCallback): void {
    this.subscribeMessage()
    this.setChallenge({ challengeId })
    this.exec(onCompleted)
  }

  /**
   * Executes the challenge with userSecret. This is used for SSO challenges.
   * @param challengeId - Challenge ID.
   * @param userSecret - User secret.
   * @param onCompleted - Callback function that is called when the challenge is completed.
   */
  executeWithUserSecret(
    challengeId: string,
    userSecret: string,
    onCompleted?: ChallengeCompleteCallback
  ) {
    this.subscribeMessage()
    this.setChallenge({ challengeId, userSecret })
    this.exec(onCompleted, !this.ssoSettings?.disableConfirmationUI)
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
   * Sets the application settings.
   * @param appSettings - Application settings.
   */
  setAppSettings(appSettings: AppSettings): void {
    this.appSettings = appSettings
  }

  /**
   * Sets the authentication information.
   * @param auth - Authentication information.
   */
  setAuthentication(auth: Authentication): void {
    this.auth = auth
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
   * Sets the SSO settings.
   * @param ssoSettings - SSO settings.
   */
  setSsoSettings(ssoSettings: SsoSettings): void {
    this.ssoSettings = ssoSettings
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
            appSettings: this.appSettings,
            auth: this.auth,
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
              ssoSettings: this.ssoSettings,
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
