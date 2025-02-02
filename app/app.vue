<script setup lang="ts">
import { appName } from '~~/shared/constants'

useHead({
  title: appName,
})
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
