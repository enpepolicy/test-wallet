<template lang="">
  <div class="pt-2">
    <div class="flex items-center">
      <div class="relative w-full">
        <input
          v-model="newAddress"
          type="text"
          :class="isValidAddress ? '' : 'border-4 border-red-600'"
          class="pl-4 text-sm italic placeholder-soft shadow appearance-none border rounded w-full p-3 font-medium text-gray-700 disabled:text-red-200 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out h-14"
          :placeholder="
            truncateAddress('0xae8E760EgD76b521f97674kf0cCCA68973259EA')
          "
        />
        <div class="absolute top-2 right-2">
          <button
            class="h-10 px-3 w-90 text-white rounded-lg bg-purple-600 hover:bg-green-700 text-white font-bold transition duration-300 ease-in-out"
            @click.prevent="validateAddress(newAddress)"
          >
            GET
          </button>
        </div>
        <div v-if="!isValidAddress" class="pt-2 text-red-600">
          Invalid address
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue'
import { truncateAddress } from '@/utils'
import { getDetailedAccounts, addAddress } from '@/composables/useWallet'

export default {
  setup() {
    const newAddress = ref('')
    const isValidAddress = ref(true)

    function validateAddress(address: string) {
      if (addAddress(address)) {
        isValidAddress.value = true
        newAddress.value = ''
      } else {
        isValidAddress.value = false
      }
    }

    return {
      newAddress,
      isValidAddress,
      validateAddress,
      getDetailedAccounts
    }
  },
  methods: {
    truncateAddress
  }
}
</script>
<style lang=""></style>
