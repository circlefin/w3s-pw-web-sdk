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

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unsafe-argument */
/* eslint-disable  @typescript-eslint/no-unsafe-member-access */
/* eslint-disable  @typescript-eslint/no-unsafe-assignment */
/* eslint-disable  @typescript-eslint/no-unsafe-return */

/**
 * @jest-environment jsdom
 */
import { FirebaseError } from 'firebase/app'
import * as firebaseAuth from 'firebase/auth'

import { SocialLoginProvider } from './types'

import { W3SSdk } from './'

import type { ChallengeResult, Configs, Error } from './types'

jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  signInWithPopup: jest.fn(),
  getAuth: jest.fn(),
}))

describe('W3SSdk', () => {
  let sdk: W3SSdk
  let appendChildSpy: jest.SpyInstance
  let addEventListenerSpy: jest.SpyInstance

  beforeEach(() => {
    appendChildSpy = jest.spyOn(document.body, 'appendChild')
    addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    sdk = new W3SSdk()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should register message handler on execute', () => {
    sdk.execute('some-challenge-id')
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'message',
      expect.any(Function),
      false,
    )
  })

  it('should send postMessage on frame ready', () => {
    sdk.execute('some-challenge-id')
    expect(appendChildSpy).toHaveBeenCalled()
    const appendedNode = appendChildSpy.mock.calls[0][0]
    expect(appendedNode).toBeInstanceOf(HTMLIFrameElement)
  })

  it('should call onComplete correctly on challenge complete', () => {
    const onComplete = jest.fn()
    const event = {
      origin: 'https://pw-auth.circle.com',
      data: {
        onComplete: true,
        result: {
          type: 'SET_PIN',
          status: 'COMPLETE',
        },
      },
    }
    sdk.execute('some-challenge-id', onComplete)
    sdk.messageHandler(event as any)
    expect(onComplete).toHaveBeenCalledWith(undefined, {
      type: 'SET_PIN',
      status: 'COMPLETE',
    } as ChallengeResult)
  })

  it('should call onComplete correctly on error', () => {
    const onComplete = jest.fn()
    const event = {
      origin: 'https://pw-auth.circle.com',
      data: {
        onError: true,
        error: {
          status: 400,
          code: 1,
          message: 'Some error',
        },
      },
    }
    sdk.execute('some-challenge-id', onComplete)
    sdk.messageHandler(event as any)
    expect(onComplete).toHaveBeenCalledWith(
      {
        status: 400,
        code: 1,
        message: 'Some error',
      } as Error,
      undefined,
    )
  })
})

