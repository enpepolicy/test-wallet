import { ethers } from 'ethers'
import { axiosInstance } from '@/plugins/axios'
import { FiatCurrencyEnum } from '@/application/entity/enum/fiat-currency.enum'
import { CryptoCurrencyEnum } from '@/application/entity/enum/crypto-currency.enum'
import { DetailedAccount } from '@/application/entity/types'

export default class EthWallet {
  // eslint-disable-next-line no-useless-constructor
  constructor(public addresses: Set<string>) {}

  async getConversionRate(
    fiatCurrency: FiatCurrencyEnum,
    cryptoCurrency: CryptoCurrencyEnum
  ) {
    const conversionRate = await axiosInstance.get(
      `v3/simple/price?ids=${fiatCurrency}&vs_currencies=${cryptoCurrency}`
    )
    return conversionRate?.data[fiatCurrency.toLowerCase()][
      cryptoCurrency.toLowerCase()
    ]
  }

  async getDetailedAccounts(
    provider: ethers.providers.Web3Provider,
    fiatCurrencyEnum: FiatCurrencyEnum = FiatCurrencyEnum.USD,
    cryptoCurrencyEnum: CryptoCurrencyEnum = CryptoCurrencyEnum.ETH
  ) {
    const addresses = [...this.addresses]

    return await this.getConversionRate(fiatCurrencyEnum, cryptoCurrencyEnum)
      .then((conversionRate) =>
        Promise.all(
          addresses.map(async (address): Promise<DetailedAccount> => {
            const balanceInEth = await provider.getBalance(address)
            return {
              address,
              balanceInEth: Number(ethers.utils.formatEther(balanceInEth)),
              balanceInFiat:
                Number(ethers.utils.formatEther(balanceInEth)) / conversionRate
            }
          })
        )
      )
      .catch((error) => console.log(error))
  }
}
