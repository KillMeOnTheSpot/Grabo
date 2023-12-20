<template>
    <v-container>
        <v-card :title="jobTitel" subtitle="Subtitle" text="..." variant="tonal"></v-card>
    </v-container>
</template>
 
<!--Script-->
<script>
export default {
    name: 'jobInfoCard',
    props: {
        jobTitel: String
    }
}

</script>

<!--CSS-->  
<style></style>