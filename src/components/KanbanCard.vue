<template>
    <v-card
      class="kanban-card"
      draggable="true"
      @dragstart="dragStart"
      @dragend="dragEnd"
    >
      <v-card-title class="title">{{ title }}</v-card-title>
      <v-card-text class="description">{{ description }}</v-card-text>
    </v-card>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'KanbanCard',
    props: {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      index: {
        type: Number,
        required: true
      },
      columnName: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const dragStart = (event: DragEvent) => {
        event.dataTransfer?.setData('cardIndex', props.index.toString());
        event.dataTransfer?.setData('columnName', props.columnName);
        event.target?.classList.add('dragging');
      };
  
      const dragEnd = (event: DragEvent) => {
        event.target?.classList.remove('dragging');
      };
  
      return {
        dragStart,
        dragEnd
      };
    }
  });
  </script>
  
  
  <style scoped>
  .kanban-card {
    user-select: none; /* Prevent text selection */
    cursor: grab; /* Show grab cursor when hovering */
    padding: 12px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .title {
    font-weight: bold;
    font-size: 1.2em;
  }
  
  .description {
    font-size: 1em;
    color: #555;
  }
  
  .kanban-card:active {
    cursor: grabbing; /* Show grabbing cursor when dragging */
  }
  
  .kanban-card.dragging {
    opacity: 0.5; /* Optional: make the card semi-transparent while dragging */
  }
  </style>
  