<template>
  <ul>
    <li v-for="element in data" :key="element">
        {{element}}
    </li>
  </ul>
</template>

<script>
export default {
    props: ['data'],
}
</script>

<style scoped>
    /* add your style here */
</style>