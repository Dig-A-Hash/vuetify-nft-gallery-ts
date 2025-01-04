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
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Attributes</v-toolbar-title>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-card>
    <v-alert v-else-if="loadingMessage !== ''" type="info">{{
      loadingMessage
    }}</v-alert>
    <v-alert v-else type="error">NFT metadata not found.</v-alert>
  </v-container>
</template>

<script setup lang="ts">
import { SITE_TITLE } from '@/modules/constants';
import { ContractName } from '@/stores/nftHelperStore';
import type { ContractConfig } from '@/types/ContractConfig';
import { getActiveHead } from 'unhead';
import {
  useEvmNft,
  type NftMetaData,
  type EvmNftOptions,
  type EvmMetaDataOptions,
} from 'vue-evm-nft';

const route = useRoute();
const nftHelperStore = useNftHelperStore();

const tokenId = route.query.tokenId as string;
const nftMetaData = ref<NftMetaData | null>(null);
const loadingMessage = ref('Loading NFT metadata...');
const headers = [
  { text: 'Trait Type', value: 'trait_type' },
  { text: 'Value', value: 'value' },
];

// Select the correct contract config based on the route.
var contractConfig: ContractConfig;

switch (route.query.contract) {
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
}

onMounted(async () => {
  try {
    if (!tokenId) {
      throw new Error('Token ID is missing!');
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
    loadingMessage.value = '';

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
  } catch (error: any) {
    console.error('Error fetching NFT metadata:', error.message);
    nftMetaData.value = null;
    loadingMessage.value = error.message;
  }
});
</script>
