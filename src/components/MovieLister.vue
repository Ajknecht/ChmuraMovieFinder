<template>
  <div class="allActorsList">
    <ul class ="actorsList">
      <li v-for="actor in allActors" v-bind:key="actor.id">
        {{actor.name}}, {{actor.actorId}}
      </li>
    </ul>
  </div>
</template>

<script>
//import axios from "axios";
import apiService from "@/services/ApiService.js"

export default {
  name: 'MovieLister',
  data() {
    return {
      allActors: [],
      allMovies: []
    }
  },
  props: {
    msg: String
  },
  created : function() {
    this.getActors();
    this.getMovies();
  },
  methods: {
    getActors() {

      apiService
        .getAllActors()
        .then(
          response => {
            this.allActors = response.data;
          }
        )
        .catch(
          error => console.log(error)
        );
    },
    getMovies() {
      apiService
        .getAllMovies()
        .then(
          response => {
            this.allMovies = response.data;
          }
        )
        .catch(
          error => console.log(error)
        );
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
