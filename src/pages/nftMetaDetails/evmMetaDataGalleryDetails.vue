<!-- pages/evmMetaDataGalleryDetails.vue -->

<template>
    <v-container>
        <v-card v-if="nftMetaData">
            <v-card-title>{{ nftMetaData.name }}</v-card-title>
            <v-card-subtitle v-html="nftMetaData.description"></v-card-subtitle>
            <v-img :src="nftMetaData.image" height="200" />

            <v-data-table :headers="headers" :items="nftMetaData.attributes"
                :items-per-page="nftMetaData.attributes.length" class="elevation-1" hide-default-footer>
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>Attributes</v-toolbar-title>
                    </v-toolbar>
                </template>
            </v-data-table>
        </v-card>
        <v-alert v-else-if="loadingMessage" type="info">{{ loadingMessage }}</v-alert>
        <v-alert v-else type="error">NFT metadata not found!</v-alert>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import {
    useEvmMetaDataGallery,
    blockchains,
    dahDemoV1Abi as abi,
    type Nft,
} from 'vue-evm-nft';

const route = useRoute();
const tokenId = route.query.tokenId as string; // Get the tokenId from the URL query  

// Initialize required variables  
const nftMetaData = ref<Nft | null>(null);
const loadingMessage = ref('Loading NFT metadata...'); // Initialize loading message  
const headers = [
    { text: 'Trait Type', value: 'trait_type' },
    { text: 'Value', value: 'value' }
];

// Define your contract details  
const contractPublicKey = '0xcbb2a9868d73f24c056893131b97a69ffd36eba9';
const contractAddress: string = '0xd8de74b630c8bf1b3ca59010e601c3e271f0d85b';
const chainId = blockchains.fantom.chainId;
const rpc = blockchains.fantom.publicRpc;

const itemsPerPage = 50;
const nftStoreItemCollectionName = 'useEvmMetaDataGallery1';
const startTime = performance.now();
const elapsedFormattedTime = ref('');

const {
    isLoading,
    getTokenMetaData
} = useEvmMetaDataGallery({
    contractPublicKey,
    contractAddress,
    abi,
    chainId,
    rpc,
    itemsPerPage,
    nftStoreItemCollectionName,
    isAscendingSort: false,
    isGetAllNftQuery: false,
});

watch(isLoading, async (value) => {
    if (!value) {
        if (!tokenId || isNaN(Number(tokenId))) {
            loadingMessage.value = 'Token ID is missing or invalid!';
            return;
        }

        const endTime = performance.now();
        const elapsedTime = endTime - startTime;
        elapsedFormattedTime.value = (elapsedTime / 1000).toFixed(2) + ' seconds';

        try {
            // Fetch NFT metadata for the specific token ID
            const metaData = await getTokenMetaData([Number(tokenId)]);
            console.log('meta data:', metaData)
            nftMetaData.value = metaData[0]?.metaData ?? null; // Assign metadata to reactive variable
            loadingMessage.value = ''; // Clear loading message
        } catch (error) {
            console.error('Error fetching NFT metadata:', error);
            loadingMessage.value = 'Failed to load metadata.';
        }
    }
});
</script>
