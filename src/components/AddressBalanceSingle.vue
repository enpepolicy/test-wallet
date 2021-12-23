<template lang="">
  <div
    class="transform transition cursor-pointer hover:-translate-y-2 ml-10 relative flex items-center px-6 py-4 bg-purple-600/40 text-white rounded mb-10 flex-col md:flex-row space-y-4 md:space-y-0"
  >
    <!-- Dot Follwing the Left Vertical Line -->
    <div
      class="w-5 h-5 bg-green-700 absolute -left-10 transform -translate-x-2/4 rounded-full z-10 mt-2 md:mt-0"
    ></div>

    <!-- Line connecting the box with the vertical line -->
    <div class="w-10 h-1 bg-blue-300 absolute -left-10 z-0"></div>

    <!-- Content showing in the box -->
    <div class="flex-auto">
      <h3 class="text-md font-bold">
        {{ detailedAccount.address }}
      </h3>
      <h3>
        {{ `${formatPrice(detailedAccount.balanceInEth, 4)} ` }}
        <span class="font-bold">ETH |</span>
        {{ `${formatPrice(detailedAccount.balanceInFiat, 2)} ` }}
        <span class="font-bold">USDT</span>
      </h3>
      <span
        v-if="currentAccount === detailedAccount.address"
        class="hidden sm:inline absolute rounded-full my-auto py-1 px-2 font-bold text-green-600 right-2 bottom-2 border-2 border-green-600"
      >
        CONNECTED
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { formatPrice } from '@/utils'

import { DetailedAccount } from '@/application/entity/types'
import { currentAccount } from '@/composables/useWallet'

export default defineComponent({
  props: {
    detailedAccount: {
      type: Object as PropType<DetailedAccount>,
      default: () => ({})
    }
  },
  setup() {
    return {
      currentAccount
    }
  },
  methods: {
    formatPrice
  }
})
</script>
