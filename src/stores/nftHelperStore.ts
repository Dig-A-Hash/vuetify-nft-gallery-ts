import type { ContractConfig } from '@/types/ContractConfig';
import { defineStore } from 'pinia';
import {
  type EvmMetaDataOptions,
  type EvmNftOptions,
  blockchains,
  dahDemoV1Abi,
} from 'vue-evm-nft';

// Name the NFT Contracts used by this site.
export enum ContractName {
  UseEvmNftGallery1 = 'useEvmNftGallery1',
  UseEvmMetaDataGallery1 = 'useEvmMetaDataGallery1',
}

// Define contract configurations for each Contract Name
const contractConfigs: ContractConfig[] = [
  // Dig-A-Hash Roadmap Contract Details
  {
    contractPublicKey: '0xcbb2a9868d73f24c056893131b97a69ffd36eba9',
    contractAddress: '0x33f1cdD52e7ec6F65Ab93dD518c1e2EdB3a8Dd63',
    abi: dahDemoV1Abi,
    chainId: blockchains.avalanche.chainId,
    holderPublicKey: null,
    rpc: blockchains.avalanche.publicRpc,
    itemsPerPage: 5,
    nftStoreItemCollectionName: ContractName.UseEvmNftGallery1,
    isAscendingSort: false,
  } as EvmNftOptions,

  // Pour House Studios Paintings Contract Details
  {
    contractPublicKey: '0xcbb2a9868d73f24c056893131b97a69ffd36eba9',
    contractAddress: '0xd8de74b630c8bf1b3ca59010e601c3e271f0d85b',
    abi: dahDemoV1Abi,
    chainId: blockchains.fantom.chainId,
    rpc: blockchains.fantom.publicRpc,
    itemsPerPage: 50,
    nftStoreItemCollectionName: ContractName.UseEvmMetaDataGallery1,
    isAscendingSort: false,
    isGetAllNftQuery: false,
  } as EvmMetaDataOptions,
];

/**
 * This Pinia Store is intended to be customized to create helpers for NFT
 * meta data.
 */
export const useNftHelperStore = defineStore('nftHelperStore', {
  state: () => ({
    contractConfigs,
  }),

  getters: {
    getContractConfigs: (state) => {
      return contractConfigs;
    },
    getContractConfig: () => {
      return <T extends ContractConfig>(
        nftStoreItemCollectionName: string,
      ): T => {
        const config = contractConfigs.find(
          (item) =>
            item.nftStoreItemCollectionName === nftStoreItemCollectionName,
        );

        if (!config) {
          throw new Error('Contract config not found');
        }

        return config as T;
      };
    },
    getStatusColor: () => {
      return (status: string | null) => {
        switch (status) {
          case 'N/A':
            return 'gray';
          case 'Beta':
            return 'yellow';
          case 'Complete':
            return 'success';
          case 'In Progress':
            return 'warning';
          default:
            return 'gray';
        }
      };
    },
  },
});
