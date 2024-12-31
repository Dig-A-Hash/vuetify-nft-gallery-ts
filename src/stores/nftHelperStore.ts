import { defineStore } from 'pinia';
import { useNftStore, type NftMetaData } from 'vue-evm-nft';

const nftStore = useNftStore();

/**
 * This is intended to be customized to create helpers for NFT
 * meta data.
 */
export const useNftHelperStore = defineStore('nftHelperStore', {
  state: () => ({}),

  getters: {
    getStatus: () => {
      return (metaData: NftMetaData) => {
        return nftStore.getPublicAttributeValue(metaData, 'status') || 'N/A';
      };
    },
    getDate: () => {
      return (metaData: NftMetaData) => {
        return nftStore.getPublicAttributeValue(metaData, 'date') || 'N/A';
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
