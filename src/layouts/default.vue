<!-- layouts/default.vue -->
<template>
  <v-app>
    <!-- App Bar 
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>My Nuxt App</v-toolbar-title>
    </v-app-bar>
    -->
    <!-- Navigation Drawer -->
    <v-navigation-drawer app v-model="drawer" color="grey lighten-4">
      <v-list>
        <v-list-item>
          <v-list-item-title>Navigation</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <!-- Sample Navigation Links -->
        <v-list-item link :to="'/'">
          <v-list-item-title> <v-icon>mdi-home</v-icon>Home</v-list-item-title>
        </v-list-item>

        <v-list-item link :to="'/about'">
          <v-list-item-title>
            <v-icon>mdi-information</v-icon>About</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <RouterView />
    </v-main>

    <!-- Footer
    <v-footer app>
      <v-container>
        <span>&copy; {{ new Date().getFullYear() }} My Nuxt App</span>
      </v-container>
    </v-footer>
     -->
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";

// Reactive state for drawer
const drawer = ref(false);
</script>
