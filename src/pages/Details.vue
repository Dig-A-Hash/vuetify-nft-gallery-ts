<template>  
  <v-container>  
    <v-card v-if="nftMetaData">  
      <v-card-title class="text-orange">{{ nftMetaData.name }}</v-card-title>  
      <div class="mx-4" v-html="nftMetaData.description"></div>  
      <v-img :src="nftMetaData.image" max-height="500" class="my-4" />  
      <v-data-table  
        :headers="headers"  
        :items="nftMetaData.attributes"  
        class="elevation-1"  
        hide-default-footer
      >  
        <!-- Editable Table Top Toolbar -->  
        <template v-slot:top>  
          <v-toolbar flat>  
            <v-toolbar-title>Attributes</v-toolbar-title>  
          </v-toolbar>  
        </template>  

        <!-- Edit Action Column -->  
        <template v-if="editable" v-slot:item.actions="{ item }">  
          <div class="d-flex justify-center align-center">  
            <v-icon  
              small  
              class="mr-2"  
              @click="editItem(item)"  
              color="primary"  
            >  
              mdi-pencil  
            </v-icon>  
          </div>  
        </template> 
      </v-data-table>  

      <!-- Edit Item Dialog -->  
      <v-dialog v-model="dialog" max-width="500px">  
        <v-card>  
          <v-card-title>  
            <span class="text-h5">{{ formTitle }}</span>  
          </v-card-title>  
          <v-card-text>  
            <v-container>  
              <v-row>  
                <v-col cols="12" sm="6">  
                  <v-text-field  
                    v-model="editedItem.trait_type"  
                    label="Trait Type"  
                  ></v-text-field>  
                </v-col>  
                <v-col cols="12" sm="6">  
                  <v-text-field  
                    v-model="editedItem.value"  
                    label="Value"  
                  ></v-text-field>  
                </v-col>  
              </v-row>  
            </v-container>  
          </v-card-text>  
          <v-card-actions>  
            <v-spacer></v-spacer>  
            <v-btn color="blue darken-1" variant="outlined" @click="close">Cancel</v-btn> 
            <v-btn color="blue darken-1" variant="elevated" @click="save">Save</v-btn>
          </v-card-actions>  
        </v-card>  
      </v-dialog>  
    </v-card>  
  </v-container>  
</template>  

<script setup lang="ts">  
import { SITE_TITLE } from '@/modules/constants';  
import { ContractName } from '@/stores/nftHelperStore';  
import type { ContractConfig } from '@/types/ContractConfig';  
import { getActiveHead } from 'unhead';  
import {  
  type EvmMetaDataOptions,  
  type EvmNftOptions,  
  type NftMetaData,  
  useEvmNft,  
} from 'vue-evm-nft';  

const route = useRoute();  
const nftHelperStore = useNftHelperStore();  

const tokenId = route.query.tokenId as string;  
const contract = route.query.contract as string;  
const nftMetaData = ref<NftMetaData | null>(null);

// Define editable flag manually for now  
const editable = ref(false);

// Table Headers  
const headers = [  
  { text: 'Trait Type', value: 'trait_type' },  
  { text: 'Value', value: 'value' },  
  { text: 'Actions', value: 'actions', sortable: false, width: '70px' },  
];  

// Dialog Controls  
const dialog = ref(false);  
const editedItem = ref<any>({});  
const editedIndex = ref(-1);  

// Dialog Computed Title  
const formTitle = computed(() =>  
  editedIndex.value === -1 ? 'New Attribute' : 'Edit Attribute'  
);  

// Initialize NFT Metadata  
onMounted(async () => {  
  // Validate query params
  if (!tokenId) {
    nftMetaData.value = null;
    const errorMessage = 'Token ID is missing.';
    throw new Error(errorMessage);
  }

  if (!contract) {
    nftMetaData.value = null;
    const errorMessage = 'Contract is missing.';
    throw new Error(errorMessage);
  }

  // Select the correct contract config based on the route.
  let contractConfig: ContractConfig;  

  switch (contract) {  
    case ContractName.UseEvmMetaDataGallery1:  
      contractConfig = nftHelperStore.getContractConfig<EvmMetaDataOptions>(  
        ContractName.UseEvmMetaDataGallery1  
      );  
      break;  

    case ContractName.UseEvmNftGallery1:  
      contractConfig = nftHelperStore.getContractConfig<EvmNftOptions>(  
        ContractName.UseEvmNftGallery1  
      );  
      break;  

    default:  
      contractConfig = nftHelperStore.getContractConfig<EvmNftOptions>(  
        ContractName.UseEvmNftGallery1  
      );  
  }  

  const evmNft = await useEvmNft(  
    0, // Ignored in this case, pass any number
    null,  
    null,  
    contractConfig.contractPublicKey,  
    contractConfig.contractAddress,  
    contractConfig.abi,  
    contractConfig.chainId  
  );  

  const nfts = await evmNft.getTokenMetaData([Number(tokenId)]);  
  nftMetaData.value = nfts[0].metaData;  

  if (!nftMetaData.value) {  
    throw new Error(`Token ID: ${tokenId} not found on Contract: ${contract}.`);  
  }  

  // Set page title and description for SEO.
  getActiveHead()?.push({  
    title: `${nftMetaData.value?.name} - ${SITE_TITLE}`,  
    meta: [  
      {  
        name: 'description',  
        content: nftMetaData.value?.description.replace(/<[^>]*>/g, ''),  
      },  
    ],  
  });  
});  

// Handle Editing  
const editItem = (item: any) => {  
  // Check if nftMetaData.value and attributes are defined  
  if (nftMetaData.value && nftMetaData.value.attributes) {  
    editedIndex.value = nftMetaData.value.attributes.indexOf(item);
    editedItem.value = { ...item }; 
    dialog.value = true;
  } else {  
    console.error('No metadata or attributes available');  
  }  
}; 

// Close Dialog  
const close = () => {  
  dialog.value = false;  
  editedItem.value = {};  
  editedIndex.value = -1;  
};  

// Save Edited Item  
const save = () => {  
  if (nftMetaData.value && nftMetaData.value.attributes && editedIndex.value > -1) {  
    // Ensure nftMetaData and its attributes exist, and the index is valid  
    Object.assign(  
      nftMetaData.value.attributes[editedIndex.value],  
      editedItem.value  
    );  
  } else {  
    console.error('Unable to save changes. Metadata or attributes are missing.');  
  }  
  dialog.value = false;
};
</script>
