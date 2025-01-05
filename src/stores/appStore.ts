import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', () => {
  const router = useRouter();
  const isMainNavShowing = ref<boolean | null>(null);
  const isGlobalErrorShowing = ref(false);
  const lastError = ref<Error | null>(null);

  function toggleMainNav() {
    isMainNavShowing.value = !isMainNavShowing.value;
  }

  function handleGlobalError(error: unknown) {
    if (error instanceof Error) {
      lastError.value = error;
      console.error(error.message);
    } else {
      console.error(error);
      lastError.value = new Error(`Unhandled Error: ${error}`);
    }

    isGlobalErrorShowing.value = true;
  }

  function dismissErrorDialog() {
    isGlobalErrorShowing.value = false;
    lastError.value = null;
  }

  function dismissErrorGoHome() {
    isGlobalErrorShowing.value = false;
    lastError.value = null;
    router.push('/');
  }

  return {
    isMainNavShowing,
    toggleMainNav,
    handleGlobalError,
    isGlobalErrorShowing,
    dismissErrorDialog,
    dismissErrorGoHome,
    lastError,
  };
});
