<template>
  <div class="grid grid-cols-4 mb-4 relative">
    <div class="flex flex-col col-span-2">
      <div class="flex flex-row items-center ml-8 mb-2">
        <img src="../assets/ethereum.svg" alt="average" class="icon" />
        <p class="mx-2">{{ currencydecimal(purchase.cost, 2) }} €</p>
      </div>
      <div class="flex flex-row ml-8">
        <img src="../assets/global.svg" alt="average" class="icon" />
        <p class="mx-2">{{ currencydecimal(purchase.price, 1) }} €</p>
      </div>
    </div>
    <div class="flex flex-row justify-center items-center">
      <img
        :src="`${publicPath}img/signal-${signalSetter}.svg`"
        alt="average"
        class="icon"
      />
    </div>
    <!-- <div class="flex flex-row justify-center items-center">
      <img src="../assets/average.svg" alt="average" class="icon" />
    </div> -->
    <div class="flex justify-center items-center mr-4 xs:mr-8">
      <div
        class="button-container w-10 h-10 cursor-pointer"
        @click="deleteRecord()"
      >
        <div class="relative cursor-pointer">
          <img src="../assets/delete.svg" alt="switch" />
        </div>
      </div>
    </div>
    <span class="devider-horizontal"></span>
  </div>
</template>

<script>
export default {
  props: ["purchase", "index"],
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
  methods: {
    currencydecimal(value, number = 3) {
      return value.toFixed(number);
    },
    deleteRecord() {
      if (confirm("Do you realy want to remove this record ?")) {
        this.$store.commit("removeEthereumPurchase", this.index);
        this.$store.dispatch("getEthereumRate");
        this.$store.commit("calculateEthereumTotal");
        this.$store.commit("saveData");
      } else {
        // Do nothing!
        console.log("The purchase wasn't removed.");
      }
    },
  },
  computed: {
    signalSetter() {
      if (this.purchase.signal == 0) return 0;
      else if (this.purchase.signal == 1) return 1;
      else if (this.purchase.signal == 2) return 2;
      else if (this.purchase.signal == 3) return 3;
      else if (this.purchase.signal == 4) return 4;
    },
  },
};
</script>

<style scoped>
.icon {
  width: 24px;
  height: 24px;
}

.devider-horizontal {
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  right: 0;
  margin: auto;
  width: 80%;
  height: 1px;
  background-color: #0a0817;
}

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

.button-container:hover {
  background-color: #0a0817;
}
</style>
