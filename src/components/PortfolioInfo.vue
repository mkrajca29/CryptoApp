<template>
  <div class="flex justify-center my-8">
    <div class="profit-container w-64 h-64 md:w-80 md:h-80">
      <div class="relative">
        <p v-if="this.currency == 'eur'" :class="Profit">
          {{ currencydecimal(this.profit.all.eur, 2) }} €
        </p>
        <p v-if="this.currency == 'usd'" :class="Profit">
          {{ currencydecimal(this.profit.all.usd, 2) }} $
        </p>
        <p
          v-if="this.currency == 'eur'"
          class="green_text"
          id="portfolio-value"
        >
          {{ currencydecimal(this.portfolio.all.eur, 1) }} €
        </p>
        <p
          v-if="this.currency == 'usd'"
          class="green_text"
          id="portfolio-value"
        >
          {{ currencydecimal(this.portfolio.all.usd, 1) }} $
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["currency", "profit", "portfolio"]),
    Profit() {
      if (this.profit.all.eur > 0) {
        return "green_text";
      } else {
        return "red_text";
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
.profit-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  border: 6px solid #82828a;
  background-color: #171520;
}
.profit-container p {
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
