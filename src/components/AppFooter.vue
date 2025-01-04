<template>
  <v-container class="text-center mx-auto">
    <v-row class="mt-10">
      <v-col><v-divider></v-divider></v-col>
    </v-row>
    <v-row dense class="mt-8 text-grey-darken-2">
      <v-col>
        <div class="mb-3">
          <v-btn to="/" variant="plain" height="55">
            <img
              loading="lazy"
              src="/img/services/dig-a-hash-wide.png"
              alt="Dig-A-Hash Home"
              height="45"
            />
          </v-btn>
        </div>
        <div class="text-body-2">
          <v-icon icon="mdi-copyright" size="xs" class=""></v-icon> 2022-{{
            new Date().getFullYear()
          }}
          <span>Dig-A-Hash ISC License</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script script setup lang="ts"></script>
