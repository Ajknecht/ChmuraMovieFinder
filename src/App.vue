<template>
  <div id="app">
    <MovieLister msg="So You Want to Know What Actors Have Been in Movies with Keanu Reeves and Nicolas Cage?"/>
    <img thumbnail fluid alt="Nicolas Cage being Nicolas Cage" src="./assets/Cage.jpg">
    <img thumbnail fluid alt="Keanu Reeves being dashing" src="./assets/Reeves.jpg">
  </div>
</template>

<script>
import MovieLister from './components/MovieLister.vue'

export default {
  name: 'App',
  components: {
    MovieLister
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img {

}
</style>
