<template>
  <div id="app">
    <ItemManager/>
  </div>
</template>

<script>
import ItemManager from './components/ItemManager'

export default {
  name: 'App',
  components: {
    ItemManager
  }
}
</script>

<style>
#app {
  font-family: Muli, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #ffffff;
  padding-top: 20px;
  margin-top: 60px;
  margin-left: 15%;
  margin-right: 15%;
  border-radius: 6px;
  box-shadow: 0 6px 10px -4px 
}
</style>
