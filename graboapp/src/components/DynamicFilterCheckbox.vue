<template>
    <v-container class="checkboxcontainer">
        <!-- <h2>checkbox</h2> -->
        <!-- Displays whats selected, both can be selected at the same time: Vollzeit Teilzeit Card... -->
        <v-checkbox v-model="isChecked" :label="checkboxLabel" @change="handleChange"></v-checkbox>
    </v-container>
</template>
<!------------Script------------>
<script>

export default {
    name: 'DynamicFilterCheckbox',
    emits: ['checkboxChanged'],
    props: {
        checkboxId: Number,
        checkboxLabel: String,
        dataLocation: String,
        dataValue: null,
    },
    data() {
        return {
            //selected: ['Vollzeit'],
            isChecked: false,
        };
    },
    methods: {
        //emitted ein Event an App.vue wenn die Checkbox sich verändert
        handleChange(){
            this.$emit('checkboxChanged', { id: this.checkboxId, location: this.dataLocation, value: this.dataValue });
        }
    }
}
</script>

<!-----------CSS----------->  
<style scoped></style>

