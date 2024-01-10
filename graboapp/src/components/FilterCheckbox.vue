<template>
    <v-container fluid>
        <!-- Displays whats selected, both can be selected at the same time: Vollzeit Teilzeit Card... -->
        <v-checkbox v-model="istDualesStudium" label="Duales Studium" value=5 @change="emitIstDualesStudium"></v-checkbox>
    </v-container>
</template>
 
<!--Script-->
<script>

export default {
    name: 'filterCheckbox',
    props: {
        filterCheckbox: Object
    },
    data() {
        return {
            selected: ['Vollzeit'],
            istDualesStudium: [''],
        };
    },
    methods: {
        emitIstDualesStudium() {
            console.log("Duales Studium?", this.istDualesStudium);
            this.$emit('istDualesStudiumChanged', this.istDualesStudium);
        }
    }
}
</script>

<!--CSS-->  
<style scoped></style>

