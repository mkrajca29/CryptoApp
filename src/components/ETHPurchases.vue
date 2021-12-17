<template>
  <div class="card mb-8">
    <div class="card-header p-1">
      <div class="grid grid-cols-2 my-2">
        <div class="flex flex-row justify-end items-center">
          <img src="../assets/average.svg" alt="average" class="icon" />
          <p v-if="this.currency == 'eur'" :class="ETHClass" class="mx-2">
            {{ currencydecimal(this.average.eth.eur, 1) }} €
          </p>
          <p v-if="this.currency == 'usd'" :class="ETHClass" class="mx-2">
            {{ currencydecimal(this.portfolio.eth.usd, 1) }} $
          </p>
        </div>
        <div class="flex flex-row justify-center items-center">
          <img src="../assets/purchase.svg" alt="purchase" class="icon" />
          <p class="mx-2">
            {{
              this.bought.eth.eur.filter((item) => item.signal > 0).length
            }}/{{ this.bought.eth.eur.length }}
          </p>
        </div>
      </div>
    </div>
    <div class="card-body my-2">
      <ETHPurchase
        v-for="(purchase, index) in this.bought.eth.eur"
        :key="index"
        :purchase="purchase"
        :index="index"
      />
    </div>
  </div>
</template>

<script>
import ETHPurchase from "@/components/ETHPurchase.vue";
import { mapState } from "vuex";
export default {
  components: {
    ETHPurchase,
  },
  computed: {
    ...mapState(["currency", "portfolio", "bought", "average"]),
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
  font-size: 14px;
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

.icon {
  height: 24px;
}

.card-body {
  font-size: 12px;
  font-weight: bold;
  color: #a4a4aa;
}

.devider-vertical {
  border-right: 2px solid #0a0817;
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
