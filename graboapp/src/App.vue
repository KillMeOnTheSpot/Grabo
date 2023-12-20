<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <input v-model="inputValue" placeholder="Type something...">
      <button @click="fetchData">Search</button>
      <div v-if="responseData">
        <!--die genaue Schleife ist von Chat GPT, iteriert gefetchten Daten und gibt sie mit v-for Schleife als List Items zurück-->
        <h2>Data from API:</h2>
        <ul>
          <li v-for="(job, index) in responseData" :key="index">{{ job }}</li> 
        </ul>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </header>

  <v-layout class="rounded rounded-md">

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
      </v-list>
      <v-container fluid>
        <p>{{ selected }}</p>
        <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
        <v-checkbox v-model="selected" label="Jacob" value="Jacob"></v-checkbox>
      </v-container>
    </v-navigation-drawer>

    <v-app-bar title="Application bar"></v-app-bar>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      Main Content
    </v-main>
    <v-container>
      <v-chip closable> Chip </v-chip>
    </v-container>


    <v-container>
      <v-card title="Card title" subtitle="Subtitle" text="..." variant="tonal"></v-card>
    </v-container>
    <JobInfoCard></JobInfoCard>

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
                    'X-API-Key': clientId //API Key den wir der Api übergeben
                }
            })
                .then((response) => {
                // Handle successful response
                //test
                const filteredData = response.data.stellenangebote
                    //.filter(job => /* Your filter condition here */)
                    .map(job => job.titel);
                // Join the array elements into a string
                this.responseData = filteredData;
                console.log(this.responseData);
                //test ende
                // let text = "";
                // for (let i = 0; i < response.data.stellenangebote.length; i++) {
                //   text += response.data.stellenangebote[i].titel;
                // }
                // this.responseData = text;
                // console.log(this.responseData);
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
