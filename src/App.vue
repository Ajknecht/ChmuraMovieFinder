<template>
  <div id="app">
    <MovieLister msg="So You Want to Know What Actors Have Been in Movies with Keanu Reeves and Nicolas Cage?"/>
    <img id="cage" thumbnail fluid alt="Nicolas Cage being Nicolas Cage" src="./assets/Cage.jpg">
    <img id="keanu" thumbnail fluid alt="Keanu Reeves being dashing" src="./assets/Reeves.jpg">
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
  background: rgb(116, 146, 190);
}
#keanu {
  width: 200px;
  margin: 20px;
}
#cage {
  width: 200px;
  margin: 20px;
}
document {
    background: rgb(116, 146, 190);
}
</style>
