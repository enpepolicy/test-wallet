<template>
  <form
    class="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
  >
    <div class="flex items-center justify-center pt-2">
      <div
        v-if="currentAccount"
        class="border-2 border-green-500/80 text-white/80 font-bold py-2 px-4 rounded w-full h-12 leading-7 overflow-hidden"
      >
        <span class="pr-7 text-green-500"
          >{{ t('components.connect-wallet.connected') }}:</span
        >{{ truncateAddress(currentAccount) }}
      </div>

      <button
        v-else
        class="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out w-full h-12"
        type="button"
        @click.prevent="connect"
      >
        {{ t('components.connect-wallet.connect-your-wallet') }}
      </button>
    </div>

    <h2 class="text-center font-medium py-3">
      {{ t('components.connect-wallet.or-enter-an-address') }}:
    </h2>

    <add-single-address />
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { truncateAddress } from '@/utils'
import AddSingleAddress from '@/components/AddSingleAddress.vue'

import {
  connect,
  currentAccount,
  initializeWallet,
  removeWindowEthereumListeners
} from '@/composables/useWallet'

export default defineComponent({
  name: 'ConnectWalleet',

  components: {
    AddSingleAddress
  },

  setup() {
    const { t } = useI18n()
    return {
      t,
      currentAccount,
      connect
    }
  },

  mounted: function () {
    initializeWallet()
  },

  beforeUnmount: function () {
    removeWindowEthereumListeners()
  },

  methods: {
    truncateAddress
  }
})
</script>

<style scoped>
a {
  text-decoration: underline;
  color: rgb(42, 42, 199);
  font-weight: bold;
}
</style>
