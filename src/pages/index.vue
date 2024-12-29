<!-- pages/index.vue -->
<template>
  <v-container class="bg-transparent mx-xs-0 mx-sm-auto px-4" max-width="1000">
    <v-img
      class="rounded my-sm-4"
      transition="fade-transition"
      src="/img/services/vuetify-nft-gallery.jpg"
      alt="Dig-A-Hash"
      height="450"
      eager
      title="Vuetify NFT Gallery"
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
    <v-card
      class="mx-auto pa-6 elevation-0 bg-grey-darken-4"
      max-width="600"
      rounded="md"
    >
      <h1 class="text-h5 sm-text-h2 text-orange">
        Vuetify NFT Gallery {{ pkgJson.version }} (TypeScript)
      </h1>

      <p class="text-body-1 text-left">
        A demo showing how to display NFTs by implementing the vue-evm-nft
        package with Vuetify and Vue using TypeScript. Use the nav menu to
        browse the different functions.
      </p>
    </v-card>
    <v-card
      class="mx-auto pa-6 elevation-0 bg-grey-darken-4 mt-4"
      max-width="600"
      rounded="md"
    >
      <h1 class="text-h5 sm-text-h2 text-orange">Examples</h1>
      <p class="text-body-1 text-left">
        Examples of production websites using the vue-evm-nft package.
      </p>
      <v-row class="mt-4 text-center">
        <v-col>
          <a href="https://www.dig-a-hash.com/" target="_new" class="link">
            <v-img
              src="/img/services/dig-a-hash-wide.png"
              height="41"
              min-width="100"
              eager
              class="mx-auto"
              title="Dig-A-Hash"
              target="_blank"
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
              title="Dog Plex"
              target="_blank"
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
              title="Urban Homestead X"
              target="_blank"
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
              min-width="100"
              height="41"
              eager
              class="mx-auto"
              title="Pour House Studios"
              target="_blank"
            ></v-img>
            <div class="mt-1 font-12">Pour House Studios</div>
          </a>
        </v-col>
      </v-row>
    </v-card>
    <v-card
      class="mx-auto pa-6 elevation-0 bg-grey-darken-4 mt-4"
      max-width="600"
      rounded="md"
    >
      <h1 class="text-h5 sm-text-h2 text-orange">More Info</h1>
      <p class="text-body-1 text-left">
        Links to repositories and documentation.
      </p>
      <v-row class="mt-4">
        <v-col cols="12" sm="6">
          <v-btn
            href="https://github.com/Dig-A-Hash/vue-evm-nft/"
            prepend-icon="mdi-github"
            variant="tonal"
            color="success"
            block
            target="_blank"
            >vue-evm-nft GitHub</v-btn
          >
        </v-col>
        <v-col class="font-14">
          Github repo for the vue-evm-nft package.
        </v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>
      <v-row>
        <v-col cols="12" sm="6">
          <v-btn
            href="https://github.com/Dig-A-Hash/vuetify-nft-gallery-ts"
            prepend-icon="mdi-github"
            variant="tonal"
            color="success"
            block
            target="_blank"
            >TypeScript Example</v-btn
          >
        </v-col>
        <v-col class="font-14"
          >The Github repo for this website, showing how to implement the
          vue-evm-nft package in TypeScript.</v-col
        >
      </v-row>
      <v-divider class="my-4"></v-divider>
      <v-row>
        <v-col cols="12" sm="6">
          <v-btn
            href="https://github.com/Dig-A-Hash/vuetify-nft-gallery"
            prepend-icon="mdi-github"
            variant="tonal"
            color="success"
            block
            target="_blank"
            >JavaScript Example</v-btn
          >
        </v-col>
        <v-col class="font-14"
          >THe Github repo for this website, showing how to implement the
          vue-evm-nft package in TypeScript.</v-col
        >
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import pkgJson from '../../package.json';
</script>
