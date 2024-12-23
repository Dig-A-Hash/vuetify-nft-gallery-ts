<!-- pages/index.vue -->
<template>
  <v-sheet class="bg-transparent mx-xs-0 mx-sm-auto px-4" max-width="1000">
    <div class="text-center mb-8 pt-4 mt-8">
      <div class="d-flex justify-center">
        <v-img
          transition="fade-transition"
          src="/img/services/vuetify-nft-gallery.jpg"
          alt="Dig-A-Hash"
          height="450"
          eager
        />
      </div>

      <v-card
        class="mx-auto mt-10 pa-6 elevation-0 bg-grey-darken-4"
        max-width="600"
        rounded="xl"
      >
        <h1 class="text-h5 sm-text-h2 text-orange">
          Vuetify NFT Gallery {{ pkgJson.version }}
        </h1>

        <p class="text-body-1 mt-2 text-left">
          This is a demo of how to display NFTs by implementing the vue-evm-nft
          package with Vuetify and Vue using TypeScript. Use the nav menu to
          browse the different functions.
        </p>

        <p class="text-body-1 mt-4 text-left">
          Below are links to websites using the vue-evm-nft package.
        </p>
      </v-card>

      <div class="d-flex align-center justify-space-around mt-8">
        <a href="https://www.dig-a-hash.com/" target="_new" class="link">
          <v-img
            src="/img/services/logo-hero-transparent.png"
            height="41"
            width="100"
            eager
            class="mx-auto"
          >
          </v-img>
          <div class="mt-1 font-12">Dig-A-Hash</div>
        </a>
        <a href="https://www.dog-plex.com/" target="_new" class="link">
          <v-img
            src="/img/customers/dog-plex-logo.png"
            width="100"
            height="41"
            eager
            class="mx-auto"
          >
          </v-img>
          <div class="mt-1 font-12">Dog Plex</div>
        </a>
        <a href="https://www.urbanhomesteadx.com/" target="_new" class="link">
          <v-img
            src="/img/customers/urban-homestead-x.png"
            width="100"
            height="41"
            eager
            class="mx-auto"
          ></v-img>
          <div class="mt-1 font-12">Urban Homestead X</div>
        </a>
        <a
          href="https://www.pour-house-studios.com/"
          target="_new"
          class="link"
        >
          <v-img
            src="/img/customers/pour-house.png"
            width="100"
            height="41"
            eager
            class="mx-auto"
          ></v-img>
          <div class="mt-1 font-12">Pour House Studios</div>
        </a>
      </div>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import pkgJson from '../../package.json';
</script>
