<template>
    <v-card class="mx-auto pa-4 my-3" elevation="3">
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Token ID: {{ item.tokenId }}</span>
        <v-menu transition="scale-transition">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(option, i) in menuOptions" :key="i" @click="openDialog(option)">
              <v-list-item-title>{{ option }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-divider class="mb-3"></v-divider>
  
      <v-row>
        <!-- Left Section: Name, Image URL, Thumbnail -->
        <v-col cols="3">
          <v-text-field v-model="item.metaData.name" label="NFT Name" dense hide-details></v-text-field>
          <v-text-field v-model="item.metaData.image" label="Image URL" dense hide-details class="w-100 mt-5"></v-text-field>
          <img :src="item.metaData.image || LAZY_SRC_PLACEHOLDER" alt="NFT Image" class="mt-5" style="max-width: 100%; max-height: 100%;" />
        </v-col>
  
        <!-- Middle Section: Description -->
        <v-col cols="5">
          <QuillEditor contentType="html" v-model:content="item.metaData.description" :options="editorOptions" />
        </v-col>
  
        <!-- Right Section: Traits & Values -->
        <v-col cols="4">
          <v-row v-for="(pair, index) in item.metaData.attributes" :key="index" class="mb-2">
            <v-col cols="5">
              <v-text-field label="Trait" v-model="pair.trait_type" dense outlined></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-text-field label="Value" v-model="pair.value" dense outlined></v-text-field>
            </v-col>
            <v-col cols="2" class="d-flex align-center justify-center">
              <v-btn icon color="red" @click="removeTrait(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-btn color="primary" block class="mt-2" @click="addTrait">Add New Pair</v-btn>
        </v-col>
      </v-row>
  
      <v-divider class="my-3"></v-divider>
  
      <!-- Bottom Save Buttons -->
      <v-row>
        <v-col cols="8"></v-col>
        <v-col cols="4">
          <v-btn color="green" block class="mt-4" @click="saveToken">Save</v-btn>
        </v-col>
      </v-row>
    </v-card>
</template>
  
<script setup lang="ts">
  import { ref } from 'vue';
  import { QuillEditor } from '@vueup/vue-quill';
  import { LAZY_SRC_PLACEHOLDER } from '@/modules/constants';
  import type { Nft } from 'vue-evm-nft/src/types/useNftStore';

  const props = defineProps<{
    item: Nft;
  }>();

  // Emit event definition
  const emit = defineEmits<{
    (event: 'save', item: Nft): void;
  }>();
  
  const editorOptions = {
    theme: 'snow',
  };
  
  const menuOptions = ref(['Transfer', 'Burn', 'Template']);
  
  const addTrait = () => {
    if (!props.item.metaData.attributes) props.item.metaData.attributes = [];
    props.item.metaData.attributes.push({ trait_type: '', value: '' });
  };
  
  const removeTrait = (index: number) => {
    props.item.metaData.attributes?.splice(index, 1);
  };
  
  const saveToken = () => {
    console.log('Saving token: ', props.item);
    emit('save', props.item);
    // Add your save logic here.
  };
  
  const openDialog = (option: string) => {
    console.log('Selected option: ', option);
  };
</script>
  
<style>
  .v-card {
    width: 95%;
    margin: auto;
  }
  .ql-container {
    height: 90%;
  }
</style>
  