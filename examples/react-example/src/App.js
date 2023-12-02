import { W3SSdk } from '@circle-fin/w3s-pw-web-sdk'
import { useCallback, useEffect, useState } from 'react'

let sdk

function App() {
  useEffect(() => {
    sdk = new W3SSdk()
  }, [])

  const [appId, setAppId] = useState()
  const [userToken, setUserToken] = useState()
  const [encryptionKey, setEncryptionKey] = useState()
  const [challengeId, setChallengeId] = useState()

  const onAppIdChange = useCallback((e) => {
    setAppId(e.target.value)
  }, [])
  const onUserTokenChange = useCallback((e) => {
    setUserToken(e.target.value)
  }, [])
  const onEncryptionKeyChange = useCallback((e) => {
    setEncryptionKey(e.target.value)
  }, [])
  const onChallengeIdChange = useCallback((e) => {
    setChallengeId(e.target.value)
  }, [])

  const onSubmit = useCallback(() => {
    sdk.setAppSettings({
      appId,
    })
    sdk.setAuthentication({
      userToken,
      encryptionKey,
    })

    // If you want to customize the UI, you can uncomment & use the following code.
    // sdk.setLocalizations({
    //   common: {
    //     continue: 'Next',
    //   },
    //   securityIntros: {
    //     headline:
    //       'Set up your {{method}} to recover your pin code if you forget it',
    //     headline2: 'Security Question',
    //   },
    // })

    // sdk.setThemeColor({
    //   backdrop: '#fcba03',
    //   backdropOpacity: 0.8,
    //   textMain: '#2403fc'
    // })

    // sdk.setResources({
    //   naviClose:
    //     'https://static.vecteezy.com/system/resources/previews/018/887/462/non_2x/signs-close-icon-png.png',
    //   securityIntroMain:
    //     'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_auto,q_auto:best/rockcms/2022-01/210602-doge-meme-nft-mb-1715-8afb7e.jpg',
    //   fontFamily: {
    //     name: 'Edu TAS Beginner',
    //     url: 'https://fonts.googleapis.com/css2?family=Edu+TAS+Beginner:wght@400;500;600;700&display=swap',
    //   },
    // })

    // sdk.setCustomSecurityQuestions(
    //   [
    //     {
    //       question: 'What is your favorite color?',
    //       type: 'TEXT',
    //     },
    //     {
    //       question: 'What is your favorite food?',
    //       type: 'TEXT',
    //     },
    //     {
    //       question: 'When is your birthday?',
    //       type: 'DATE',
    //     },
    //   ],
    //   1
    // )

    sdk.execute(challengeId, (error, result) => {
      if (error) {
        console.log(
          `${error?.code?.toString() || 'Unknown code'}: ${
            error?.message ?? 'Error!'
          }`
        )

        return
      }

      console.log(`Challenge: ${result.type}`)
      console.log(`status: ${result.status}`)

      if (result.data) {
        console.log(`signature: ${result.data?.signature}`)
      }
    })
  }, [appId, challengeId, encryptionKey, userToken])

  return (
    <div>
      Sample App
      <br />
      <br />
      <div className="row">
        <div className="label">App Id</div>
        <input onChange={onAppIdChange} value={appId} />
      </div>
      <div className="row">
        <div className="label">User Token</div>
        <input onChange={onUserTokenChange} value={userToken} />
      </div>
      <div className="row">
        <div className="label">Encryption Key</div>
        <input onChange={onEncryptionKeyChange} value={encryptionKey} />
      </div>
      <div className="row">
        <label className="label">Challenge Id</label>
        <br />
        <input onChange={onChallengeIdChange} value={challengeId} />
      </div>
      <br />
      <button onClick={onSubmit}>Verify Challenge</button>
    </div>
  )
}

export default App
