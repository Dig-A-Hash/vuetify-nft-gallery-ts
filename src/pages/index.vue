<!-- pages/index.vue -->
<template>
  <v-container class="bg-transparent mx-xs-0 mx-sm-auto px-4" max-width="1000">
    <div class="mt-sm-4">
      <v-img
        class="rounded"
        transition="fade-transition"
        src="/img/services/vuetify-nft-gallery.jpg"
        alt="Dig-A-Hash"
        height="450"
        eager
      >
        <template #sources>
          <source
            srcset="
              /img/services/vuetify-nft-gallery-450.webp   450w,
              /img/services/vuetify-nft-gallery-1000.webp 1000w
            "
            sizes="(max-width: 500px) 200px, 1000px"
            type="image/webp"
          />
        </template>
      </v-img>
    </div>
    <div class="text-center pt-4">
      <v-card
        class="mx-auto pa-6 elevation-0 bg-grey-darken-4"
        max-width="600"
        rounded="md"
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

      <v-row class="mt-4">
        <v-col>
          <a href="https://www.dig-a-hash.com/" target="_new" class="link">
            <v-img
              src="/img/services/dig-a-hash-wide.png"
              height="41"
              eager
              class="mx-auto"
            >
            </v-img>
            <div class="mt-1 font-12">Dig-A-Hash</div>
          </a>
        </v-col>
        <v-col>
          <a href="https://www.dog-plex.com/" target="_new" class="link">
            <v-img
              src="/img/customers/dog-plex-logo.webp"
              height="41"
              eager
              class="mx-auto"
            >
            </v-img>
            <div class="mt-1 font-12">Dog Plex</div>
          </a>
        </v-col>
        <v-col>
          <a href="https://www.urbanhomesteadx.com/" target="_new" class="link">
            <v-img
              src="/img/customers/urban-homestead-x.webp"
              width="100"
              height="41"
              eager
              class="mx-auto"
            ></v-img>
            <div class="mt-1 font-12">Urban Homestead X</div>
          </a>
        </v-col>
        <v-col>
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
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import pkgJson from '../../package.json';
</script>
