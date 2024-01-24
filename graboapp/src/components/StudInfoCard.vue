<template>
    <v-container class="card">
        <!--Lädt die Daten aus der props "studInfo"-->
        <v-card :title="studInfo.name" :subtitle=studInfo.nameUni>
            <img :src="studInfo.logoURL" alt="logo des Studiengangs" width=200>
            <p v-html="studInfo.studInhalt"></p>
        </v-card>
    </v-container>
    <p v-text="studInfo.studInhalt"></p>
</template>

 
<!----------Script----------->
<script>
    export default {
        name: 'studInfoCard',
        props: {
            studInfo: Object
        },
        data() {
            return {
                //kann man maybe löschen
                arbeitszeitmodell: "n.a"
            };
        },
}
</script>

<!----------CSS---------->  
<style scoped>
    /* .card{
        box-shadow: 0px 2px 1px -1px, rgba(0, 0, 0, 0.2)
        
    } */
    
</style>