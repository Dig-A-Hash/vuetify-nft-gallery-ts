<template>
  <v-app>
    <v-app-bar app color="grey-darken-4" dark>
      <v-app-bar-nav-icon @click="appStore.toggleMainNav" />
      <v-toolbar-title>Vuetify NFT Gallery (TS)</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        href="https://github.com/Dig-A-Hash/vuetify-nft-gallery-ts"
        icon="mdi-github"
        target="_blank"
        size="large"
      ></v-btn>
    </v-app-bar>
    <v-navigation-drawer
      app
      v-model="appStore.isMainNavShowing"
      color="grey-darken-4"
    >
      <v-list>
        <v-divider></v-divider>

        <v-list-item link :to="'/'">
          <v-list-item-title
            ><v-icon class="mr-2">mdi-home</v-icon>Home</v-list-item-title
          >
        </v-list-item>

        <v-list-item link :to="'/useEvmNftGallery'">
          <v-list-item-title>
            <v-icon class="mr-2">mdi-image-multiple</v-icon
            >useEvmNftGallery</v-list-item-title
          >
        </v-list-item>
        <v-list-item link :to="'/useEvmMetaDataGallery'">
          <v-list-item-title>
            <v-icon class="mr-2">mdi-image-multiple</v-icon
            >useEvmMetaDataGallery</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
const appStore = useAppStore();
</script>
