<template>
    <v-container>
        <v-card :title="jobInfo.beruf" :subtitle="jobInfo.titel" text="..." variant="tonal"></v-card>
    </v-container>
</template>
 
<!--Script-->
<script>
export default {
    name: 'jobInfoCard',
    props: {
        jobInfo: Object
    }
}

</script>

<!--CSS-->  
<style scoped>

</style>