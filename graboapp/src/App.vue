<template>
  <v-layout class="rounded rounded-md">

    <!------------Navbar------------>
    <v-app-bar class="navbar">
      <div class="logo">Step Metal</div>
      <div class="searchbars">
        <v-text-field v-model="inputValue" clearable label="Studiengang oder Uniname" variant="solo" class="searchfield"
          placeholder="z.B. Medizin"></v-text-field>
        <v-text-field v-model="inputValue" clearable label="Ort oder 5-stellige PLZ" variant="solo" class="searchfield"
          placeholder="z.B. Tübingen"></v-text-field>
      </div>
      <v-btn @click="fetchData">Suchen</v-btn>
    </v-app-bar>

    <!------------Sidebar------------>
    <v-navigation-drawer class="sidebarcomponent">
      <div class="sidebar">
        <v-card class="card">
          <v-list>
            <v-list-item title="Abschlussart" class="cardtitle"></v-list-item>
          </v-list>
          <!--Filter Checkobx zur Sortierung-->
          <FilterCheckbox @istDualesStudiumChanged="istDualesStudiumChange"></FilterCheckbox>
        </v-card>
        <v-card class="card">
          <v-list>
            <v-list-item title="Abschlussart"></v-list-item>
          </v-list>
          <!--Filter Checkobx zur Sortierung-->
          <FilterCheckbox @istDualesStudiumChanged="istDualesStudiumChange"></FilterCheckbox>
        </v-card>
        <v-card class="card">
          <v-list>
            <v-list-item title="Abschlussart"></v-list-item>
          </v-list>
          <!--Filter Checkobx zur Sortierung-->
          <FilterCheckbox @istDualesStudiumChanged="istDualesStudiumChange"></FilterCheckbox>
        </v-card>
      </div>
    </v-navigation-drawer>

    

    <!------------Main (Ergebnisse)------------>
    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <div v-if="filteredResponseData">
        <h2 class="results">Such Ergebnisse:</h2>
        <!--stud Informationen werden an die studInfoCard Komponente übergeben-->
        <StudInfoCard v-for="(stud, index) in filteredResponseData" :key="index" :studInfo="{
          name: stud.name,
          nameUni: stud.nameUni,
          studInhalt: stud.studInhalt,
          logoURL: stud.logoURL
        }">
        </StudInfoCard>
      </div>
      <!--Wird ausgegeben, wenn noch nichts geladen wurde-->
      <div v-else>
        <p>no results yet</p>
      </div>
    </v-main>

  </v-layout>
</template>


<!------------------------Script---------------------------->
<script>
//imports
import axios from 'axios';
import StudInfoCard from './components/StudInfoCard.vue';
import FilterCheckbox from './components/FilterCheckbox.vue';

//variables
const clientId = '5aee2cfe-1709-48a9-951d-eb48f8f73a74';

//exported to main
export default {
  //data
  data() {
    return {
      inputValue: '',
      istDualesStudium: '',
      responseData: null, // to store the response data
      filteredResponseData: null,
    };
  },
  //methods
  methods: {
    //fetches data, when the search button is pressed
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
          this.responseData = response.data;
          //mapt die Daten, sodass später nur bestimmte Daten angezeigt werden
          const filteredData = response.data.items.map(item => ({
            name: item.studienangebot.studiBezeichnung,
            nameUni: item.studienangebot.studienanbieter.name,
            studInhalt: item.studienangebot.studiInhalt,
            logoURL: item.studienangebot.studienanbieter.logo.externalURL
          }));

          //legt die Daten in filteredData ab, die Original Abfrage ist noch in responseData gespeichert 
          this.filteredResponseData = filteredData;

          //console log hier später löschen, manchmal praktisch um die json anzuschauen
          console.log(filteredData);
          console.log(this.filteredResponseData);

        })
        .catch((error) => {
          // Handle error
          console.error("Error fetching data:", error);
        });
    },
    handleSelectionChange(selectedValues) {

    },
    //filtert die Daten, wenn die "Duales Studium" Checkbox ausgewählt ist
    istDualesStudiumChange(selectedValues) {

      console.log("repsonseData:", this.responseData);
      console.log("value?:", parseInt(selectedValues[1]));

      // if Abfrage, checkt vereinfacht gesagt, ob die Checkbox selected oder nicht selected ist
      if (!isNaN(parseInt(selectedValues[1]))) {
        const filteredData = this.responseData.items
          //filter for Duales Studium (Duales Studium hat die ID 5). Parse Int wandelt selectedValues von "5" zu 5 
          .filter(item => item.studienangebot.studienmodelle.some(model => model.id === parseInt(selectedValues[1])))
          .map(item => ({
            name: item.studienangebot.studiBezeichnung,
            nameUni: item.studienangebot.studienanbieter.name,
            studInhalt: item.studienangebot.studiInhalt,
            logoURL: item.studienangebot.studienanbieter.logo.externalURL
          }));

        this.filteredResponseData = filteredData;
        console.log("filtered repsonseData:", this.filteredResponseData);
      }
      //else lädt die Daten normal, wenn die Checkbox deselected wird
      else{
        const filteredData = this.responseData.items
          .map(item => ({
            name: item.studienangebot.studiBezeichnung,
            nameUni: item.studienangebot.studienanbieter.name,
            studInhalt: item.studienangebot.studiInhalt,
            logoURL: item.studienangebot.studienanbieter.logo.externalURL
          }));

        this.filteredResponseData = filteredData;
        console.log("filtered repsonseData:", this.filteredResponseData);
      }
    }
  },
  //components
  components: { StudInfoCard, FilterCheckbox }
};
</script>


<!------------------------CSS---------------------------->
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

.searchbars {
  display: flex;
  width: 700px;
}

.searchfield {
  margin-top: 1.5rem;
  margin-right: 1rem;
}

.sidebar {
  position: flex;
  margin-top: 50px;
  margin-left: 10px;
  margin-right: 10px;
}

.card{
  margin-bottom: 20px;
  /* border: 2px solid #ccc; */

  /* border-radius: 20px; */
  box-shadow: none;
  /* box-shadow: 0px 0px 0px 1px inset; */
}
.cardtitle{
  border-radius: 16px 16px 0px 0px;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.3)inset;

}
.sidebarcomponent{
margin-left: 400px;
border: none;
}

.results {
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

} */
</style>
