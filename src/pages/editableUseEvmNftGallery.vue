<template>
  <v-sheet class="bg-transparent mx-xs-0 mx-sm-auto px-4 mt-4">
    <div class="text-h4 mb-4 text-orange">useEvmNftGallery TypeScript Demo</div>

    <!-- Header Section -->
    <v-container fluid class="ma-0 border-top-grey border-bottom-grey bg-blue-darken-4">
      <v-row>
        <v-col cols="12" sm="6" class="d-flex justify-start align-center">
          <div>
            <div class="text-h6 mb-0">Dig-A-Hash Roadmap NFTs</div>
            <div class="mt-n1 font-12">
              Fetched in {{ elapsedFormattedTime || '0.0 Seconds (Pinia Cached Results)' }}
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="6" class="d-flex justify-center justify-sm-end align-center">
          <div v-if="nftStore.itemCollections[contractConfig.nftStoreItemCollectionName]">
            Viewing  
            <v-chip class="mr-1">{{ currentPageStart }}</v-chip> -  
            <v-chip class="mr-1">{{ currentPageEnd }}</v-chip> of  
            <v-chip class="mr-1">{{ totalItems }}</v-chip>

            <v-btn
              size="small"
              :icon="isAscending ? 'mdi-arrow-down' : 'mdi-arrow-up'"
              class="ml-2"
              variant="outlined"
              color="white"
              :title="`Change Sort Order to ${isAscending ? '(Descending)' : '(Ascending)'}`"
              @click="toggleSortOrder"
            ></v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Loading State -->
    <v-container v-show="!nfts.length" fluid class="pt-8 px-2 bg-grey-darken-4 text-center">
      <v-progress-circular indeterminate color="grey-darken-1" class="mb-2" width="12" size="96"></v-progress-circular><br />
      {{ loadingMessage }}
    </v-container>

    <!-- NFT Cards -->
    <v-container v-show="nfts.length" fluid class="pt-8 px-2">
      <v-row>
        <v-col v-for="tokenItem in nfts" :key="tokenItem.metaDataUrl" cols="12">
          <meta-data-editor class="mx-auto pa-4 my-3" :item="tokenItem" @save="onSaveToken"/>
        </v-col>
      </v-row>

      <!-- Pagination -->
      <v-row class="mt-6">
        <v-col>
          <v-pagination v-model="page" :length="numberOfPages" rounded="circle"></v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import {  
    type EvmNftOptions,  
    dahDemoV1Abi as abi,  
    blockchains,  
    useEvmNftGallery,  
    useNftStore,  
  } from 'vue-evm-nft'; 
  import MetaDataEditor from '@/components/metaDataEditor.vue';
  import type { Nft } from 'vue-evm-nft/src/types/useNftStore';

  const nftStore = useNftStore();
  const nftHelperStore = useNftHelperStore();

  const elapsedFormattedTime = ref('');
  const contractConfig = nftHelperStore.getContractConfig<EvmNftOptions>('useEvmNftGallery1');  

  const { page, numberOfPages, nfts, isLoading, loadingMessage, isAscending, toggleSortOrder } = useEvmNftGallery(contractConfig);

  // Define the menuOptions here
  const menuOptions = ref(['Transfer', 'Burn', 'Template']); // Example options

  // Computed Pagination Helpers
  const totalItems = computed(() => nftStore.itemCollections[contractConfig.nftStoreItemCollectionName]?.itemCount || 0);
  const currentPageStart = computed(() => (page.value - 1) * contractConfig.itemsPerPage + 1);
  const currentPageEnd = computed(() => Math.min(page.value * contractConfig.itemsPerPage, totalItems.value));
  let startTime = performance.now();  

  watch(isLoading, (value) => {
    if (!value) {
      elapsedFormattedTime.value = `${((performance.now() - startTime) / 1000).toFixed(2)} seconds`;
    }
  });

  const onSaveToken = (item: Nft) => {
    console.log('Token saved:', item);
    // Add your save logic here (API call, store update, etc.)
  };

  </script>

  <style>
  .v-card {
    width: 95%;
    margin: auto;
  }
</style>
