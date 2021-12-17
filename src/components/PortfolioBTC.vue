<template>
  <div class="card">
    <div class="card-header p-1">
      <p>BTC Portfolio</p>
    </div>
    <span class="devider-horizontal"></span>
    <div class="card-body">
      <div class="grid grid-cols-2">
        <div class="flex flex-col items-center justify-center devider-vertical">
          <p class="portfolio-btc pt-2">
            {{ currencydecimal(this.portfolio.btc_value) }} BTC
          </p>
          <p
            v-if="this.currency == 'eur'"
            :class="ProfitBTC"
            class="portfolio-btc-profit"
          >
            {{ currencydecimal(this.profit.btc.eur) }} €
          </p>
          <p
            v-if="this.currency == 'usd'"
            :class="ProfitBTC"
            class="portfolio-btc-profit"
          >
            {{ currencydecimal(this.profit.btc.usd) }} $
          </p>
          <div class="flex flex-row pb-2 my-1">
            <img src="../assets/global.svg" alt="" />
            <p v-if="this.currency == 'eur'" class="mx-2">
              {{ currencydecimal(this.globally.btc.eur, 1) }} €
            </p>
            <p v-if="this.currency == 'usd'" class="mx-2">
              {{ currencydecimal(this.globally.btc.usd, 1) }} $
            </p>
          </div>
        </div>
        <div class="flex flex-col justify-center">
          <div class="flex flex-row ml-4">
            <img src="../assets/bitcoin.svg" alt="" />
            <p v-if="this.currency == 'eur'" :class="BTCClass" class="mx-2">
              {{ currencydecimal(this.portfolio.btc.eur, 1) }} €
            </p>
            <p v-if="this.currency == 'usd'" :class="BTCClass" class="mx-2">
              {{ currencydecimal(this.portfolio.btc.usd, 1) }} $
            </p>
          </div>
          <div class="flex flex-row ml-4 my-2">
            <img src="../assets/purchase.svg" alt="" />
            <p class="mx-2">
              {{ activeSignals() }}/{{ this.bought.btc.eur.length }}
            </p>
          </div>
          <div class="flex flex-row ml-4">
            <img src="../assets/bitcoin-diff.svg" alt="" />
            <p v-if="this.currency == 'eur'" :class="DiffBTC" class="mx-2">
              {{ currencydecimal(this.diff.btc.eur, 0) }} €
            </p>
            <p v-if="this.currency == 'usd'" :class="DiffBTC" class="mx-2">
              {{ currencydecimal(this.diff.btc.usd, 0) }} $
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
    ProfitBTC() {
      if (this.profit.btc.eur > 0) {
        return "green_text";
      } else {
        return "red_text";
      }
    },
    DiffBTC() {
      if (this.profit.btc.eur > 0) {
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
    activeSignals() {
      if (this.bought.btc.eur != null) {
        return this.bought.btc.eur.filter((item) => item.signal > 0).length;
      } else {
        return "0";
      }
    },
  },
};
</script>

<style scoped>
.card {
  position: relative;
  background-color: #211f29;
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

.portfolio-btc {
  font-size: 20px;
  color: #f3f3f3;
  font-weight: bold;
}

.portfolio-btc-profit {
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
