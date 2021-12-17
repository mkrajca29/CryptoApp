import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    currency: "eur",
    globally: {
      btc: {
        eur: 0,
        usd: 0,
      },
      eth: {
        eur: 0,
        usd: 0,
      },
      eurTOusd: 0,
    },
    portfolio: {
      all: {
        eur: 0,
        usd: 0,
      },
      btc_value: 0,
      btc: {
        eur: 0,
        usd: 0,
      },
      eth_value: 0,
      eth: {
        eur: 0,
        usd: 0,
      },
    },
    /* bought: {
      btc: {
        eur: [
          { cost: 38.5, price: 41017, usd: 0, signal: 0 },
          { cost: 76.3, price: 80500, usd: 0, signal: 0 },
          { cost: 13.25, price: 51000, usd: 0, signal: 0 },
          { cost: 80, price: 56042.72, usd: 0, signal: 0 },
          { cost: 38.25, price: 43994.72, usd: 0, signal: 0 },
          { cost: 76, price: 47687.17, usd: 0, signal: 0 },
        ],
        usd: 0,
      },
      eth: {
        eur: [
          { cost: 38.5, price: 1800, usd: 0, signal: 0 },
          { cost: 30.3, price: 1900, usd: 0, signal: 0 },
          { cost: 50.25, price: 2000, usd: 0, signal: 0 },
          { cost: 20, price: 2342.72, usd: 0, signal: 0 },
          { cost: 35, price: 2394.72, usd: 0, signal: 0 },
          { cost: 76, price: 2787.17, usd: 0, signal: 0 },
        ],
        usd: 0,
      },
    }, */
    bought: {
      btc: {
        eur: [],
        usd: 0,
      },
      eth: {
        eur: [],
        usd: 0,
      },
    },
    total: {
      all: {
        eur: 0,
        usd: 0,
      },
      btc: {
        eur: 0,
        usd: 0,
      },
      eth: {
        eur: 0,
        usd: 0,
      },
    },
    profit: {
      all: {
        eur: 0,
        usd: 0,
      },
      btc: {
        eur: 0,
        usd: 0,
      },
      eth: {
        eur: 0,
        usd: 0,
      },
    },
    diff: {
      btc: {
        eur: 0,
        usd: 0,
      },
      eth: {
        eur: 0,
        usd: 0,
      },
    },
    average: {
      btc: {
        eur: 0,
        usd: 0,
      },
      eth: {
        eur: 0,
        usd: 0,
      },
    },
  },
  mutations: {
    /* GLOBAL VALUES */
    getBitcoinGlobalValues(state, payload) {
      state.globally.btc.eur = payload.eur;
      state.globally.btc.usd = payload.usd;
    },
    getEthereumGlobalValues(state, payload) {
      state.globally.eth.eur = payload.eur;
      state.globally.eth.usd = payload.usd;
    },
    getChangingRate(state, payload) {
      state.globally.eurTOusd = payload;
    },
    changingRate(state) {
      state.bought.eth.eur.forEach((item) => {
        item.usd =
          item.usd == 0 ? item.price * state.globally.eurTOusd : item.usd;
      });
      state.bought.btc.eur.forEach((item) => {
        item.usd =
          item.usd == 0 ? item.price * state.globally.eurTOusd : item.usd;
      });
    },
    /* BITCOIN */
    calculateBitcoinTotal(state) {
      if (state.bought.btc.eur.length == 0) return;
      state.total.btc.eur = state.bought.btc.eur
        .map((item) => item.cost)
        .reduce((prev, next) => prev + next);

      state.total.btc.usd = state.bought.btc.eur
        .map((item) => item.cost * state.globally.eurTOusd)
        .reduce((prev, next) => prev + next);
    },
    calculateBitcoinPortfolio(state) {
      if (state.bought.btc.eur.length == 0) return;
      state.portfolio.btc_value = state.bought.btc.eur
        .map((item) => item.cost / item.price)
        .reduce((prev, next) => prev + next);

      state.portfolio.btc.eur =
        state.portfolio.btc_value * state.globally.btc.eur;

      state.portfolio.btc.usd =
        state.portfolio.btc_value * state.globally.btc.usd;
    },
    calculateBitcoinProfit(state) {
      state.profit.btc.eur = state.portfolio.btc.eur - state.total.btc.eur;
      if (state.total.btc.usd > 0)
        state.profit.btc.usd = state.portfolio.btc.usd - state.total.btc.usd;
    },
    calculateBitcoinDiff(state) {
      state.diff.btc.eur = state.total.btc.eur / state.portfolio.btc_value;
      state.diff.btc.usd = state.total.btc.usd / state.portfolio.btc_value;
    },
    /* ETHEREUM */
    calculateEthereumTotal(state) {
      if (state.bought.eth.eur.length == 0) return;
      state.total.eth.eur = state.bought.eth.eur
        .map((item) => item.cost)
        .reduce((prev, next) => prev + next);

      state.total.eth.usd = state.bought.eth.eur
        .map((item) => item.cost * state.globally.eurTOusd)
        .reduce((prev, next) => prev + next);
    },
    calculateEthereumPortfolio(state) {
      if (state.bought.eth.eur.length == 0) return;
      state.portfolio.eth_value = state.bought.eth.eur
        .map((item) => item.cost / item.price)
        .reduce((prev, next) => prev + next);

      state.portfolio.eth.eur =
        state.portfolio.eth_value * state.globally.eth.eur;

      state.portfolio.eth.usd =
        state.portfolio.eth_value * state.globally.eth.usd;
    },
    calculateEthereumProfit(state) {
      state.profit.eth.eur = state.portfolio.eth.eur - state.total.eth.eur;
      if (state.total.eth.usd > 0)
        state.profit.eth.usd = state.portfolio.eth.usd - state.total.eth.usd;
    },
    calculateEthereumDiff(state) {
      state.diff.eth.eur = state.total.eth.eur / state.portfolio.eth_value;
      state.diff.eth.usd = state.total.eth.usd / state.portfolio.eth_value;
    },
    /* ALL */
    totalPurchase(state) {
      //////
      state.total.all.eur = state.total.btc.eur + state.total.eth.eur;
      state.total.all.usd = state.total.btc.usd + state.total.eth.usd;
    },
    setPortfolioTotal(state) {
      state.portfolio.all.eur =
        state.portfolio.btc.eur + state.portfolio.eth.eur;
      state.portfolio.all.usd =
        state.portfolio.btc.usd + state.portfolio.eth.usd;
    },
    setTotalProfit(state) {
      state.profit.all.eur = state.profit.btc.eur + state.profit.eth.eur;
      state.profit.all.usd = state.profit.btc.usd + state.profit.eth.usd;
    },
    setSignals(state) {
      state.bought.btc.eur.forEach((item) => {
        if (item.price < state.globally.btc.eur) item.signal = 1;
        if (item.price + 5000 < state.globally.btc.eur) item.signal = 2;
        if (item.price + 15000 < state.globally.btc.eur) item.signal = 3;
        if (item.price + 25000 < state.globally.btc.eur) item.signal = 4;
        if (item.price > state.globally.btc.eur) item.signal = 0;
      });
      state.bought.eth.eur.forEach((item) => {
        item.signal = item.price < state.globally.eth.eur ? 1 : 0;
      });
    },
    changeCurrency(state) {
      state.currency = state.currency == "eur" ? "usd" : "eur";
    },
    averageCost(state) {
      state.average.btc.eur =
        state.bought.btc.eur
          .map((item) => item.price)
          .reduce((prev, next) => prev + next) / state.bought.btc.eur.length;

      state.average.eth.eur =
        state.bought.eth.eur
          .map((item) => item.price)
          .reduce((prev, next) => prev + next) / state.bought.eth.eur.length;
    },
    /* PURCHASE */
    addBitcoinPurchase(state, payload) {
      state.bought.btc.eur.unshift({
        cost: payload.cost,
        price: payload.price,
        usd: 0,
        signal: 0,
      });
    },
    removeBitcoinPurchase(state, index) {
      state.bought.btc.eur = state.bought.btc.eur
        .slice(0, index)
        .concat(
          state.bought.btc.eur.slice(index + 1, state.bought.btc.eur.length)
        );
    },
    addEthereumPurchase(state, payload) {
      state.bought.eth.eur.unshift({
        cost: payload.cost,
        price: payload.price,
        usd: 0,
        signal: 0,
      });
    },
    removeEthereumPurchase(state, index) {
      state.bought.eth.eur = state.bought.eth.eur
        .slice(0, index)
        .concat(
          state.bought.eth.eur.slice(index + 1, state.bought.eth.eur.length)
        );
    },
    /* DATA HANDLING */
    loadData(state) {
      state.bought.btc.eur = JSON.parse(localStorage.getItem("boughtBTC"));
      state.bought.eth.eur = JSON.parse(localStorage.getItem("boughtETH"));
    },
    saveData(state) {
      localStorage.setItem("boughtBTC", JSON.stringify(state.bought.btc.eur));
      localStorage.setItem("boughtETH", JSON.stringify(state.bought.eth.eur));
    },
    /* DATA TRANSFER */
    transferData(state) {
      let oldBTCData = JSON.parse(localStorage.getItem("purchasesBTC"));
      let oldETHData = JSON.parse(localStorage.getItem("purchasesETH"));

      if (JSON.parse(localStorage.getItem("transfered")) == true) return;

      if (oldBTCData && state.bought.btc.eur.length == 0) {
        oldBTCData.forEach((record) =>
          state.bought.btc.eur.push({
            cost: record.values,
            price: record.prices,
            usd: 0,
            signal: 0,
          })
        );
        localStorage.setItem("boughtBTC", JSON.stringify(state.bought.btc.eur));
      }

      if (oldBTCData && state.bought.eth.eur.length == 0) {
        oldETHData.forEach((record) =>
          state.bought.eth.eur.push({
            cost: record.values,
            price: record.prices,
            usd: 0,
            signal: 0,
          })
        );
        localStorage.setItem("boughtETH", JSON.stringify(state.bought.eth.eur));
      }
      if (!oldBTCData) {
        localStorage.setItem("boughtBTC", JSON.stringify(state.bought.btc.eur));
        localStorage.setItem("boughtETH", JSON.stringify(state.bought.eth.eur));
      }
      localStorage.setItem("transfered", true);
    },
  },
  actions: {
    getBitcoinRate({ commit }) {
      axios
        .get(
          "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,EUR"
        )
        .then((response) => {
          let eur = response.data.EUR;
          let usd = response.data.USD;
          commit("getBitcoinGlobalValues", {
            eur,
            usd,
          });
          commit("calculateBitcoinPortfolio");
          commit("calculateBitcoinProfit");
          commit("calculateBitcoinDiff");
          commit("setPortfolioTotal");
          commit("setTotalProfit");
          commit("setSignals");
          commit("averageCost");
        })
        .catch((error) => {
          console.log(error);
          this.state.errored = true;
        });
    },
    getEthereumRate({ commit }) {
      axios
        .get(
          "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR"
        )
        .then((response) => {
          let eur = response.data.EUR;
          let usd = response.data.USD;
          commit("getEthereumGlobalValues", {
            eur,
            usd,
          });
          commit("calculateEthereumPortfolio");
          commit("calculateEthereumProfit");
          commit("calculateEthereumDiff");
          commit("setPortfolioTotal");
          commit("setTotalProfit");
          commit("setSignals");
          commit("averageCost");
        })
        .catch((error) => {
          console.log(error);
          this.state.errored = true;
        });
    },
    getChangingRate({ commit }) {
      axios
        .get("https://api.frankfurter.app/latest?fromEUR&to=USD")
        .then((response) => {
          let rateUSD = response.data.rates.USD;
          commit("getChangingRate", rateUSD);
        })
        .catch((error) => {
          console.log(error);
          this.state.errored = true;
        });
    },
  },
  modules: {},
});
