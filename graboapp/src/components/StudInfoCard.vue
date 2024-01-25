<template>
    <v-container class="cardcontainer">
        <!--Lädt die Daten aus der props "studInfo"-->
        <v-card class="studicard">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div class="cardcontent">
                <v-card-title  class="text-h5, title"> {{ studInfo.name }}</v-card-title>
                <v-card-subtitle class="subtitle">{{ studInfo.nameUni }}</v-card-subtitle>
                <div v-if="studInfo.abschlussGrad=='Bachelor/Bakkalaureus'" class="degree">
                    <h4 class="degreetest">{{ studInfo.abschlussGrad }} </h4>
                    <img src="/src/assets/bachelor.png" width="35" class="bacheloricon"> 
                </div>
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
    /* flex-direction: row; */
}
.studicard{
    padding: 1rem 1rem 1rem 1rem;
    width: 100%;
    float: right;
    color: #3a3e64;
}
.cardcontent{
    max-width: 70%;
    /* display: flex; */
    /* flex-direction: row; */
}
.title{
    padding: 0;
    font-weight: 700;
    font-size:x-large;
}
.subtitle{
    padding: 0;
}
.degree{
    display:inline-flex;
}
.bacheloricon{
    margin-left: 10px;
}
.degreetest{
    margin-top: 5px;
}

.cardimage{
    max-width: 150px;
}
.cardtext{
    padding-top: 2rem;
}
</style>