import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', () => {
  const isMainNavShowing = ref<boolean | null>(null);
  function toggleMainNav() {
    isMainNavShowing.value = !isMainNavShowing.value;
  }

  return { isMainNavShowing, toggleMainNav };
});
