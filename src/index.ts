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
  ChallengeResult,
  ChallengeStatus,
  ChallengeType,
  CustomLinks,
  Error,
  Localizations,
  PostMessageEvent,
  Resources,
  SecurityQuestion,
  SignMessageResult,
  ThemeColor,
} from './types'

export class W3SSdk {
  private readonly serviceUrl = 'https://auth.circle.com'
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
  /**
   * Callback function that is called when the challenge is completed.
   */
  private onComplete?: (
    error: Error | undefined,
    result: ChallengeResult | undefined
  ) => Promise<void> | void

  private shouldCloseModalOnForgotPin = false
  /**
   * Callback function that is called when the user clicks the forgot pin button.
   */
  private onForgotPin?: () => void
  private receivedResponseFromService = false

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
  execute(
    challengeId: string,
    onCompleted?: (
      error: Error | undefined,
      result: ChallengeResult | undefined
    ) => Promise<void> | void
  ): void {
    this.subscribeMessage()
    this.setChallenge({ challengeId })

    const protocol = this.window.location.protocol
    const host = this.window.location.host
    const fullDomainWithProtocol = `${protocol}//${host}`

    this.iframe.src = `${this.serviceUrl}/?origin=${fullDomainWithProtocol}`
    this.iframe.id = 'sdkIframe'
    this.iframe.width = '100%'
    this.iframe.height = '100%'

    this.iframe.style.position = 'fixed'
    this.iframe.style.top = '50%'
    this.iframe.style.left = '50%'
    this.iframe.style.transform = 'translate(-50%, -50%)'

    document.body.appendChild(this.iframe)

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

      const result: ChallengeResult | undefined =
        event.data?.result != null
          ? {
              type: event.data?.result.type as ChallengeType,
              status: event.data?.result.status as ChallengeStatus,
              data: event.data?.result.data as SignMessageResult,
            }
          : undefined

      void this.onComplete?.(undefined, result)
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
