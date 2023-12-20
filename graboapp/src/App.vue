<template>
  <v-layout class="rounded rounded-md">

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
      </v-list>
      <v-container fluid>
        <!-- Displays whats selected, both can be selected at the same time: Vollzeit Teilzeit Card... -->
        <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
        <v-checkbox v-model="selected" label="Jacob" value="Jacob"></v-checkbox>
      </v-container>
    </v-navigation-drawer>

    <v-app-bar title="Step Metal">
      <input v-model="inputValue" placeholder="Beruf...">
      <button @click="fetchData">Suchen</button>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <div v-if="responseData">
        <h2>Ergebnisse:</h2>
        <!--Job Informationen werden an die jobInfoCard Komponente übergeben-->
        <JobInfoCard v-for="(job, index) in responseData" :key="index" :jobInfo="{ titel: job.titel, beruf: job.beruf }"></JobInfoCard>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>

    </v-main>

  </v-layout>
</template>

<!----------Script-------------->

<script>
//imports
import axios from 'axios';
import JobInfoCard from './components/jobInfoCard.vue';

//variables
const clientId = 'c003a37f-024f-462a-b36d-b001be4cd24a';



export default {
  data() {
    return {
      inputValue: '',
      responseData: null, // to store the response data
    };
  },
  methods: {
    fetchData() {
      // Axios GET request, url durchsucht anhand des input feldes
      const apiUrl = `https://rest.arbeitsagentur.de/jobboerse/jobsuche-service/pc/v4/app/jobs?was=${this.inputValue}`;
      axios
        .get(apiUrl, {
          headers: {
            'X-API-Key': clientId //API Key 
          }
        })
        .then((response) => {
          // Handle successful response

          //mapt die Daten, sodass später nur der Job Titel und Beruf übergeben wird
          const filteredData = response.data.stellenangebote
            .map(job => ({ titel: job.titel, beruf: job.beruf }));
          this.responseData = filteredData;
          
          //console log hier später löschen, manchmal praktisch um die json anzuschauen
          console.log(response.data);
        })
        .catch((error) => {
          // Handle error
          console.error("Error fetching data:", error);
        });
    },
  },
  components: { JobInfoCard }
};
</script>

<!----------CSS-------------->

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