describe('W3SSdk > Apple OAuth', () => {
  const localStorageMock = (() => {
    let store: { [key: string]: string } = {}

    return {
      getItem(key: string): string {
        return store[key] || ''
      },
      setItem(key: string, value: string): void {
        store[key] = value
      },
      removeItem(key: string): void {
        delete store[key]
      },
      clear(): void {
        store = {}
      },
      length: 0,
      key(index: number): string | null {
        return Object.keys(store)[index] || null
      },
    }
  })()

  let sdk: W3SSdk
  const configs: Configs = {
    appSettings: {
      appId: 'test-app-id',
    },
    loginConfigs: {
      deviceToken: 'device-token',
      deviceEncryptionKey: 'device-encryption-key',
      apple: {
        apiKey: 'test-api-key',
        authDomain: 'test-auth-domain',
        projectId: 'test-project-id',
        storageBucket: 'test-storage-bucket',
        messagingSenderId: 'test-messaging-sender-id',
        appId: 'test-app-id',
      },
    },
  }

  beforeEach(() => {
    jest.resetAllMocks()
    Object.defineProperty(window, 'localStorage', { value: localStorageMock })
    window.localStorage.clear()

    const onLoginComplete = jest.fn()
    sdk = new W3SSdk(configs, onLoginComplete)

    // Simulate firebaseApp being initialized
    const mockFirebaseApp = {}
    Object.defineProperty(sdk, 'firebaseApp', {
      get: jest.fn(() => mockFirebaseApp),
      configurable: true,
    })

    sdk = new W3SSdk(configs, onLoginComplete)
  })

  it('should perform Apple login successfully', async () => {
    // Mock signInWithPopup to resolve to a UserCredential
    const userCredentialMock = {
      user: { uid: 'test-uid' },
      credential: { idToken: 'test-id-token' },
    }
    ;(firebaseAuth.signInWithPopup as jest.Mock).mockResolvedValueOnce(
      userCredentialMock,
    )

    // Mock extractTokenFromResultAndSave to return true
    const extractTokenSpy = jest
      .spyOn(sdk as any, 'extractTokenFromResultAndSave')
      .mockReturnValue(true)

    // Mock verifyTokenViaService
    const verifyTokenSpy = jest
      .spyOn(sdk as any, 'verifyTokenViaService')
      .mockImplementation(() => {})

    await sdk.performLogin(SocialLoginProvider.APPLE)

    expect(firebaseAuth.signInWithPopup).toHaveBeenCalled()
    expect(extractTokenSpy).toHaveBeenCalledWith(userCredentialMock)
    expect(verifyTokenSpy).toHaveBeenCalled()

    expect(window.localStorage.getItem('socialLoginProvider')).toBe('')
  })

  it('should handle signInWithPopup error during Apple login', async () => {
    // Mock getAuth
    const mockAuth = { getProvider: jest.fn() }
    ;(firebaseAuth.getAuth as jest.Mock).mockReturnValue(mockAuth)

    // Mock signInWithPopup to reject
    const error = new Error('sign in error')
    ;(firebaseAuth.signInWithPopup as jest.Mock).mockRejectedValueOnce(error)

    // Mock handleLoginFailure
    const handleLoginFailureSpy = jest
      .spyOn(sdk as any, 'handleLoginFailure')
      .mockImplementation(() => {})

    await sdk.performLogin(SocialLoginProvider.APPLE)

    expect(firebaseAuth.signInWithPopup).toHaveBeenCalled()
    expect(handleLoginFailureSpy).toHaveBeenCalled()
  })

  it('should not handle signInWithPopup auth/cancelled-popup-request error during Apple login', async () => {
    // Mock getAuth
    const mockAuth = { getProvider: jest.fn() }
    ;(firebaseAuth.getAuth as jest.Mock).mockReturnValue(mockAuth)

    // Mock signInWithPopup to reject
    const error = new FirebaseError(
      'auth/cancelled-popup-request',
      'sign in error',
    )
    ;(firebaseAuth.signInWithPopup as jest.Mock).mockRejectedValueOnce(error)

    // Mock handleLoginFailure
    const handleLoginFailureSpy = jest
      .spyOn(sdk as any, 'handleLoginFailure')
      .mockImplementation(() => {})

    await sdk.performLogin(SocialLoginProvider.APPLE)

    expect(firebaseAuth.signInWithPopup).toHaveBeenCalled()
    expect(handleLoginFailureSpy).toHaveBeenCalledTimes(0)
  })

  it('should not handle signInWithPopup auth/popup-closed-by-user error during Apple login', async () => {
    // Mock getAuth
    const mockAuth = { getProvider: jest.fn() }
    ;(firebaseAuth.getAuth as jest.Mock).mockReturnValue(mockAuth)

    // Mock signInWithPopup to reject
    const error = new FirebaseError(
      'auth/popup-closed-by-user',
      'sign in error',
    )
    ;(firebaseAuth.signInWithPopup as jest.Mock).mockRejectedValueOnce(error)

    // Mock handleLoginFailure
    const handleLoginFailureSpy = jest
      .spyOn(sdk as any, 'handleLoginFailure')
      .mockImplementation(() => {})

    await sdk.performLogin(SocialLoginProvider.APPLE)

    expect(firebaseAuth.signInWithPopup).toHaveBeenCalled()
    expect(handleLoginFailureSpy).toHaveBeenCalledTimes(0)
  })

  it('should handle other signInWithPopup Firebase errors during Apple login gracefully', async () => {
    // Mock getAuth
    const mockAuth = { getProvider: jest.fn() }
    ;(firebaseAuth.getAuth as jest.Mock).mockReturnValue(mockAuth)

    // Mock signInWithPopup to reject
    const error = new FirebaseError(
      'auth/user-cancelled',
      'Firebase: Error (auth/user-cancelled).',
    )
    ;(firebaseAuth.signInWithPopup as jest.Mock).mockRejectedValueOnce(error)

    // Mock handleLoginFailure
    const handleLoginFailureSpy = jest
      .spyOn(sdk as any, 'handleFirebaseFailure')
      .mockImplementation(() => {})

    await sdk.performLogin(SocialLoginProvider.APPLE)

    expect(firebaseAuth.signInWithPopup).toHaveBeenCalled()
    expect(handleLoginFailureSpy).toHaveBeenCalledWith(error)
  })

  it('should handle general errors during Apple login', async () => {
    // Mock getAuth
    const mockAuth = { getProvider: jest.fn() }
    ;(firebaseAuth.getAuth as jest.Mock).mockReturnValue(mockAuth)

    // Mock signInWithPopup to reject
    const error = new Error('general error')
    ;(firebaseAuth.signInWithPopup as jest.Mock).mockRejectedValueOnce(error)

    // Mock handleLoginFailure
    const handleLoginFailureSpy = jest
      .spyOn(sdk as any, 'handleLoginFailure')
      .mockImplementation(() => {})

    await sdk.performLogin(SocialLoginProvider.APPLE)

    expect(firebaseAuth.signInWithPopup).toHaveBeenCalled()
    expect(handleLoginFailureSpy).toHaveBeenCalledTimes(1)
  })
})

