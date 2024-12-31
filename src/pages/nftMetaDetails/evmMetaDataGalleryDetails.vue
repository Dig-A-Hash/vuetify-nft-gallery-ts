<!-- pages/evmMetaDataGalleryDetails.vue -->

<template>
  <v-container>
    <v-card v-if="nftMetaData">
      <v-card-title>{{ nftMetaData.name }}</v-card-title>
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
    <v-alert v-else-if="loadingMessage" type="info">{{
      loadingMessage
    }}</v-alert>
    <v-alert v-else type="error">NFT metadata not found.</v-alert>
  </v-container>
</template>

<script setup lang="ts">
import {
  useEvmNft,
  blockchains,
  dahDemoV1Abi as abi,
  type NftMetaData,
} from 'vue-evm-nft';

const route = useRoute();

const tokenId = route.query.tokenId as string;
const nftMetaData = ref<NftMetaData | null>(null);
const loadingMessage = ref('Loading NFT metadata...');
const headers = [
  { text: 'Trait Type', value: 'trait_type' },
  { text: 'Value', value: 'value' },
];

// Define contract details
const contractPublicKey = '0xcbb2a9868d73f24c056893131b97a69ffd36eba9';
const contractAddress: string = '0xd8de74b630c8bf1b3ca59010e601c3e271f0d85b';
const chainId = blockchains.fantom.chainId;

onMounted(async () => {
  if (tokenId) {
    try {
      const evmNft = await useEvmNft(
        0, // Ignored in this case, pass any number
        null,
        null,
        contractPublicKey,
        contractAddress,
        abi,
        chainId
      );

      const metaData = await evmNft.getTokenMetaData([Number(tokenId)]);
      nftMetaData.value = metaData[0].metaData;
      loadingMessage.value = '';
      useSeo(nftMetaData.value.name, nftMetaData.value.name);
    } catch (error) {
      console.error('Error fetching NFT metadata:', error);
      nftMetaData.value = null;
      loadingMessage.value = '';
    }
  } else {
    loadingMessage.value = 'Token ID is missing!';
  }
});
</script>
