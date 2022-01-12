<template>
  <div class="allActorsList">
    <select v-model="selectedActor" class="actordropdown" @change="filterByActorName">
      <option value="">--Please select a marvelous actor--</option>
      <option
        :value="(actor)"
        v-for="actor in allActors"
        v-bind:key="actor.id"
        >
        {{actor.name}}
      </option>
    </select>
    <button id="search-button" v-on:click="filterByActorName">Search</button>
    <ul class ="movie-lists">
      These are the Keanu Reeves Movies shared with {{selectedActor.name}}:
      <li v-for="movie in DisplayKRMovies" v-bind:key="movie.id">
        {{movie.title}}
          <ul class="actor-list">
            <li v-for="actor in DisplayKRMovies.actors" v-bind:key="actor.actorId">
              {{actor}}
            </li>
          </ul>
      </li>
      <p>
      These are the Nicolas Cage Movies shared with {{selectedActor.name}}:
      <li v-for="movie in DisplayNCMovies" v-bind:key="movie.id">
        {{movie.title}}
        <ul class="actor-list">
            <li v-for="actor in DisplayNCMovies.actors" v-bind:key="actor.actorId">
              {{actor}}
            </li>
          </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import apiService from "@/services/ApiService.js"
//import validationService from "@/services/ValidationService.js"

export default {
  name: 'MovieLister',
  props: {
    // movieResults: {
    // name: String,
    // KRMovies: Array,
    // NCMovies: Array
    // },
    msg: String
      },
  data() {
    return {
      allActors: [],
      allMovies: [],
      actorDataKeanu: [],
      actorDataNicolas: [],
      DisplayNCMovies: [],
      DisplayKRMovies: [],
      result: {
        name: "",
        KRMovies: [],
        NCMovies: []
      },
      movieResults: [],
      selectedActor: ""
    }
  },
  created() {
    //loading the allActors array
      apiService
        .getAllActors()
        .then(
          response => {
            this.allActors = response.data;
            this.allActors.forEach((actor) => {
              //find Keanu
              if (actor.name === "Keanu Reeves") {
                this.actorDataKeanu.unshift(actor);
              }
              //find Nicolas
              if (actor.name === "Nicolas Cage") {
                this.actorDataNicolas.unshift(actor);
              }

              //the code below causes a server timeout

          //     for (let i = 0; i < this.allActors.length; i++) {
          //       this.result = this.allActors[i].name;
          //       this.allMovies.forEach(movie => {
          // //search allMovies for actors with Keanu's Id (206) and selectedActorId
          //         if (movie.actors.includes(this.actorDataKeanu.actorId) && this.movie.actors.includes(this.allActors[i].actorId)) {
          //           this.result.KRMovies.unshift(movie);
          //            }
          // //search allMovies for actors with Nicolas's Id (115) and selectedActorId
          //         if (movie.actors.includes(this.actorDataNicolas.actorId) && this.movie.actors.includes(this.allActors[i].actorId)) {
          //           this.result.NCMovies.unshift(movie);
          //             }});
          //           this.movieResults.unshift(this.result)
          //       }
            })
          }
        )
        .catch(
          error => console.log(error)
        );
    //loading the allMovies array
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
      this.allActors.forEach((actor) => {
        //reset the arrays and name to blank every new actor loop
        this.result.KRMovies = [];
        this.result.NCMovies = [];
        this.result.name = "";

        //for new result, get each actor's name and assign it to the result
        this.result.name = actor.name;
          this.allMovies.forEach((movie) => {
            //search allMovies for actors with Keanu's Id (206) and looped actorId
            if (movie.actors.includes(this.actorDataKeanu[0].actorId) && movie.actors.includes(this.actor.actorId)) {
              this.result.KRMovies.unshift(movie);
              }
            //search allMovies for actors with Nicolas's Id (115) and looped actorId
            if (movie.actors.includes(this.actorDataNicolas[0].actorId) && movie.actors.includes(this.actor.actorId)) {
              this.result.NCMovies.unshift(movie);
              }
          })
            this.movieResults.unshift(this.result);
      })
    },
  methods: {
    filterByActorName(){
        this.DisplayKRMovies = [];
        this.DisplayNCMovies = [];
        this.allMovies.forEach ( (movie) => {
        //search allMovies for actors with Keanu's Id (206) and selectedActorId
          if (movie.actors.includes(this.actorDataKeanu[0].actorId) && movie.actors.includes(this.selectedActor.actorId)) {
              this.DisplayKRMovies.unshift(movie);
          }
        //search allMovies for actors with Nicolas's Id (115) and selectedActorId
          if (movie.actors.includes(this.actorDataNicolas[0].actorId) && movie.actors.includes(this.selectedActor.actorId)) {
              this.DisplayNCMovies.unshift(movie);
          }
        })
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