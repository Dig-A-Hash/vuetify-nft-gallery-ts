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
const headers = [
  { text: 'Trait Type', value: 'trait_type' },
  { text: 'Value', value: 'value' },
];

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
</script>
