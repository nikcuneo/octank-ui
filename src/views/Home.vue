<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item
          v-for="item in menu"
          :key="item.text"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader class="mt-4 grey--text text--darken-1">FOLLOWING</v-subheader>
        <v-list>
          <v-list-item
            v-for="item in users"
            :key="item.text"
          >
            <v-list-item-avatar>
              <img
                :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`"
                alt=""
              >
            </v-list-item-avatar>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list-item
          class="mt-4"
        >
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-plus-circle-outline</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Browse Channels</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Manage Subscriptions</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="blue"
      dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <router-link to="/">
          <v-icon class="mx-4">fab fa-youtube</v-icon>
        </router-link>
        <v-toolbar-title class="mr-12 align-center">
          <span color="white">Octank - Viewer Verdict</span>
        </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-row
        align="center"
        style="max-width: 650px"
      >
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="search"
          color="white"
          hide-details
        ></v-text-field>
      </v-row>
    </v-app-bar>

    <v-content>
    <v-container
      class="pa-2"
      fluid
    >
    <div v-if="$apollo.loading">
      Loading...
    </div>
    <div v-else-if="!listEvents.items.length">
      No data
    </div>
    <div v-else>
      <h5>Recommended</h5>
      <v-divider></v-divider>

      <v-row>
        <v-col
          v-for="(item, i) in listEvents.items"
          :key="i"
        >

          <v-card
            dark
            max-width="530"
          >

            <v-list-item>
              <v-list-item-avatar>
                <img
                  :src="`https://randomuser.me/api/portraits/men/${item.id}.jpg`"
                  alt=""
                >
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline" v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle v-text="item.user_id"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-img :src="item.thumbnailurl"></v-img>
            <v-card-text v-text="item.description"></v-card-text>
            <v-card-actions>
              <v-btn fab small :to="{ name: 'video', params: { id: item.id }}">
                <v-icon blue>videocam</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    </v-container>
  
    <v-container>
    <v-footer
      class="font-weight-medium"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        © {{ new Date().getFullYear() }} — <strong>Octank</strong>
      </v-col>
    </v-footer>
    </v-container>
    </v-content>
  </v-app>
</template>

<script>
import gql from 'graphql-tag'
import { listEvents } from '@/graphql/queries'

  export default {
    props: {
      source: String,
    },
    name: 'app',
    data: () => ({
      drawer: null,
      menu: [
        { icon: 'trending_up', text: 'Most Popular' },
        { icon: 'subscriptions', text: 'Subscriptions' },
        { icon: 'history', text: 'History' },
        { icon: 'featured_play_list', text: 'Playlists' },
        { icon: 'watch_later', text: 'Watch Later' },
      ],
      users: [
        { picture: 28, text: 'Joseph' },
        { picture: 38, text: 'Apple' },
        { picture: 48, text: 'Xbox Ahoy' },
        { picture: 58, text: 'Nokia' },
        { picture: 78, text: 'MKBHD' },
      ],
    }),

    created () {
      this.$vuetify.theme.dark = true
    },
    apollo: {
      listEvents: {
        query: gql(listEvents),
      },
    }
  }
</script>

<style>
a {
    color: white;
    text-decoration: none;
}
</style>