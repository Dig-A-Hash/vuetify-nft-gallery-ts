<template>
  <v-sheet class="bg-transparent mx-xs-0 mx-sm-auto px-4 mt-4" max-width="1000">
    <div class="text-h4 mb-4 text-orange">useEvmNftGallery TypeScript Demo</div>
    <v-container
      fluid
      class="ma-0 border-top-grey border-bottom-grey bg-blue-darken-4"
    >
      <v-row class="">
        <v-col cols="12" sm="6" class="d-flex justify-start align-center">
          <div>
            <div class="text-h6 mb-0">Dig-A-Hash Roadmap NFTs</div>
            <div class="mt-n1 font-12">
              Fetched in
              {{
                elapsedFormattedTime === ''
                  ? '0.0 Seconds (Pinia Cached Results)'
                  : elapsedFormattedTime
              }}
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

    <v-container
      v-show="!nfts.length"
      fluid
      class="pt-8 pt-2 px-2 bg-grey-darken-4 text-center"
    >
      <v-progress-circular
        indeterminate
        color="grey-darken-1"
        class="mb-2"
        width="12"
        size="96"
      ></v-progress-circular
      ><br />
      {{ loadingMessage }}
    </v-container>

    <v-container
      v-show="nfts.length"
      fluid
      class="pt-8 pt-2 px-2 bg-grey-darken-4"
    >
      <v-row v-for="(nft, index) in nfts" :key="nft.tokenId">
        <v-col cols="12" sm="3" md="2">
          <v-img
            :src="nft.metaData.image"
            :lazy-src="lazy"
            class="ma-4"
            height="150"
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
                    nftStore.getPublicAttributeValue(nft.metaData, 'status')
                  )
                "
                >{{
                  nftStore.getPublicAttributeValue(nft.metaData, 'status')
                }}</v-chip
              >
            </div>
            <span class="text-subtitle-1">
              <span
                v-if="
                  nftStore
                    .getPublicAttributeValue(nft.metaData, 'status')
                    ?.toLowerCase() === 'complete'
                "
              >
                Release Date:
              </span>
              <span v-else> Target Release: </span>

              {{
                nftStore.getPublicAttributeValue(nft.metaData, 'date') || 'N/A'
              }}</span
            >
            <p class="mt-2" v-html="nft.metaData.description"></p>
            <v-btn
              class="mt-4 mr-2"
              variant="tonal"
              color="blue"
              rounded="lg"
              target="_blank"
              @click="goToMetaDataPage(nft.tokenId)"
              prepend-icon="mdi-table"
              >Detail View</v-btn
            >
            <v-btn
              class="mt-4 mr-2"
              variant="tonal"
              color="grey"
              rounded="lg"
              target="_blank"
              :href="
                nftStore.explorerTokenUrl(
                  nft.tokenId,
                  contractAddress,
                  blockchains.avalanche
                )
              "
              prepend-icon="mdi-open-in-new"
              >Verify On-Chain</v-btn
            >
            <v-btn
              class="mt-4"
              variant="tonal"
              color="grey"
              rounded="lg"
              target="_blank"
              :href="
                nftStore.digaMetaDataUrl(
                  nft.tokenId,
                  contractPublicKey,
                  chainId,
                  contractAddress
                )
              "
              prepend-icon="mdi-open-in-new"
              >Raw Meta-Data</v-btn
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
import { useRouter } from 'vue-router';

const router = useRouter();
const nftStore = useNftStore();
const nftHelperStore = useNftHelperStore();
useSeo('useEvmMetaData', 'useEvmMetaData TypeScript NFT Demo');

const contractPublicKey = '0xcbb2a9868d73f24c056893131b97a69ffd36eba9';
const contractAddress: string = '0x33f1cdD52e7ec6F65Ab93dD518c1e2EdB3a8Dd63';
const chainId = blockchains.avalanche.chainId;
const itemsPerPage = 5;
const nftStoreItemCollectionName = 'useEvmNftGallery1';
const lazy = LAZY_SRC_PLACEHOLDER;

// Start timing before fetching NFTs
var startTime = performance.now();
const elapsedFormattedTime = ref('');

const {
  page,
  numberOfPages,
  nfts,
  isLoading,
  loadingMessage,
  isAscending,
  toggleSortOrder,
  getTokenMetaData,
} = useEvmNftGallery({
  contractPublicKey,
  contractAddress,
  abi,
  chainId,
  holderPublicKey: null,
  rpc: blockchains.avalanche.publicRpc,
  itemsPerPage,
  nftStoreItemCollectionName,
  isAscendingSort: false,
});

// Stop timing after the operation is complete
watch(isLoading, (value) => {
  if (value) {
    startTime = performance.now();
  } else {
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    elapsedFormattedTime.value = (elapsedTime / 1000).toFixed(2) + ' seconds';
  }
});

const goToMetaDataPage = (tokenId: number) => {
  router.push(`/nftMetaDetails/evmNftGalleryDetails?tokenId=${tokenId}`);
};
</script>
