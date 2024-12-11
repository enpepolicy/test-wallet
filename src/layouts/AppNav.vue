<template>
  <div class="w-full container mx-auto">
    <div class="w-full flex items-center justify-between">
      <a
        class="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
        href="https://eventhorizontech.eu/"
      >
        <img
          src="/favicon.png"
          alt="Wallet Logo"
          :class="['h-20 w-20 mr-2 logo', { 'logo-loaded': isImageLoaded }]"
          @load="handleImageLoad"
        />
        <span
          class="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500"
          >Asset Viewer
        </span>
      </a>

      <div class="flex w-1/2 md:w-1/3 justify-end content-center">
        <span
          :class="
            currentNetworkId === 0
              ? 'bg-gray-600/80 font-regular'
              : currentNetworkId === 1
              ? 'bg-yellow-600 font-bold'
              : 'bg-green-600/90 font-bold'
          "
          class="rounded-full my-auto py-2 px-4 text-white mr-3"
        >
          {{
            currentNetworkId === 0
              ? t('layouts.app-nav.no-chain')
              : String(NetworkEnum[currentNetworkId]).split('_').join(' ')
          }}
        </span>
        <!-- <a
          class="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
          target="_blank"
          href="https://github.com/enpepolicy/test-wallet"
        >
          <svg
            class="fill-current h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 6c-3.313 0-6 2.686-6 6 0 2.651 1.719 4.9 4.104 5.693.3.056.396-.13.396-.289v-1.117c-1.669.363-2.017-.707-2.017-.707-.272-.693-.666-.878-.666-.878-.544-.373.041-.365.041-.365.603.042.92.619.92.619.535.917 1.403.652 1.746.499.054-.388.209-.652.381-.802-1.333-.152-2.733-.667-2.733-2.965 0-.655.234-1.19.618-1.61-.062-.153-.268-.764.058-1.59 0 0 .504-.161 1.65.615.479-.133.992-.199 1.502-.202.51.002 1.023.069 1.503.202 1.146-.776 1.648-.615 1.648-.615.327.826.121 1.437.06 1.588.385.42.617.955.617 1.61 0 2.305-1.404 2.812-2.74 2.96.216.186.412.551.412 1.111v1.646c0 .16.096.347.4.288 2.383-.793 4.1-3.041 4.1-5.691 0-3.314-2.687-6-6-6z"
            />
          </svg>
        </a> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useI18n } from 'vue-i18n'
import { defineComponent, ref } from 'vue'
import { NetworkEnum } from '@/application/entity/enum/network.enum'

import { currentNetworkId } from '@/composables/useWallet'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const isImageLoaded = ref(false)

    const handleImageLoad = () => {
      isImageLoaded.value = true
    }

    return { t, currentNetworkId, NetworkEnum, isImageLoaded, handleImageLoad  }
  }
})
</script>

<style scoped>
@keyframes glow {
  0% {
    box-shadow: 0 0 5px #07F49E;
  }
  50% {
    box-shadow: 0 0 20px #07F49E;
  }
  100% {
    box-shadow: 0 0 5px #07F49E;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.logo {
  opacity: 0;
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;
}

.logo-loaded {
  opacity: 1;
  animation: glow 2s infinite, rotate 10s linear infinite, fadeIn 1s ease-in-out forwards;
  border-radius: 50%;
}

.fade-in {
  animation: fadeIn 1s ease-in-out forwards;
}

.opacity-0 {
  opacity: 0;
  transition: opacity 1s ease-in-out;
}
</style>
