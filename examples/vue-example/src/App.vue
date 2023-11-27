<script setup>
import { W3SSdk } from '@circle-fin/w3s-pw-web-sdk'
import { onMounted, ref } from 'vue'

let sdk

onMounted(() => {
  sdk = new W3SSdk()
})

const appId = ref('')
const userToken = ref('')
const encryptionKey = ref('')
const challengeId = ref('')

function onSubmit() {
  sdk.setAppSettings({
    appId: appId.value,
  })
  sdk.setAuthentication({
    userToken: userToken.value,
    encryptionKey: encryptionKey.value,
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

  sdk.execute(challengeId.value, (error, result) => {
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
}
</script>

<template>
  <div>
    Sample App
    <br />
    <br />
    <div className="row">
      <div className="label">App Id</div>
      <input v-model="appId" />
    </div>
    <div className="row">
      <div className="label">User Token</div>
      <input v-model="userToken" />
    </div>
    <div className="row">
      <div className="label">Encryption Key</div>
      <input v-model="encryptionKey" />
    </div>
    <div className="row">
      <label className="label">Challenge Id</label>
      <input v-model="challengeId" />
    </div>
    <br />
    <button @click="onSubmit">Verify Challenge</button>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
}

.label {
  min-width: 112px;
}

input {
  min-width: 200px;
}
</style>
