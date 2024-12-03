<!-- App.vue -->
<template>
  <div id="app">
    <KanbanBoard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import KanbanBoard from './components/KanbanBoard.vue';

export default defineComponent({
  name: 'App',
  components: {
    KanbanBoard
  }
});
</script>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
