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
          <v-card class="mx-auto pa-4 my-3" elevation="3">
            <v-card-title class="d-flex justify-space-between align-center">
              <span>Token ID: {{ tokenItem.tokenId }}</span>
              <v-menu transition="scale-transition">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="(item, i) in menuOptions" :key="i" @click="openDialog(item)">
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-divider class="mb-3"></v-divider>

            <v-row>
              <!-- Left Section: Name, Image URL, Thumbnail -->
              <v-col cols="3">
                <v-text-field 
                  v-model="tokenItem.metaData.name"
                  label="NFT Name"
                  dense
                  hide-details
                ></v-text-field>
                <v-text-field  
                  v-model="tokenItem.metaData.image"  
                  label="Image URL"  
                  dense  
                  hide-details
                  class="w-100 mt-5"
                  ></v-text-field> 
                <img  
                  :src="tokenItem.metaData.image || LAZY_SRC_PLACEHOLDER"  
                  alt="NFT Image"  
                  class="mt-5"
                  style="max-width: 100%; max-height: 100%;"  
                />  
              </v-col>

              <!-- Middle Section: Description -->
              <v-col cols="5">
                <div class="mt-0" style="height: 95%;">
                  <QuillEditor contentType="html" v-model:content="tokenItem.metaData.description" :options="editorOptions" />  
                </div>
              </v-col>

              <!-- Right Section: Traits & Values -->
              <v-col cols="4">
                <v-row v-for="(pair, index) in tokenItem.metaData.attributes" :key="index" class="mb-2">
                  <v-col cols="5">
                    <v-text-field label="Trait" v-model="pair.trait_type" dense outlined></v-text-field>
                  </v-col>
                  <v-col cols="5">
                    <v-text-field label="Value" v-model="pair.value" dense outlined></v-text-field>
                  </v-col>
                  <v-col cols="2" class="d-flex align-center justify-center">
                    <v-btn icon color="red" @click="removeTrait(tokenItem, index)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

                <v-btn color="primary" block class="mt-2" @click="addTrait(tokenItem)">
                  Add New Pair
                </v-btn>
              </v-col>
            </v-row>

            <v-divider class="my-3"></v-divider>

            <!-- Bottom Save Buttons -->
            <v-row>
              <v-col cols="8"></v-col>
              <v-col cols="4">
                <v-btn color="green" block class="mt-4" @click="saveToken(tokenItem)">
                  Save
                </v-btn>
              </v-col>
            </v-row>

          </v-card>
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
import { LAZY_SRC_PLACEHOLDER } from '@/modules/constants';
import {  
  type EvmNftOptions,  
  dahDemoV1Abi as abi,  
  blockchains,  
  useEvmNftGallery,  
  useNftStore,  
} from 'vue-evm-nft'; 
import { QuillEditor } from '@vueup/vue-quill';

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

// Trait Management
const addTrait = (tokenItem: any) => {
  if (!tokenItem.metaData.attributes) tokenItem.metaData.attributes = [];
  tokenItem.metaData.attributes.push({ trait_type: '', value: '' });
};

const removeTrait = (tokenItem: any, index: number) => {
  if (tokenItem.metaData.attributes) tokenItem.metaData.attributes.splice(index, 1);
};

const editorOptions = {  
  theme: 'snow',  
};

// Define the saveToken method here
const saveToken = (token: any) => {
  // Logic for saving the token
  console.log('Saving token: ', token);
  // You can replace the console.log with your saving logic (e.g., API call or local storage).
};

const openDialog = (Option: any) => {
  // Logic for saving the token
  console.log('Saving token: ', Option);
  // You can replace the console.log with your saving logic (e.g., API call or local storage).
};

</script>

<style>
.v-card {
  width: 95%;
  margin: auto;
}
</style>
