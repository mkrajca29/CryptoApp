<template>
  <div class="flex flex-col justify-center items-center">
    <PortfolioInfo />
    <PortfolioBTC class="w-full md:w-96" />
    <PortfolioETH class="w-full md:w-96 mt-8" />
    <SwitchButton />
  </div>
</template>

<script>
import PortfolioInfo from "@/components/PortfolioInfo.vue";
import PortfolioBTC from "@/components/PortfolioBTC.vue";
import PortfolioETH from "@/components/PortfolioETH.vue";
import SwitchButton from "@/components/SwitchButton.vue";
import { mapState } from "vuex";

export default {
  components: {
    PortfolioInfo,
    PortfolioBTC,
    PortfolioETH,
    SwitchButton,
  },
  created() {},
  mounted() {
    this.$store.commit("transferData");
    this.$store.commit("loadData");
    this.$store.dispatch("getChangingRate");

    if (JSON.parse(localStorage.getItem("boughtBTC")).length != 0) {
      this.$store.dispatch("getBitcoinRate");
      this.$store.commit("calculateBitcoinTotal");
    }
    if (JSON.parse(localStorage.getItem("boughtETH")).length != 0) {
      this.$store.dispatch("getEthereumRate");
      this.$store.commit("calculateEthereumTotal");
    }
  },
  computed: {
    ...mapState(["bought"]),
  },
};
</script>
