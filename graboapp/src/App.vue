<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <div v-if="responseData">
        <h2>Data from API:</h2>
        <p>{{ responseData }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script>
import axios from 'axios';

const clientId = 'c003a37f-024f-462a-b36d-b001be4cd24a';

export default {
  data() {
    return {
      responseData: null, // to store the response data
    };
  },
  mounted() {
    // Make a GET request when the component is mounted
    this.fetchData();
  },
  methods: {
    fetchData() {
      // Axios GET request
      axios
        .get('https://rest.arbeitsagentur.de/jobboerse/jobsuche-service/pc/v4/app/jobs?was=Referatsleiter&wo=Berlin&berufsfeld=Informatik&page=1&size=50&arbeitgeber=Deutsche%2520Bahn%2520AG&veroeffentlichtseit=30&zeitarbeit=true&angebotsart=1&befristung=1&arbeitszeit=vz&behinderung=true&corona=true&umkreis=25',{
        headers: {
        'X-API-Key': clientId
    }
  })
        .then((response) => {
          // Handle successful response
          this.responseData = response.data;
        })
        .catch((error) => {
          // Handle error
          console.error("Error fetching data:", error);
        });
    },
  },
};
</script>

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

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
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
    padding-right: calc(var(--section-gap) / 2);
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
