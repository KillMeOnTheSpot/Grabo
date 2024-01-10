<template>
    <v-container>
        <v-card :title="studInfo.name" :subtitle=studInfo.nameUni variant="tonal">
            <img :src="studInfo.logoURL" alt="logo des Studiengangs" width=200>
            <p v-html="studInfo.studInhalt"></p>
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
<style scoped>
    
</style>