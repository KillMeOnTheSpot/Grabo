<template>
    <v-container>
        <v-card :title="jobInfo.beruf" :subtitle="jobInfo.hashId" :text="fetchJobDetails('VK2qoXBe0s-UAdH_qxLDRrZrY5iY8a1PJt3MjJCXsdo=')" variant="tonal"></v-card>
    </v-container>
</template>
 
<!--Script-->
<script>
import axios from 'axios';

export default {
    name: 'jobInfoCard',
    props: {
        jobInfo: Object
    },
    data() {
        return {
            arbeitszeitmodell: "n.a"
        };
    },
    methods: {
        fetchJobDetails(hashId) {
            let apiUrlDetails = `https://rest.arbeitsagentur.de/jobboerse/jobsuche-service/ed/v1/arbeitgeberlogo/VK2qoXBe0s-UAdH_qxLDRrZrY5iY8a1PJt3MjJCXsdo%3D`;
            axios
                .get(apiUrlDetails, {
                    headers: {
                        'X-API-Key': 'c003a37f-024f-462a-b36d-b001be4cd24a' //API Key 
                    }
                })
                .then((jobDetails) => {
                    const filteredData = jobDetails.data
                        .map(details => ({ arbeitszeitmodelle: details.arbeitszeitmodelle }))
                    this.arbeitszeitmodell = filteredData;
                    return("test");
                })
                .catch((error) => {
                    // Handle error
                    console.error("Error fetching jobDetails:", error);
                });
        }
    }
}


</script>

<!--CSS-->  
<style scoped></style>