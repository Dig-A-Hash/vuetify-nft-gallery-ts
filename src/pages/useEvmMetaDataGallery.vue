<!-- pages/index.vue -->
<template>
  <v-sheet class="bg-transparent mx-xs-0 mx-sm-auto px-4" max-width="1000">
    <div class="text-h4 mb-4 mt-4 text-orange">
      useEvmMetaData TypeScript Demo
    </div>
    <v-container
      fluid
      class="ma-0 border-top-grey border-bottom-grey bg-blue-darken-4"
    >
      <v-row class="">
        <v-col cols="12" sm="6" class="d-flex justify-start align-center">
          <div>
            <div class="text-h6 mb-0">Painting NFTs</div>
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
          <div
            v-if="
              nftStore.itemCollections[
                contractConfig.nftStoreItemCollectionName
              ]
            "
          >
            Viewing
            <v-chip class="mr-1">{{
              page === 1 ? '1' : (page - 1) * contractConfig.itemsPerPage + 1
            }}</v-chip>
            -
            <v-chip class="mr-1">{{
              page.value * contractConfig.itemsPerPage >
              nftStore.itemCollections[
                contractConfig.nftStoreItemCollectionName
              ].itemCount
                ? nftStore.itemCollections[
                    contractConfig.nftStoreItemCollectionName
                  ].itemCount
                : page * contractConfig.itemsPerPage
            }}</v-chip>
            of
            <v-chip class="mr-1">{{
              nftStore.itemCollections[
                contractConfig.nftStoreItemCollectionName
              ].itemCount
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
            :src="nftStore.getImageMedium(nft.metaData.image)"
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
              {{ nftStore.getPublicAttributeValue(nft.metaData, 'status') }}
            </div>
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
                  contractConfig.contractAddress,
                  blockchains.fantom
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
                  contractConfig.contractPublicKey,
                  contractConfig.chainId || 0,
                  contractConfig.contractAddress
                )
              "
              prepend-icon="mdi-open-in-new"
              >Raw Meta-Data</v-btn
            >
          </div>
        </v-col>
        <v-divider class="ma-4"></v-divider>
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
import {
  useEvmMetaDataGallery,
  blockchains,
  dahDemoV1Abi as abi,
  useNftStore,
  type EvmMetaDataOptions,
} from 'vue-evm-nft';
import { useRouter } from 'vue-router';

const router = useRouter();
const nftStore = useNftStore();
const nftHelperStore = useNftHelperStore();
useSeo('useEvmMetaDataGallery', 'useEvmMetaDataGallery TypeScript NFT Demo');

const contractConfig = nftHelperStore.getContractConfig<EvmMetaDataOptions>(
  'useEvmMetaDataGallery1'
);
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
} = useEvmMetaDataGallery(contractConfig);

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
  router.push(`/nftMetaDetails/evmMetaDataGalleryDetails?tokenId=${tokenId}`);
};
</script>
