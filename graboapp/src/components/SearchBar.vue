<template>
    <v-text-field v-model="inputValueName" clearable label="nach Studiengang suchen" variant="solo" class="searchfield" placeholder="z.B. Medizin"></v-text-field>
    <v-btn id="searchButton" @click="searchData">Suchen</v-btn>
</template>
 
<!------------Script------------>
<script>

export default {
    name: 'SearchBar',
    emits: ['searchData'],
    props: {
    },
    data() {
        return {
           inputValueName: '', 
        };
    },
    methods: {
        //emitted ein Event an App.vue wenn die Checkbox sich verändert
        searchData() {
            this.$emit('searchData', this.inputValueName);
        }
    }
}
</script>

<!-----------CSS----------->  
<style scoped>
.inactive {
    background-color: brown;
}
</style>