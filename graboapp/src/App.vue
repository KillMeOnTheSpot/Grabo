<template>
  <v-layout class="rounded rounded-md, content">
    <!------------Navbar------------>
    <v-app-bar class="navbar">
      <img src="./assets/logo.png" class="logo">
      <SearchBar @searchData="handleSearch" :stopLoading="finishedLoading" class="searchbar"></SearchBar>
    </v-app-bar>
    <!------------Sidebar------------>
    <div class="bodycomponents">
      <v-container class="sidebar">
        <Multiselect @item-selected="handleItemSelect"></Multiselect>
        <v-card class="card">
          <!--Filter Checkobxen zur Sortierung-->
          <DynamicFilterCheckbox v-for="checkbox in checkboxes" :key="checkbox.id" :checkboxId="checkbox.id"
            :checkboxLabel="checkbox.label" :dataLocation="checkbox.location" :dataValue="checkbox.value"
            @checkboxChanged="handleCheckboxChanged" />
        </v-card>
    </v-container>
      <!------------Main (Ergebnisse)------------>
      <v-main class="cards">
        <div v-if="filteredResponseData=='error'">
          <p>error fetching data, no results found</p>
        </div>
        <div v-else-if="filteredResponseData=='not found'">
          <p>No results found, sorry</p>
        </div>
        <div v-else-if="filteredResponseData=='loading'">
          <v-icon icon="fa:fas fa-circle-notch fa-spin"></v-icon>
          <p>loading...</p>
        </div>
        <div v-else-if="filteredResponseData">
          <h2 class="results">Such Ergebnisse:</h2>
          <p>{{this.filteredResponseData.length}} Ergebnisse gefunden</p>
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
        <div v-else class="pcontainer">
          <v-icon start icon="mdi-information" color="primary"></v-icon>
          <p>press search to display results!</p>
        </div>
      </v-main>
    </div>
  </v-layout>
</template>


<!------------------------Script---------------------------->
<script>
//imports
import axios from 'axios';
import StudInfoCard from './components/StudInfoCard.vue';
import DynamicFilterCheckbox from './components/DynamicFilterCheckbox.vue';
import SearchBar from './components/SearchBar.vue';
import Multiselect from './components/Multiselect.vue'

import placeholderImage from './assets/notFound.png';

