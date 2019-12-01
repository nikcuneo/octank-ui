import Vue from 'vue'
import App from './App.vue'

import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue'

import awsConfig from './aws-exports';

import VueApollo from 'vue-apollo'
import AWSAppSyncClient from 'aws-appsync'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuetify from './plugins/vuetify';
import router from './router'


const config = {
  url: awsConfig.aws_appsync_graphqlEndpoint,
  region: awsConfig.aws_appsync_region,
  auth: {
    type: awsConfig.aws_appsync_authenticationType,
    // the below function is run on each request, so it is always kept up to date
    jwtToken: async () => (await AmplifyModules.Auth.currentSession()).getIdToken().getJwtToken()
  },
  disableOffline: true // this was added to stop an issue with duplicated list items
}

const options = {
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  }
}

// Both Amplify and Appsync need to be configured, despite taking many of the same settings
Amplify.configure(awsConfig);
const client = new AWSAppSyncClient(config, options)

const appsyncProvider = new VueApollo({
  defaultClient: client
})

// Ensure we have the use of Amplify components throughout the app
Vue.use(AmplifyPlugin, AmplifyModules)

Vue.use(BootstrapVue)
Vue.use(VueApollo)
Vue.use(vuetify)

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  vuetify,
  router,
  apolloProvider: appsyncProvider
}).$mount('#app')