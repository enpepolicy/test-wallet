<template>
  <!--Left Col-->
  <div
    class="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden"
  >
    <h1
      class="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left"
    >
      Check
      <span
        class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500"
      >
        Your Eth Balance
      </span>
      in differents chains
    </h1>
    <p
      class="leading-normal text-base md:text-2xl mb-8 text-center md:text-left"
    >
      Compare your balance between accounts with our custome made panel!
    </p>

    <connect-wallet />
  </div>

  <!--Right Col-->
  <balance-panel />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ConnectWallet from '@/components/ConnectWallet.vue'
import BalancePanel from '@/components/BalancePanel.vue'

export default defineComponent({
  name: 'HomeSection',
  components: {
    ConnectWallet,
    BalancePanel
  }
})
</script>
