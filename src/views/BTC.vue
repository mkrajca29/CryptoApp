<template>
  <div class="flex flex-col justify-center items-center">
    <BTCPurchaseHead class="w-full md:w-96 my-8" />
    <BTCPurchases class="w-full md:w-96" />
  </div>
</template>

<script>
import BTCPurchaseHead from "@/components/BTCPurchaseHead.vue";
import BTCPurchases from "@/components/BTCPurchases.vue";
import { mapState } from "vuex";

export default {
  components: {
    BTCPurchaseHead,
    BTCPurchases,
  },
  mounted() {
    this.$store.commit("loadData");
    this.$store.dispatch("getChangingRate");
    if (JSON.parse(localStorage.getItem("boughtBTC")).length != 0) {
      this.$store.dispatch("getBitcoinRate");
      this.$store.commit("calculateBitcoinTotal");
    }
    /* if (JSON.parse(localStorage.getItem("boughtETH")).length != 0) {
      this.$store.dispatch("getEthereumRate");
      this.$store.commit("calculateEthereumTotal");
    } */
  },
  computed: {
    ...mapState(["profit"]),
  },
};
</script>
