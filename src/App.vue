<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" class="m-2 sm:m-4">ALL</router-link>
      <router-link to="/BTC" class="m-2 sm:m-4">BTC</router-link>
      <router-link to="/ETH" class="m-2 sm:m-4">ETH</router-link>
    </div>
    <transition name="fade">
      <router-view class="px-8" />
    </transition>
  </div>
</template>

<style>
/* @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap"); */
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

body {
  background-color: #0a0817;
}

#app {
  height: 100vh;
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 0.25rem;
  background-color: #171520;
  display: flex;
  justify-content: center;
}
#nav a {
  position: relative;
  font-weight: bold;
  font-size: 24px;
  color: #a4a4aa;
  border: solid 2px #a4a4aa;
  padding: 0.25rem 0.5rem;
  border-radius: 0.75rem;
  z-index: 2;
}

#nav a:hover {
  background-color: #0a0817;
  /* color: #0a0817; */
}

#nav a.router-link-exact-active::after {
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  width: 70%;
  bottom: -8px;
  height: 2px;
  background: #f3f3f3;
  content: "";
}

#nav a.router-link-exact-active {
  color: #f3f3f3;
  border: solid 2px #f3f3f3;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
