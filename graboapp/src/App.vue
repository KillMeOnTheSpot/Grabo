<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar class="navbar">
      <div class="logo">Step Metal</div>
      <div class="searchbars">
        <v-text-field v-model="inputValue" clearable label="Studiengang oder Uniname" variant="solo" class="searchfield" placeholder="z.B. Medizin"></v-text-field>
        <v-text-field v-model="inputValue" clearable label="Ort oder 5-stellige PLZ" variant="solo" class="searchfield" placeholder="z.B. Tübingen"></v-text-field>
      </div>
      <v-btn @click="fetchData">Suchen</v-btn>
    </v-app-bar>
    <v-navigation-drawer class="sidebarcomponent">
      <div class="sidebar">
        <v-card>
          <v-list>

            <v-list-item title="Abschlussart"></v-list-item>
          </v-list>
          <v-container fluid >
            <!-- Displays whats selected, both can be selected at the same time: Vollzeit Teilzeit Card... -->
            <v-checkbox v-model="selected" label="John" value="John"></v-checkbox>
            <v-checkbox v-model="selected" label="Jakob" value="Jakob"></v-checkbox>
          </v-container>
        </v-card>
      </div>  
    </v-navigation-drawer>
    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <div v-if="responseData">
        <h2 class="results">Ergebnisse:</h2>
        <!--Job Informationen werden an die jobInfoCard Komponente übergeben-->
        <JobInfoCard v-for="(job, index) in responseData" :key="index" :jobInfo="{
          titel: job.titel,
          beruf: job.beruf,
          hashId: job.hashId,
          arbeitszeitmodelle: job.arbeitszeitmodelle
        }"></JobInfoCard>
        <h2>Ergebnisse:</h2>
        <!--stud Informationen werden an die studInfoCard Komponente übergeben-->
        <StudInfoCard v-for="(ausb, index) in responseData" :key="index" :studInfo="{
          name: ausb.name,
          nameUni: ausb.nameUni
        }"></StudInfoCard>
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
import StudInfoCard from './components/StudInfoCard.vue';

//variables
const clientId = '5aee2cfe-1709-48a9-951d-eb48f8f73a74';



export default {
  data() {
    return {
      inputValue: '',
      selected: ['John'],
      responseData: null, // to store the response data
    };
  },
  methods: {
    fetchData() {
      // Axios GET request, url durchsucht anhand des input feldes
      const apiUrl = `https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienangebote?sw=${this.inputValue}`;
      axios
        .get(apiUrl, {
          headers: {
            'X-API-Key': clientId //API Key 
          }
        })
        .then((response) => {
          // Handle successful response
          console.log(response.data);
          //mapt die Daten, sodass später nur der Stud Titel und Beruf übergeben wird
          const filteredData = response.data.items.map(item => ({
            name: item.studienangebot.studiBezeichnung,
            nameUni: item.studienangebot.studienanbieter.name,
          }));

          this.responseData = filteredData;

          //console log hier später löschen, manchmal praktisch um die json anzuschauen
          console.log(filteredData);
          console.log(this.responseData);

        })
        .catch((error) => {
          // Handle error
          console.error("Error fetching data:", error);
        });
    },
  },
  components: { StudInfoCard }
};
</script>

<!----------CSS-------------->

<style scoped>
header {
  /* line-height: 1.5; */
  /* max-height: 150vh; */
  height: 5rem;
  justify-content: center;


}

body {
  background: var(--color-);
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: left;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  text-align: right;
}

nav a:first-of-type {
  border: 0;
}

.logo {
  margin-left: 1rem;
  margin-right: 10rem;
  font-size: 24px;
}

.navbar {
  text-align: left;
  /* width: 70px; */
}
.searchbars{
  display: flex;
  width: 700px;
}

.searchfield{
margin-top: 1.5rem;
margin-right: 1rem;
}
.sidebar{
  position:relative;
  top: 40px;
  margin-left: 10px;
  margin-right: 10px;
}
/* cant be edited easily beacause inline?! have to force with important */
/* .sidebarcomponent{
  top: 100px !important;
} */

.results{
  padding-left: 15px;
}

/* .search {

}
 */

/* Warum Responsive mit min größe statt max Größe ??? */
/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  nav {
    text-align: left;
    font-size: 1rem;
    padding: 1rem 0;
    
  }

} */</style>
