<template>
  <div class="card">
    <div class="card-header p-1">
      <div class="grid grid-cols-3 items-center my-2">
        <p class="white-bold-text">
          {{ currencydecimal(this.portfolio.eth_value) }} ETH
        </p>
        <div class="flex flex-col xs:flex-row justify-center items-center">
          <img src="../assets/ethereum.svg" alt="bitcoin" class="icon" />
          <p v-if="this.currency == 'eur'" :class="ETHClass" class="mx-2">
            {{ currencydecimal(this.portfolio.eth.eur, 1) }} €
          </p>
          <p v-if="this.currency == 'usd'" :class="ETHClass" class="mx-2">
            {{ currencydecimal(this.portfolio.eth.usd, 1) }} $
          </p>
        </div>
        <div class="flex flex-col xs:flex-row justify-center items-center">
          <img
            src="../assets/ethereum-purchase.svg"
            alt="bitcoin-purchase"
            class="icon"
          />
          <p v-if="this.currency == 'eur'" :class="ETHClass" class="mx-2">
            {{ currencydecimal(this.total.eth.eur, 1) }} €
          </p>
          <p v-if="this.currency == 'usd'" :class="ETHClass" class="mx-2">
            {{ currencydecimal(this.total.eth.usd, 1) }} $
          </p>
        </div>
      </div>
    </div>
    <span class="devider-horizontal"></span>
    <transition name="fade">
      <div
        v-if="purchaseVisible"
        class="card-body flex flex-col justify-center items-center my-4"
      >
        <div class="input_container mb-4 flex items-center">
          <input
            type="text"
            v-model="cost"
            @keypress="isNumber($event)"
            class="input"
            placeholder="COST"
          />
          <p class="dark-text-currency">€</p>
          <img
            src="../assets/ethereum-dark.svg"
            alt="bitcoin cost"
            class="input_img px-2"
          />
        </div>
        <div class="input_container mb-4 flex items-center">
          <input
            type="text"
            v-model="price"
            @keypress="isNumber($event)"
            class="input"
            placeholder="PRICE"
          />
          <p class="dark-text-currency">€</p>
          <img
            src="../assets/global-dark.svg"
            alt="bitcoin globally"
            class="input_img px-2"
          />
        </div>
        <div class="flex justify-center items-center">
          <div
            class="button-container px-6 py-3 cursor-pointer"
            @click="buyETH()"
          >
            <p class="white-bold-text">SUBMIT</p>
          </div>
        </div>
      </div>
    </transition>
    <div
      v-if="!purchaseVisible"
      class="card-body flex flex-col justify-center items-center my-4"
    >
      <div class="flex justify-center items-center">
        <div
          class="button-container px-6 py-3 cursor-pointer"
          @click="purchaseVisible = !purchaseVisible"
        >
          <p class="white-bold-text">ADD ETH</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["currency", "portfolio", "total"]),
  },
  data() {
    return {
      purchaseVisible: false,
      cost: null,
      price: null,
    };
  },
  methods: {
    currencydecimal(value, number = 3) {
      return value.toFixed(number);
    },
    buyETH() {
      if (
        this.cost == null ||
        this.price == null ||
        this.cost.length == 0 ||
        this.price.length == 0
      ) {
        alert("Please fill in both values !");
        return;
      }
      this.$store.commit("addEthereumPurchase", {
        cost: Number(this.cost.replace(",", ".")),
        price: Number(this.price.replace(",", ".")),
      });
      this.$store.commit("saveData");
      this.$store.dispatch("getEthereumRate");
      this.$store.commit("calculateEthereumTotal");

      this.cost = "";
      this.price = "";
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46 &&
        charCode !== 44
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
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

.white-bold-text {
  color: #f3f3f3 !important;
  font-size: 18px !important;
}

.green_text {
  color: #67be8a;
}
.red_text {
  color: #ef5959;
}

.input_container {
  width: 80%;
  display: flex;
  background: #c4c4c4;
  border-radius: 10px;
}

.input {
  background: #c4c4c4;
  color: #211f29;
  display: block;
  font-size: 14px;
  font-weight: bold;
  width: 100%;
  border: none;
  outline: none;
  padding: 8px 16px;
  border-radius: 10px;
}

.input_img {
  flex-basis: 20px;
  display: inline-block;
}

::placeholder {
  color: #211f29aa;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  border: 2px solid #82828a;
  background-color: #171520;
}

.button-container:hover {
  background-color: #0a0817;
}

.dark-text-currency {
  color: #211f29;
  font-size: 20px;
  font-weight: normal;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
