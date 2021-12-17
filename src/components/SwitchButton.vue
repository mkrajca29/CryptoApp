<template>
  <div class="flex justify-center my-8">
    <div class="button-container w-20 h-20" @click="switchCurrency()">
      <div class="relative cursor-pointer">
        <img src="../assets/switch.svg" alt="switch" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    switchCurrency() {
      this.$store.commit("changeCurrency");
      this.$store.commit("changingRate");
      this.$store.commit("calculateBitcoinTotal");
      this.$store.commit("calculateBitcoinProfit");
      this.$store.commit("calculateBitcoinDiff");
      this.$store.commit("calculateEthereumTotal");
      this.$store.commit("calculateEthereumProfit");
      this.$store.commit("calculateEthereumDiff");
      this.$store.commit("setPortfolioTotal");
      this.$store.commit("setTotalProfit");
    },
  },
};
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  border: 2px solid #82828a;
  background-color: #171520;
}
.button-container p {
  font-size: 36px;
  font-weight: bold;
}

#portfolio-value {
  position: absolute;
  top: 42px;
  font-size: 12px;
}

.green_text {
  color: #67be8a;
}
.red_text {
  color: #ef5959;
}
</style>
