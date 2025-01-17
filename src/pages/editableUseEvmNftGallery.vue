<template>  
  <v-sheet class="bg-transparent mx-xs-0 mx-sm-auto px-4 mt-4">  
    <div class="text-h4 mb-4 text-orange">useEvmNftGallery TypeScript Demo</div>  

    <v-container fluid class="ma-0 border-top-grey border-bottom-grey bg-blue-darken-4">  
      <v-row>  
        <v-col cols="12" sm="6" class="d-flex justify-start align-center">  
          <div>  
            <div class="text-h6 mb-0">Dig-A-Hash Roadmap NFTs</div>  
            <div class="mt-n1 font-12">  
              Fetched in {{ elapsedFormattedTime === '' ? '0.0 Seconds (Pinia Cached Results)' : elapsedFormattedTime }}  
            </div>  
          </div>  
        </v-col>  
        <v-col cols="12" sm="6" class="d-flex justify-center justify-sm-end align-center">  
          <div v-if="nftStore.itemCollections[contractConfig.nftStoreItemCollectionName]">  
            Viewing  
            <v-chip class="mr-1">{{ page === 1 ? '1' : (page - 1) * contractConfig.itemsPerPage + 1 }}</v-chip>  
            -  
            <v-chip class="mr-1">{{ page.value * contractConfig.itemsPerPage > nftStore.itemCollections[contractConfig.nftStoreItemCollectionName].itemCount ? nftStore.itemCollections[contractConfig.nftStoreItemCollectionName].itemCount : page * contractConfig.itemsPerPage }}</v-chip>  
            of  
            <v-chip class="mr-1">{{ nftStore.itemCollections[contractConfig.nftStoreItemCollectionName].itemCount }}</v-chip>  

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

    <v-container v-show="!nfts.length" fluid class="pt-8 pt-2 px-2 bg-grey-darken-4 text-center">  
      <v-progress-circular indeterminate color="grey-darken-1" class="mb-2" width="12" size="96"></v-progress-circular><br />  
      {{ loadingMessage }}  
    </v-container>  

    <v-container v-show="nfts.length" fluid class="pt-8 pt-2 px-2 bg-grey-darken-4">  
      <v-data-table  
        :headers="nftHeaders"  
        :items="nfts"  
        item-value="metaDataUrl"  
        class="elevation-1 main-nft-table"  
        show-expand  
        v-model:expanded="expanded"  
      >  
        <template v-slot:top>  
          <v-toolbar flat>  
            <v-toolbar-title>NFT Gallery</v-toolbar-title>  
          </v-toolbar>  
        </template>  

        <template v-slot:item.metaData.name="{ item }">
          <v-text-field  
            v-model="item.metaData.name"  
            label=""  
            dense  
            hide-details  
            class="fill-height"
          ></v-text-field>  
        </template>

        <template v-slot:item.metaData.description="{ item }">
          <div class="mt-0">
            <QuillEditor contentType="html" v-model:content="item.metaData.description" :options="editorOptions" />  
          </div>
        </template>

        <template v-slot:item.metaData.image="{ item }">
          <img  
              :src="item.metaData.image || LAZY_SRC_PLACEHOLDER"  
              alt="NFT Image"  
              style="max-width: 50px; max-height: 50px;"  
            />   
          <v-text-field  
            v-model="item.metaData.image"  
            label=""  
            dense  
            hide-details
            class="w-100"
            ></v-text-field> 
        </template>
        
        <!-- Expanded Row Content -->  
        <template v-slot:expanded-row="{ columns, item }"> 
          <tr v-if="columns.length">  
            <td :colspan="nftHeaders.length">
              <v-data-table
                :headers="attributeHeaders"
                :items="item.metaData.attributes"
                item-value="trait_type"
                class="elevation-1 w-100 mb-5"
                show-group-by
                hide-default-footer
              >
                <template v-slot:top>  
                  <v-toolbar class="bg-grey-darken-4" flat>  
                    <v-toolbar-title class="display-2">Attributes:</v-toolbar-title>  
                  </v-toolbar>  
                </template>  

                <template v-slot:item.trait_type="{ item }">
                  <v-text-field  
                    v-model="item.trait_type"  
                    label=""  
                    dense  
                    hide-details  
                  ></v-text-field>  
                </template>
              
                <template v-slot:item.value="{ item }">
                  <v-text-field  
                    v-model="item.value"  
                    label=""  
                    dense  
                    hide-details  
                  ></v-text-field>  
                </template>
              </v-data-table>
            </td>
          </tr>
        </template>  
      </v-data-table>  

      <v-row class="mt-6">  
        <v-col>  
          <v-pagination v-model="page" :length="numberOfPages" rounded="circle"></v-pagination>  
        </v-col>  
      </v-row>  
    </v-container>  
  </v-sheet>  
</template>  

<script setup lang="ts">  
import { ref, watch } from 'vue'; // Ensure you have the appropriate imports  
import { LAZY_SRC_PLACEHOLDER } from '@/modules/constants';  
import {  
  type EvmNftOptions,  
  dahDemoV1Abi as abi,  
  blockchains,  
  useEvmNftGallery,  
  useNftStore,  
} from 'vue-evm-nft';  
import { useRouter } from 'vue-router';  
import { QuillEditor } from '@vueup/vue-quill';  

const router = useRouter();  
const nftStore = useNftStore();  
const nftHelperStore = useNftHelperStore();  
useSeo('useEvmMetaData', 'useEvmMetaData TypeScript NFT Demo');  

const contractConfig = nftHelperStore.getContractConfig<EvmNftOptions>('useEvmNftGallery1');  

let startTime = performance.now();  
const elapsedFormattedTime = ref('');  
const expanded = ref<string[]>([]); // Define expanded state  

const {  
  page,  
  numberOfPages,  
  nfts,  
  isLoading,  
  loadingMessage,  
  isAscending,  
  toggleSortOrder,  
} = useEvmNftGallery(contractConfig);  

// Stop timing after the operation is complete  
watch(isLoading, (value) => {  
  if (value) {  
    startTime = performance.now();  
  } else {  
    const endTime = performance.now();  
    const elapsedTime = endTime - startTime;  
    elapsedFormattedTime.value = `${(elapsedTime / 1000).toFixed(2)} seconds`;
     // Expand all rows by default  
    if (nfts.value.length > 0) {  
      expanded.value = nfts.value.map(nft => String(nft.metaDataUrl));
    }
  }  
});  

const goToMetaDataPage = (tokenId: number) => {  
  router.push(`/Details?&contract=${contractConfig.nftStoreItemCollectionName}&tokenId=${tokenId}`);  
};  

// Define the headers for the v-data-table  
const nftHeaders = [  
  { title: 'Name', value: 'metaData.name' },  
  { title: 'Description', value: 'metaData.description', width: '700px', innerHeight: '700px' },  
  { title: 'Image', value: 'metaData.image', sortable: false },  
  { title: '', value: 'metaData.symbol', sortable: false, width: '50px' },  
];  

const attributeHeaders = [  
  { title: 'Trait Type', value: 'trait_type' },  
  { title: 'Value', value: 'value' } 
];
 
const editorContent = ref('<p>Initial content</p>');  

// Define options for the editor  
const editorOptions = {  
  theme: 'snow',  
}; 
</script>

<style>  
.main-nft-table tbody tr {  
  min-height: 200px;  
}
</style> 