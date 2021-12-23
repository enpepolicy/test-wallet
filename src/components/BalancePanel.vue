<template>
  <div
    class="w-full xs:pl-0 xl:pl-20 md:pr-0 md:py-20 xs:mt-5 xl:w-3/5 transform -rotate-0 transition hover:scale-100 duration-700 ease-in-out hover:rotate-1"
  >
    <div
      class="pb-20 lg:pb-12 relative px-12 py-12 bg-gray-900 opacity-90 h-full rounded-xl break-all"
    >
      <div
        v-if="walletDetailedSnapshot.detailedAccounts.length > 0"
        class="pb-5"
      >
        <h2 class="pb-6 text-white/90">ADDRESS HISTORY</h2>
        <div class="w-12/12 mx-auto relative">
          <div class="border-l-2">
            <address-balance-single
              v-for="(
                account, index
              ) in walletDetailedSnapshot.detailedAccounts"
              :key="index"
              :detailed-account="account"
            />
          </div>
        </div>
      </div>

      <div v-else class="flex text-xl font-bold text-center h-full">
        <h5 class="align-middle m-auto">No address history</h5>
      </div>

      <div style="bottom: 1.2rem; right: 1.2rem" class="absolute">
        <span class="pl-4 text-white/30 text-sm">
          Last <span class="hidden md:inline">Updated</span>
          {{ walletDetailedSnapshot.lastUpdated.toLocaleTimeString() }}
        </span>
        <button
          class="ml-3 h-10 px-3 w-100 text-white rounded-lg bg-red-600/60 hover:bg-green-700 text-white font-medium transition duration-300 ease-in-out"
          @click="clearAccounts(), clearDetailedAccounts()"
        >
          Clear
        </button>
        <button
          class="ml-3 h-10 px-3 w-100 text-white rounded-lg bg-purple-600 hover:bg-green-700 text-white font-medium transition duration-300 ease-in-out"
          @click="getDetailedAccounts()"
        >
          Update Balances
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import AddressBalanceSingle from '@/components/AddressBalanceSingle.vue'
import { defineComponent } from 'vue'

import {
  getDetailedAccounts,
  clearAccounts,
  clearDetailedAccounts,
  walletDetailedSnapshot
} from '@/composables/useWallet'

export default defineComponent({
  components: {
    AddressBalanceSingle
  },

  setup() {
    return {
      getDetailedAccounts,
      clearAccounts,
      clearDetailedAccounts,
      walletDetailedSnapshot
    }
  }
})
</script>
