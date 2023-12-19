<script>
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';

export default {
  components: { TodoInput, TodoList },
  data() {
    return {
      todoList : []
    }
  },
  methods: {
    addTodoToList(newTodo){
      this.todoList.push(newTodo);
    }
  }
}
</script>

<template>
  <h1>Meine Todo-Liste</h1>
  <todo-input @newTodoAdded="addTodoToList"></todo-input>
  <todo-list :data="todoList"></todo-list>
</template>

<style scoped>
 /* Remove styles from main.css if unhappy */
</style>
<script>
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';

export default {
  components: { TodoInput, TodoList },
  data() {
    return {
      todoList : []
    }
  },
  methods: {
    addTodoToList(newTodo){
      this.todoList.push(newTodo);
    }
  }
}
</script>

<template>
  <h1>Meine Todo-Liste</h1>
  <todo-input @newTodoAdded="addTodoToList"></todo-input>
  <todo-list :data="todoList"></todo-list>
</template>

<style scoped>
 /* Remove styles from main.css if unhappy */
</style>


