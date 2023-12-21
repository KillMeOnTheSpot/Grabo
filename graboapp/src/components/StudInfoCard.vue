<template>
    <v-container>
        <v-card :title="studInfo.name" :subtitle=studInfo.nameUni variant="tonal">
            <img src="https://rest.arbeitsagentur.de/infosysbub/kursnet-rest/ct/v1/bildungsanbieter/196684/logos/7110">
        </v-card>   
    </v-container>
</template>
 
<!--Script-->
<script>

export default {
    name: 'studInfoCard',
    props: {
        studInfo: Object
    },
    data() {
        return {
            arbeitszeitmodell: "n.a"
        };
    },
}


</script>

<!--CSS-->  
<style scoped></style>