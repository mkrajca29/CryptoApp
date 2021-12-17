<template>
  <div class="flex flex-col justify-center items-center">
    <ETHPurchaseHead class="w-full md:w-96 my-8" />
    <ETHPurchases class="w-full md:w-96" />
  </div>
</template>

<script>
import ETHPurchaseHead from "@/components/ETHPurchaseHead.vue";
import ETHPurchases from "@/components/ETHPurchases.vue";
import { mapState } from "vuex";

export default {
  components: {
    ETHPurchaseHead,
    ETHPurchases,
  },
  mounted() {
    this.$store.commit("loadData");
    this.$store.dispatch("getChangingRate");
    if (JSON.parse(localStorage.getItem("boughtETH")).length != 0) {
      this.$store.dispatch("getEthereumRate");
      this.$store.commit("calculateEthereumTotal");
    }
  },
  computed: {
    ...mapState(["profit"]),
  },
};
</script>
