<script setup lang="ts">
defineProps<{ items: string[] }>()
</script>

<template>
  <ul class="practice-list">
    <li v-for="item in items" :key="item">{{ item }}</li>
  </ul>
</template>

<style scoped>
.practice-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--s3);
  color: var(--ink-2);
  font-size: 15px;
}
li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  line-height: 1.6;
}
html[dir="rtl"] li { line-height: 1.9; }

/* diamond bullet — the girih square, at 6px */
li::before {
  content: "";
  flex: none;
  width: 6px;
  height: 6px;
  margin-top: .55em;
  border: 1px solid var(--accent-line);
  transform: rotate(45deg);
}
</style>
