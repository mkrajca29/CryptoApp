<template>
  <div class="card">
    <div class="card-header p-1">
      <p>ETH Portfolio</p>
    </div>
    <span class="devider-horizontal"></span>
    <div class="card-body">
      <div class="grid grid-cols-2">
        <div class="flex flex-col items-center justify-center devider-vertical">
          <p class="portfolio-eth pt-2">
            {{ currencydecimal(this.portfolio.eth_value) }} ETH
          </p>
          <p
            v-if="this.currency == 'eur'"
            :class="ProfitETH"
            class="portfolio-eth-profit"
          >
            {{ currencydecimal(this.profit.eth.eur) }} €
          </p>
          <p
            v-if="this.currency == 'usd'"
            :class="ProfitETH"
            class="portfolio-eth-profit"
          >
            {{ currencydecimal(this.profit.eth.usd) }} $
          </p>
          <div class="flex flex-row pb-2 my-1">
            <img src="../assets/global.svg" alt="" />
            <p v-if="this.currency == 'eur'" class="mx-2">
              {{ currencydecimal(this.globally.eth.eur, 1) }} €
            </p>
            <p v-if="this.currency == 'usd'" class="mx-2">
              {{ currencydecimal(this.globally.eth.usd, 1) }} $
            </p>
          </div>
        </div>
        <div class="flex flex-col justify-center">
          <div class="flex flex-row ml-4">
            <img src="../assets/ethereum.svg" alt="" />
            <p v-if="this.currency == 'eur'" :class="ETHClass" class="mx-2">
              {{ currencydecimal(this.portfolio.eth.eur, 1) }} €
            </p>
            <p v-if="this.currency == 'usd'" :class="ETHClass" class="mx-2">
              {{ currencydecimal(this.portfolio.eth.usd, 1) }} $
            </p>
          </div>
          <div class="flex flex-row ml-4 my-1">
            <img src="../assets/purchase.svg" alt="" />
            <p class="mx-2">
              {{
                this.bought.eth.eur.filter((item) => item.signal > 0).length
              }}/{{ this.bought.eth.eur.length }}
            </p>
          </div>
          <div class="flex flex-row ml-4">
            <img src="../assets/ethereum-diff.svg" alt="" />
            <p v-if="this.currency == 'eur'" :class="DiffETH" class="mx-2">
              {{ currencydecimal(this.diff.eth.eur, 0) }} €
            </p>
            <p v-if="this.currency == 'usd'" :class="DiffETH" class="mx-2">
              {{ currencydecimal(this.diff.eth.usd, 0) }} $
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState([
      "currency",
      "globally",
      "profit",
      "portfolio",
      "total",
      "diff",
      "bought",
    ]),
    ProfitETH() {
      if (this.profit.eth.eur > 0) {
        return "green_text";
      } else {
        return "red_text";
      }
    },
    DiffETH() {
      if (this.profit.eth.eur > 0) {
        return "red_text";
      } else {
        return "green_text";
      }
    },
  },
  methods: {
    currencydecimal(value, number = 3) {
      return value.toFixed(number);
    },
  },
};
</script>

<style scoped>
.card {
  position: relative;
  background-color: #191e32;
  border-radius: 2rem;
  border: none;
}

.card-header p {
  font-size: 24px;
  color: #a4a4aa;
  font-weight: bold;
}

.devider-horizontal {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #0a0817;
}

.card-body {
  font-size: 12px;
  font-weight: bold;
  color: #a4a4aa;
}

.devider-vertical {
  border-right: 2px solid #0a0817;
}

.portfolio-eth {
  font-size: 20px;
  color: #f3f3f3;
  font-weight: bold;
}

.portfolio-eth-profit {
  font-size: 20px;
  font-weight: bold;
}

.green_text {
  color: #67be8a;
}
.red_text {
  color: #ef5959;
}
</style>
