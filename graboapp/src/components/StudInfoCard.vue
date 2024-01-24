<template>
    <v-container class="card">
        <!--Lädt die Daten aus der props "studInfo"-->
        <v-card :title="studInfo.name" :subtitle=studInfo.nameUni>
            <img :src="studInfo.logoURL" alt="logo des Studiengangs" width=200>
            <p v-html="studInfo.studInhalt"></p>
        </v-card>
    </v-container>
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
 
</style>