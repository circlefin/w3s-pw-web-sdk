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

/**
 * @jest-environment jsdom
 */

import { W3SSdk } from './'

import type { ChallengeResult, Error } from './types'

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
      false
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
      undefined
    )
  })
})
