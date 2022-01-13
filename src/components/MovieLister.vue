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
    <button id="search-button" v-if="movieResults.length > 0" v-on:click="validate">VALIDATE</button>

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
import validationService from "@/services/ValidationService.js"

export default {
  name: 'MovieLister',
  props: {
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
      movieResults: [],
      movieResultsStr: "",
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
  },
  mounted(){

    //now to fill the movieResults array
    //... not 100% sure why I have to make a new call for movieResults to fill, maybe something about local variables?
      apiService
        .getAllActors()
        .then(
          response => {
            this.allActors = response.data;
      apiService
        .getAllMovies()
        .then(
          response => {
            this.allMovies = response.data;
          }
        )
        this.allActors.forEach((actor) => {

        //reset the arrays and name to blank every new actor loop
        let name = actor.name;
        let KRMovies = [];
        let NCMovies = [];
        

        //for new result, get each actor's name and assign it to the result
        this.name = actor.name;
          this.allMovies.forEach((movie) => {
            //search allMovies for actors with Keanu's Id (206) and looped actorId
            if (movie.actors.includes(this.actorDataKeanu[0].actorId) && movie.actors.includes(actor.actorId)) {
              KRMovies.unshift(movie.title);
              }
            //search allMovies for actors with Nicolas's Id (115) and looped actorId
            if (movie.actors.includes(this.actorDataNicolas[0].actorId) && movie.actors.includes(actor.actorId)) {
              NCMovies.unshift(movie.title);
              }
          })
          //check to make sure there are movies in both NC and KR arrays, keeping only the confirmed ones
          if(KRMovies.length > 0 && NCMovies.length > 0){
            this.movieResults.unshift({KRMovies, NCMovies, name});
          }
              })})
          //trying to get around the Observer
            // this.movieResultsStr = JSON.parse(JSON.stringify(this.movieResults));
            // let movieResultsFinal = this.movieResults.filter ( (movie) => {
            //   return JSON.stringify(JSON.parse(JSON.stringify(movie)))
            // });

            // console.log(movieResultsFinal)

    //validation
    // validationService
    //   .validate(this.movieResults)  //Vue's Observer keeps getting in the way and I tried lifestyle hook changes, parse/stringify, 
    //                                    //for loops, but cannot get around the Observer which is why the data being validated looks empty
    //                                    //despite having the contents of movieResults there
    //   .then(
    //     response => {
    //       alert(`The response is ${response.status}`)
    //       console.log(response.data)
    //     }
    //   )
    //   .catch(
    //     error => {
    //       console.log(error.response.data)
    //       console.log(this.movieResults)
    //     }
    //   )
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
      },
      //method for the validate button; trying to validate after page completely laods to check for it's a lifestyle issue
      validate() {
        validationService
      .validate(this.movieResults)
      .then(
        response => {
          alert(`The response is ${response.status}`)
          console.log(response.data)
        }
      )
      .catch(
        error => {
          alert(`The error is ${error.response.data}`)
          console.log(error.response.data)
          console.log(this.movieResults)
        }
      )
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