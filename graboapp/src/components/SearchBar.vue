<template>
    <div class="searchbars">
        <v-text-field v-model="inputValueName" clearable label="Studiengang oder Uniname" variant="solo" class="searchfield"
            placeholder="z.B. Medizin"></v-text-field>
    </div>
    <v-btn @click="searchData">Suchen</v-btn>
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
.searchbars {
    display: flex;
    width: 700px;
}

.searchfield {
    margin-top: 1.5rem;
    margin-right: 1rem;
}
</style>