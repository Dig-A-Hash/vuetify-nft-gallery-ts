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
          package with Vuetify and Vue using TypeScript.
        </p>

        <p class="text-body-1 mt-4 text-left">
          Below are links to websites using this package, followed by a
          sortable, paged list of NFTs using the Vuetify component library!
        </p>
      </v-card>

      <div class="d-flex align-center justify-space-around mt-8">
        <a href="https://www.dig-a-hash.com/" target="_new">
          <v-img
            src="/img/services/logo-hero-transparent.png"
            height="41"
            width="100"
            eager
          >
          </v-img>
        </a>
        <a href="https://www.dog-plex.com/" target="_new">
          <v-img
            src="/img/customers/dog-plex-logo.png"
            width="100"
            height="41"
            eager
          >
          </v-img>
        </a>
        <a href="https://www.urbanhomesteadx.com/" target="_new">
          <v-img
            src="/img/customers/urban-homestead-x.png"
            width="100"
            height="41"
            eager
          ></v-img>
        </a>
        <a href="https://www.pour-house-studios.com/" target="_new">
          <v-img
            src="/img/customers/pour-house.png"
            width="100"
            height="41"
            eager
          ></v-img>
        </a>
      </div>
    </div>
    <div class="text-h3 mb-4">vue-evm-nft TypeScript Demo</div>
    <v-container
      fluid
      class="ma-0 border-top-grey border-bottom-grey bg-blue-darken-4"
    >
      <v-row class="">
        <v-col cols="12" sm="6" class="d-flex justify-start align-center">
          <div>
            <div class="text-h6 mb-0">Dig-A-Hash Roadmap</div>
            <div class="mt-n1">
              Each of the announcements below is an NFT on the Avalanche C-Chain
              Mainnet!
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          class="d-flex justify-center justify-sm-end align-center"
        >
          <div v-if="nftStore.itemCollections[nftStoreItemCollectionName]">
            Viewing
            <v-chip class="mr-1">{{
              page === 1 ? '1' : (page - 1) * itemsPerPage + 1
            }}</v-chip>
            -
            <v-chip class="mr-1">{{
              page.value * itemsPerPage >
              nftStore.itemCollections[nftStoreItemCollectionName].itemCount
                ? nftStore.itemCollections[nftStoreItemCollectionName].itemCount
                : page * itemsPerPage
            }}</v-chip>
            of
            <v-chip class="mr-1">{{
              nftStore.itemCollections[nftStoreItemCollectionName].itemCount
            }}</v-chip>

            <v-btn
              size="small"
              :icon="isAscending ? 'mdi-arrow-down' : 'mdi-arrow-up'"
              class="ml-2"
              variant="outlined"
              color="white"
              :title="`Change Sort Order to ${
                isAscending ? '(Descending)' : '(Ascending)'
              }`"
              @click="toggleSortOrder"
            ></v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="pt-8 pt-2 px-2 bg-grey-darken-4">
      <v-row v-for="(nft, index) in nfts" :key="nft.tokenId">
        <v-col cols="12" sm="3" md="2">
          <v-img
            :src="nft.metaData.image"
            :lazy-src="lazy"
            class="ma-4"
          ></v-img>
        </v-col>
        <v-col>
          <div>
            <div class="text-orange text-h6 text-md-h5">
              {{ nft.metaData.name }}
            </div>
            <div class="my-2">
              <v-chip
                :color="
                  nftHelperStore.getStatusColor(
                    nftHelperStore.getStatus(nft.metaData)
                  )
                "
                >{{ nftHelperStore.getStatus(nft.metaData) }}</v-chip
              >
            </div>
            <span class="text-subtitle-1">
              <span
                v-if="
                  nftHelperStore.getStatus(nft.metaData).toLowerCase() ===
                  'complete'
                "
              >
                Release Date:
              </span>
              <span v-else> Target Release: </span>

              {{ nftHelperStore.getDate(nft.metaData) }}</span
            >
            <p class="mt-2" v-html="nft.metaData.description"></p>
            <v-btn
              class="mt-4 mr-2"
              variant="tonal"
              color="grey"
              rounded="lg"
              target="_blank"
              :href="`https://avascan.info/blockchain/c/erc721/0x33f1cdD52e7ec6F65Ab93dD518c1e2EdB3a8Dd63/nft/${nft.tokenId}`"
              append-icon="mdi-open-in-new"
              >Ava Scan NFT</v-btn
            >
            <v-btn
              class="mt-4"
              variant="tonal"
              color="grey"
              rounded="lg"
              target="_blank"
              :href="
                nftHelperStore.metaDataUrl(
                  nft.tokenId,
                  contractPublicKey,
                  chainId,
                  contractAddress
                )
              "
              append-icon="mdi-open-in-new"
              >NFT Meta-Data</v-btn
            >
          </div>
        </v-col>
        <v-divider class="my-4"></v-divider>
      </v-row>
      <v-row class="mt-6">
        <v-col>
          <v-pagination
            v-model="page"
            :length="numberOfPages"
            rounded="circle"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup lang="ts">
import pkgJson from '../../package.json';
import {
  useEvmNftGallery,
  blockchains,
  dahDemoV1Abi as abi,
  useNftStore,
} from 'vue-evm-nft';

const contractPublicKey = '0xcbb2a9868d73f24c056893131b97a69ffd36eba9';
const contractAddress: string = '0x33f1cdD52e7ec6F65Ab93dD518c1e2EdB3a8Dd63';
const chainId = blockchains.avalanche.chainId;
const itemsPerPage = 5;
const nftStoreItemCollectionName = 'nftSmartContract1';

const lazy = LAZY_SRC_PLACEHOLDER;
const nftStore = useNftStore();
const nftHelperStore = useNftHelperStore();

const {
  page,
  numberOfPages,
  nfts,
  isLoading,
  loadingMessage,
  isAscending,
  toggleSortOrder,
} = useEvmNftGallery(
  contractPublicKey,
  contractAddress,
  abi,
  chainId,
  null,
  blockchains.avalanche.publicRpc,
  itemsPerPage,
  nftStoreItemCollectionName,
  false
);
</script>
