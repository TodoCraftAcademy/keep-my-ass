<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  msg: string
}

withDefaults(defineProps<Props>(), {
  msg: 'Hello World'
})
</script>

<style scoped>
.hello {
  text-align: center;
  padding: 20px;
}

h1 {
  color: #2c3e50;
  font-size: 2rem;
  margin: 0;
}
</style>
