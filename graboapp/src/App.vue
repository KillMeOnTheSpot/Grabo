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
      <input v-model="inputValue" placeholder="Type something...">
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


</template>

<script>
import axios from 'axios';

const clientId = 'c003a37f-024f-462a-b36d-b001be4cd24a';
let jobTitel = 'Referatsleiter';

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
      let apiUrl = "https://rest.arbeitsagentur.de/jobboerse/jobsuche-service/pc/v4/app/jobs?was=" + jobTitel;
      axios
        .get(apiUrl
        ,{
        headers: {
        'X-API-Key': clientId
    }
  })
        .then((response) => {
          // Handle successful response
          //this.responseData = response.data;
          let text = "";

          for(let i = 0;  i < response.data.stellenangebote.length; i++){
            text += response.data.stellenangebote[i].titel;
          }

          this.responseData = text;
          
          console.log(this.responseData);
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
