<<<<<<< HEAD
<!-- src/App.vue -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
=======
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <router-view></router-view>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
>>>>>>> 815e73e191fb2a52dfe78b00c350f2aa590a956f
}
</script>

<style>
<<<<<<< HEAD
/* 원하는 스타일 추가 */
=======
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
>>>>>>> 815e73e191fb2a52dfe78b00c350f2aa590a956f
</style>
