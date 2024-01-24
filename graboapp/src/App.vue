<template>
  <v-layout class="rounded rounded-md">

    <!------------Navbar------------>
    <v-app-bar class="navbar">
      <div class="logo">Step Metal</div>
      <Multiselect @item-selected="handleItemSelect"></Multiselect>
      <SearchBar @searchData="handleSearch" style="border-radius: 50px;"></SearchBar>
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
          <!--Filter Checkobxen zur Sortierung-->
          <DynamicFilterCheckbox v-for="checkbox in checkboxes" :key="checkbox.id" :checkboxId="checkbox.id"
            :checkboxLabel="checkbox.label" :dataLocation="checkbox.location" :dataValue="checkbox.value"
            @checkboxChanged="handleCheckboxChanged" />
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

      clientId: '5aee2cfe-1709-48a9-951d-eb48f8f73a74', //client id for the API

      index: 1,
      placeholderImage: placeholderImage,


      checkboxes: [
        { id: 1, label: 'Duales Studium', location: "item.studienangebot.studienmodelle.some(model => model.id === 5)", value: true },
        { id: 2, label: 'Checkbox 2', location: "item.studienangebot.id", value: "73209814" },
        { id: 3, label: 'TH', location: "item.studienangebot.region.Key", value: "TH" },
        // Add more checkboxes as needed
      ],
    };
  },
  //methods
  methods: {
    //fetches data, when the search button is pressed
    fetchData(inputValueName) {
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

          if (response.data.items.length > 0) {
            console.log("is invalid, index is: " + this.index);
            this.index++;
            this.fetchData(inputValueName);
          }
          this.filterAndDisplayData();
        })
        .catch((error) => {
          // Handle error
          console.error("Error fetching data:", error);
        });
      // }
    },
    handleSearch(inputValueName){
      this.index = 1;
      this.responseData = { items: [] };
      this.fetchData(inputValueName);
    },
    handleItemSelect(selectedId) {
      console.log(selectedId);
      let id = 0;
      let found = this.filters.some(filter => filter.id === id);
      if (found) {
        console.log("success");
        this.filters = this.filters.filter(filter => filter.id !== id);
      }
      this.filters.push({ id: id, location: "item.studienangebot.region.Key", value: selectedId });
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
    filterAndDisplayData() {
      //checks, if there is data to be displayed
      if (this.responseData) {
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
header {
  height: 10rem;
  justify-content: center;
}

body {
  background: var(--color-);
}

/* nav {
  width: 100%;
  font-size: 12px;
  text-align: left;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  text-align: right;
} */

/* nav a:first-of-type {
  border: 0;
} */

.logo {
  margin-left: 1rem;
  margin-right: 10rem;
  font-size: 24px;
}

/* .navbar {
  text-align: left;
  width: 70px; 
}*/


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
