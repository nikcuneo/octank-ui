<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
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
            v-for="item in items2"
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
        </router-link>      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Octank - Viewer Verdict</span>
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
      <div v-else-if="!getEvent">
        No data
      </div>
      <div v-else>
        <v-card
        max-width="800"
        class="mx-auto"
      >
        <v-list-item>
          <v-list-item-avatar color="red"></v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline" v-text="getEvent.title"></v-list-item-title>
            <v-list-item-subtitle v-text="getEvent.user_id"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <iframe width="100%" height="350px" :src="getEvent.videourl" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>
        <v-row>
          <v-col
                 cols="12"
        sm="8"
        md="10">
            <v-card-text v-text="getEvent.description">
            </v-card-text>
          </v-col>
          <v-col>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card-text align=center>
              <div class="title text--primary">Your Verdict?</div>
              <v-chip-group>
              <v-row>
                <v-col>
                  <v-chip @click="vote(getEvent,'up')">
                    <v-icon left color="green">mdi-thumb-up</v-icon>
                    AGREE
                  </v-chip>
                </v-col>
                <v-col>
                  <v-chip @click="vote(getEvent,'down')">
                    <v-icon left color="red">mdi-thumb-down</v-icon>
                    DISAGREE
                  </v-chip>
                </v-col>
              </v-row>
              </v-chip-group>
            </v-card-text>
          </v-col>
          <v-col>
            <v-card-text align=center>
              <div class="title text--primary" style="padding-bottom: 10px">Consensus</div>
                <v-row>
                  <v-col>
                    <v-icon left color="green">mdi-thumb-up</v-icon>
                    AGREE - {{getEvent.upvotes}}
                  </v-col>
                  <v-col>
                    <v-icon left color="red">mdi-thumb-down</v-icon>
                    DISAGREE - {{getEvent.downvotes}}
                  </v-col>
                </v-row>
            </v-card-text>
          </v-col>
        </v-row>

      <v-card-text>
      <div class="title text--primary">Comments</div>
      <v-list two-line>
      <v-list-item-group
        multiple
        active-class="blue--text"
      >
        <template v-for="(item, index) in comments">
          <v-list-item :key="item.title">
            <template v-slot:default="{ active, toggle }">
              <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
                <v-icon
                  v-if="!active"
                  color="blue"
                >
                  mdi-thumb-up-outline
                </v-icon>

                <v-icon
                  v-else
                  color="blue"
                >
                  mdi-thumb-up
                </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index + 1 < items.length"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
      </v-card-text>

      </v-card>
      </div>
    </v-container>

     <v-footer
      padless
      class="font-weight-medium"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        © {{ new Date().getFullYear() }} — <strong>Octank</strong>
      </v-col>
    </v-footer>
    </v-content>
  </v-app>
</template>

<script>
  import gql from 'graphql-tag'
  import { getEvent } from '@/graphql/queries'
  import { updateEvent } from '@/graphql/mutations'


  export default {
    props: {
      source: String,
    },

    data() {
      return {
        routeParam: this.$route.params.id,
        drawer: null,
        items: [
          { icon: 'trending_up', text: 'Most Popular' },
          { icon: 'subscriptions', text: 'Subscriptions' },
          { icon: 'history', text: 'History' },
          { icon: 'featured_play_list', text: 'Playlists' },
          { icon: 'watch_later', text: 'Watch Later' },
        ],
        items2: [
          { picture: 28, text: 'Joseph' },
          { picture: 38, text: 'Apple' },
          { picture: 48, text: 'Xbox Ahoy' },
          { picture: 58, text: 'Nokia' },
          { picture: 78, text: 'MKBHD' },
        ],
        comments: [
          {
            action: '15 min',
            title: 'Ali Connors',
            subtitle: "What an absolute disgrace, entirely wrong call on this one",
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          },
          {
            action: '2 hr',
            title: 'Bobby Mgee',
            subtitle: "Given the circumstances I think this was reasonable",
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          },
          {
            action: '6 hr',
            title: 'Sandra Adams',
            subtitle: 'You have got to be kidding me! No way! Stupid!',
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          },
          {
            action: '12 hr',
            title: 'Terri Hansen',
            subtitle: 'I have no faith in this sport after this decision',
            avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          },
          {
            action: '18hr',
            title: 'Britta Holt',
            subtitle: 'Woohoo! Go you good thing',
            avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          },
        ],
      }
    },
    apollo: {
      getEvent: {
        query: gql(getEvent),
        variables() {
          return{
          id: this.routeParam,
          }
         },
      },
    },
    created () {
      this.$vuetify.theme.dark = true
    },

    methods: {
      vote(event, toggle) {
        if(toggle==="up") {
          event.upvotes++;
        } else if (toggle==="down") {
          event.downvotes++;
        }
        this.$apollo.mutate({
          mutation: gql(updateEvent),
          variables: { input: { id: event.id, upvotes: event.upvotes } },
        })
      },
    },
  }
</script>
