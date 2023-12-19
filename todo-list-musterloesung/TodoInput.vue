<template>
  <input v-model="newTodo" />
  <button @click="addNewTodo()">Add new Todo</button>
</template>

<script>
export default {
    emits : ['newTodoAdded'],
    data(){
        return {
            newTodo : ''
        }
    },
    methods: {
        addNewTodo(){
            this.$emit('newTodoAdded',this.newTodo);
        }
    }
}
</script>

<style scoped>
    /* add your style here */
</style>