<template>
    <v-container class="cardcontainer">
        <!--Lädt die Daten aus der props "studInfo"-->
        <v-card class="studicard">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div class="cardcontent">
                <v-card-title  class="text-h5, title"> {{ studInfo.name }}</v-card-title>
                <v-card-subtitle class="subtitle">{{ studInfo.nameUni }}</v-card-subtitle>
                <h4>{{ studInfo.abschlussGrad }} 
                    <div v-if="studInfo.abschlussGrad=='Bachelor/Bakkalaureus'">
                        <img src="./assets/bachelor.svg"> 
                    </div>
                </h4>
                
                <p v-html="studInfo.studInhalt" class="cardtext"></p>
              </div>
              <v-avatar class="ma-3" size="125" rounded="0">
                <v-img :src="studInfo.logoURL" alt="logo des Studiengangs" :width="125"  class="cardimage"></v-img>
              </v-avatar>
            </div>
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

.cardcontainer{
    display: flex;
}
.studicard{
    padding: 1rem 1rem 1rem 1rem;
    width: 100%;
    float: right;
    color: #3a3e64;
}
.cardcontent{
    max-width: 70%;
}
.title{
    padding: 0;
    font-weight: 700;
    font-size:x-large;
}
.subtitle{
    padding: 0;
}
.cardimage{
    max-width: 150px;
}
.cardtext{
    padding-top: 2rem;
}
</style>