<template>
    <v-container>
        <v-card :title="studInfo.name" :subtitle=studInfo.nameUni text="test" variant="tonal">
            <img :src="studInfo.logoURL" alt="logo des Studiengangs" width=200>
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