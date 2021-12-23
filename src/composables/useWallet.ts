import { ethers } from 'ethers'
import { ref, computed } from 'vue'

import EthWallet from '@/application/entity/EthWallet'
import { DetailedAccount } from '@/application/entity/types'
import { NetworkEnum } from '@/application/entity/enum/network.enum'
import { FiatCurrencyEnum } from '@/application/entity/enum/fiat-currency.enum'
import { CryptoCurrencyEnum } from '@/application/entity/enum/crypto-currency.enum'

const currentAccount = ref('')
const currentNetworkId = ref(0 as NetworkEnum)
const accounts = ref(new Set() as Set<string>)
const walletDetailedSnapshot = ref({
  lastUpdated: new Date(),
  detailedAccounts: [] as DetailedAccount[]
})

const provider = computed(() => {
  return new ethers.providers.Web3Provider(window.ethereum, 'any')
})

async function connect() {
  await provider.value.send('eth_requestAccounts', [])
}

async function getDetailedAccounts(
  fiatCurrencyEnum: FiatCurrencyEnum = FiatCurrencyEnum.USD,
  cryptoCurrencyEnum: CryptoCurrencyEnum = CryptoCurrencyEnum.ETH
) {
  const wallet = new EthWallet(accounts.value)

  walletDetailedSnapshot.value.lastUpdated = new Date()

  walletDetailedSnapshot.value.detailedAccounts =
    (await wallet.getDetailedAccounts(
      provider.value,
      fiatCurrencyEnum,
      cryptoCurrencyEnum
    )) || []
}

async function getCurrentAccount() {
  const listAccounts = await provider.value.listAccounts()
  currentAccount.value = listAccounts[0]

  if (listAccounts[0]) {
    accounts.value.add(listAccounts[0])
  }

  getDetailedAccounts()
}

async function getCurrentNetwork() {
  const currentNetwork = await provider.value.getNetwork()
  currentNetworkId.value = currentNetwork.chainId
}

function setWindowEthereumAccountChangedListener() {
  window.ethereum.on('accountsChanged', () => {
    getCurrentAccount()
  })
}

function setWindowEthereumNetworkChangedListener() {
  window.ethereum.on('chainChanged', () => {
    getCurrentAccount()
    getCurrentNetwork()
  })
}

function setWindowEthereumListeners() {
  setWindowEthereumAccountChangedListener()
  setWindowEthereumNetworkChangedListener()
}

function removeWindowEthereumNetworkChangedListener() {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.ethereum.removeListener('chainChanged', () => {})
}

function initializeWallet() {
  setWindowEthereumListeners()
  getCurrentAccount()
  getCurrentNetwork()
  getDetailedAccounts()
}

function removeWindowEthereumAccountChangedListener() {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.ethereum.removeListener('accountsChanged', () => {})
}

function removeWindowEthereumListeners() {
  removeWindowEthereumAccountChangedListener()
  removeWindowEthereumNetworkChangedListener()
}

function addAddress(address: string) {
  if (ethers.utils.isAddress(address)) {
    accounts.value.add(address)
    getDetailedAccounts()
    return true
  }
  return false
}

function clearDetailedAccounts() {
  if (currentAccount.value) {
    walletDetailedSnapshot.value.detailedAccounts =
      walletDetailedSnapshot.value.detailedAccounts.filter(
        (account) => account.address === currentAccount.value
      )
  } else {
    walletDetailedSnapshot.value.detailedAccounts = []
  }
  walletDetailedSnapshot.value.lastUpdated = new Date()
}

function clearAccounts() {
  if (currentAccount.value) {
    accounts.value.forEach((address) => {
      if (currentAccount.value !== address) {
        accounts.value.delete(address)
      }
    })
  } else {
    accounts.value.clear()
  }
}

export {
  currentAccount,
  currentNetworkId,
  walletDetailedSnapshot,
  provider,
  accounts,
  getDetailedAccounts,
  clearDetailedAccounts,
  clearAccounts,
  addAddress,
  connect,
  initializeWallet,
  getCurrentAccount,
  getCurrentNetwork,
  setWindowEthereumAccountChangedListener,
  setWindowEthereumNetworkChangedListener,
  setWindowEthereumListeners,
  removeWindowEthereumNetworkChangedListener,
  removeWindowEthereumAccountChangedListener,
  removeWindowEthereumListeners
}
