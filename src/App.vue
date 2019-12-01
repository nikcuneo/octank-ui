<template>
  <div>
    <div v-if="hydrated && user.sub" id="app">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <router-view/>
    </div>
    <div align="center">
      <amplify-authenticator :authConfig="authConfig"/>
    </div>
  </div>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue'
import Amplify from 'aws-amplify'
export default {
  name: 'app',
  async beforeCreate () {
    AmplifyEventBus.$on('authState', async (state) => {
      switch (state) {
        case 'signedIn':
          this.authenticateUser()
          break
        case 'signedOut':
          this.user = {}
          break
        default:
          console.log('Event:', state)
      }
    })
  },
  async mounted() {
    await this.$apollo.provider.defaultClient.hydrated()
    this.hydrated = true
    this.authenticateUser()
  },
  data() {
    return {
      user: {},
      authConfig: {
        signUpConfig: {
          hideDefaults: true,
          signUpFields: [
            {
              label: 'Name',
              key: 'username',
              required: true,
              displayOrder: 1,
              type: 'string'
            },
            {
              label: 'Email',
              key: 'email',
              required: true,
              displayOrder: 2,
              type: 'string'
            },
            {
              label: 'Password',
              key: 'password',
              required: true,
              displayOrder: 3,
              type: 'password'
            }
          ]
        }
      },
      hydrated: true
    }
  },
  methods: {
    async authenticateUser () {
      try {
        // If a user session is in localstorage, store it in the component's data
        let user = await Amplify.Auth.currentAuthenticatedUser()
        if (user && user.signInUserSession) {
          this.user = {
            ...user.attributes,
            username: user.username
          }
        }
      } catch (e) {
        console.log('error:', e)
      }
    }
  }
}
</script>