describe('W3SSdk > Google OAuth > selectAccountPrompt is true', () => {
  let sdk: W3SSdk
  const configs: Configs = {
    appSettings: {
      appId: 'test-app-id',
    },
    loginConfigs: {
      deviceToken: 'device-token',
      deviceEncryptionKey: 'device-encryption-key',
      google: {
        clientId: 'test-client-id',
        redirectUri: 'test-redirect-uri',
        selectAccountPrompt: true,
      },
    },
  }

  beforeEach(() => {
    ;(W3SSdk as any).instance = null
    jest.resetAllMocks()

    const onLoginComplete = jest.fn()
    sdk = new W3SSdk(configs, onLoginComplete)
  })

  it('should generate the right parameters', async () => {
    const performGoogleLoginSpy = jest.spyOn(sdk as any, 'performGoogleLogin')

    const generateOauthUrlWithParamsSpy = jest.spyOn(
      sdk as any,
      'generateOauthUrlWithParams',
    )

    await sdk.performLogin(SocialLoginProvider.GOOGLE)

    expect(performGoogleLoginSpy).toHaveBeenCalled()
    expect(generateOauthUrlWithParamsSpy).toHaveBeenLastCalledWith(
      'Google',
      'test-client-id',
      'test-redirect-uri',
      true,
    )
  })

  it('should update the global this location href correctly', async () => {
    await sdk.performLogin(SocialLoginProvider.GOOGLE)

    expect(window.location.href).toContain('prompt=select_account')
  })
})

describe('W3SSdk > Google OAuth > selectAccountPrompt is false or empty', () => {
  let sdk: W3SSdk
  const configs: Configs = {
    appSettings: {
      appId: 'test-app-id',
    },
    loginConfigs: {
      deviceToken: 'device-token',
      deviceEncryptionKey: 'device-encryption-key',
      google: {
        clientId: 'test-client-id',
        redirectUri: 'test-redirect-uri',
      },
    },
  }

  beforeEach(() => {
    ;(W3SSdk as any).instance = null
    jest.resetAllMocks()

    const onLoginComplete = jest.fn()
    sdk = new W3SSdk(configs, onLoginComplete)
  })

  it('should generate the right parameters', async () => {
    const performGoogleLoginSpy = jest.spyOn(sdk as any, 'performGoogleLogin')

    const generateOauthUrlWithParamsSpy = jest.spyOn(
      sdk as any,
      'generateOauthUrlWithParams',
    )

    await sdk.performLogin(SocialLoginProvider.GOOGLE)

    expect(performGoogleLoginSpy).toHaveBeenCalled()
    expect(generateOauthUrlWithParamsSpy).toHaveBeenLastCalledWith(
      'Google',
      'test-client-id',
      'test-redirect-uri',
      undefined,
    )
  })

  it('should update the global this location href correctly', async () => {
    await sdk.performLogin(SocialLoginProvider.GOOGLE)

    expect(window.location.href).toContain('prompt=none')
  })
})