//exported to main
export default {
  //data
  data() {
    return {
      inputValue: '',
      responseData: { items: [] },
      filters: [],
      filteredResponseData: null,
      finishedLoading: true,

      upperCallLimit: 51,

      clientId: '5aee2cfe-1709-48a9-951d-eb48f8f73a74', //client id for the API

      index: 1,

      placeholderImage: placeholderImage,

      checkboxes: [
        { id: 1, label: 'Duales Studium', location: "item.studienangebot.studienmodelle.some(model => model.id === 5)", value: true },
        { id: 2, label: 'Bachelor', location: "item.studienangebot.abschlussgrad.id", value: 2 },
        { id: 3, label: 'Master', location: "item.studienangebot.abschlussgrad.id", value: "NI" },
        // Add more checkboxes as needed
      ],
    };
  },
  //methods
  methods: {
    //fetches data, when the search button is pressed
    fetchData(inputValueName) {
      this.filteredResponseData = 'loading';

      console.log(this.filteredResponseData);
      // Axios GET request, url durchsucht anhand des input feldes
      let apiUrl = `https://rest.arbeitsagentur.de/infosysbub/studisu/pc/v1/studienangebote?sw=${inputValueName}&pg=${this.index}`;
      axios
        .get(apiUrl, {
          headers: {
            'X-API-Key': this.clientId //API Key 
          }
        })
        .then((response) => {
          // Handle successful response
          
          this.responseData.items = this.responseData.items.concat(response.data.items);

          if (response.data.items.length > 0 && this.index < this.upperCallLimit) {
            console.log("is valid, index is: " + this.index);
            this.index++;
            this.fetchData(inputValueName);
            this.filterAndDisplayData();
          }
          else if(this.responseData.items.length == 0){
            this.finishedLoading = true;
            this.filteredResponseData = 'not found';
            document.querySelector("#searchButton").classList.remove("inactive");
          }
          else{
            this.finishedLoading = true;
            document.querySelector("#searchButton").classList.remove("inactive");
          }
          
        })
        .catch((error) => {
          // Handle error
          this.filteredResponseData = 'error';
          this.finishedLoading = true;
          document.querySelector("#searchButton").classList.remove("inactive");
          console.error(this.filteredResponseData);
          console.error("Error fetching data:", error);
        });
    },
    handleSearch(inputValueName) {
      if (inputValueName.length != 0 && this.finishedLoading) {
        this.finishedLoading = false;
        document.querySelector("#searchButton").classList.add("inactive");
        this.index = 1;
        this.responseData = { items: [] };
        this.fetchData(inputValueName);
      }
    },
    handleItemSelect(selectedIds) {
      console.log(selectedIds);
      let id = 0;
      let found = this.filters.some(filter => filter.id === id);
      if (found) {
        console.log("success");
        this.filters = this.filters.filter(filter => filter.id !== id);
      }
      if(selectedIds.length > 0){
        this.filters.push({ id: id, location: "filter.selectedIds.some(selectedId => selectedId.includes(item.studienangebot.region.Key))", value: true, selectedIds: selectedIds});
      }
      this.filterAndDisplayData();
    },
    handleCheckboxChanged(checkboxData) {
      console.log("Checkbox was changed");

      //sucht, ob es schon einen Filter mit der selben ID gibt. Falls ja wird dieser entferntm falls nicht,m wird er als neuer FIlter hinzugefügt
      let found = this.filters.some(filter => filter.id === checkboxData.id);
      if (found) {
        console.log("success");
        this.filters = this.filters.filter(filter => filter.id !== checkboxData.id);
      }
      else {
        this.filters.push({ id: checkboxData.id, location: checkboxData.location, value: checkboxData.value });
      }
      this.filterAndDisplayData();
    },
    handleLoadingFinished(){

    },
    filterAndDisplayData() {
      this.filteredResponseData=='loading'
      //checks, if there is data to be displayed
      if (this.responseData.items.length > 0) {
        let filteredData = this.responseData;

        console.log(this.responseData);

        filteredData = filteredData.items.map(item => item);

        if (this.filters.length > 0) {
          this.filters.forEach(filter => {
            filteredData = filteredData.filter(item => eval(filter.location) === filter.value)
          });
        }

        console.log(filteredData);
        console.log(this.filters.length);

        filteredData = filteredData.map(item => ({
          name: item.studienangebot.studiBezeichnung,
          nameUni: item.studienangebot.studienanbieter.name,
          studInhalt: item.studienangebot.studiInhalt,
          // from ChatGPT: Use optional chaining and nullish coalescing in case no logo is there
          logoURL: item.studienangebot.studienanbieter.logo?.externalURL ?? this.placeholderImage
        }));

        this.filteredResponseData = filteredData;
      }

    }
  },
  //components
  components: { StudInfoCard, DynamicFilterCheckbox, SearchBar, Multiselect }
};
</script>
<!------------------------CSS---------------------------->
<style scoped>
*{
  font-family: "neue-haas-grotesk-display", sans-serif;
  font-weight: 700;
  font-style: normal;
  color: #3b417c;
}

header {
  /* line-height: 1.5; */
  /* max-height: 150vh; */
  height: 10rem;
  justify-content: center;
}

body {
  background: var(--color-);
}

.content{
  display: flex;
}

.bodycomponents{
  display: flex;
  margin: auto;
  margin-top: 5rem;
  margin-bottom: 40rem;
  /* margin-right: 90rem; */
  margin-left: 0;
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
  margin-right: 1.5rem;
  width: 20rem;
}

.searchbar{
  margin-top: 5rem;
}

.navbar {
  text-align: left;
  /* width: 70px; */
}

.sidebar {
  position: flex;
  margin-top: 50px;
  margin-right: 10px;
  width: 14vw;
  /* box-shadow: 0px 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12)); */
}
.v-field_overlay{
  background-color: white;
}
.cards{
  min-height: 300px;
  width: 50vw;
  
  /* min-width: 45rem; */
  /* width: 700px; */
  /* --v-layout-left: 0 !important; */
}
.pcontainer{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  
}
.card{
  margin-bottom: 20px;
  /* border: 2px solid #ccc; */
  box-shadow: none;
  box-shadow: 0px 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
  color: #3b417c;
}
.cardtitle{
  border-radius: 16px 16px 0px 0px;
  /* box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.3)inset; */
}
.sidebarcomponent{
/* margin-left: 400px; */
align-items: center;
justify-content: center;
border: none;
display: flex;
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
