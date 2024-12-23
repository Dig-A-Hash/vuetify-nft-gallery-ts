<!-- pages/nftMetaDataDetails.vue -->

<template>
    <v-container>
        <v-card v-if="nftMetaData">
            <v-card-title>{{ nftMetaData.name }}</v-card-title>
            <v-card-subtitle v-html="nftMetaData.description"></v-card-subtitle>
            <v-img :src="nftMetaData.image" height="200" />
            <v-data-table :headers="headers" :items="nftMetaData.attributes" class="elevation-1">
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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {
    useEvmNft,
    blockchains,
    dahDemoV1Abi as abi,
} from 'vue-evm-nft';

const route = useRoute();
const tokenId = route.query.tokenId as string; // Get the tokenId from the URL query  

// Initialize required variables  
const nftMetaData = ref(null);
const loadingMessage = ref('Loading NFT metadata...'); // Initialize loading message  
const headers = [
    { text: 'Trait Type', value: 'trait_type' },
    { text: 'Value', value: 'value' }
];

// Define your contract details  
const contractPublicKey = '0xcbb2a9868d73f24c056893131b97a69ffd36eba9';
const contractAddress = '0x33f1cdD52e7ec6F65Ab93dD518c1e2EdB3a8Dd63';
const chainId = blockchains.avalanche.chainId;

onMounted(async () => {
    if (tokenId) {
        try {
            // Initialize the EVM NFT composable  
            const evmNft = await useEvmNft(
                0, // This is ignored, you can pass any number  
                null,
                null,
                contractPublicKey,
                contractAddress.toLowerCase(),
                abi,
                chainId
            );

            // Fetch NFT metadata for the specific token ID  
            const metaData = await evmNft.getTokenMetaData([Number(tokenId)]);
            nftMetaData.value = metaData[0].metaData; // assign to nftMetaData.value  
            loadingMessage.value = ''; // Clear loading message  
        } catch (error) {
            console.error('Error fetching NFT metadata:', error);
            nftMetaData.value = null; // Handle error case  
            loadingMessage.value = ''; // Clear loading message  
        }
    } else {
        loadingMessage.value = 'Token ID is missing!';
    }
});
</script>
