<template>
    <v-col
      cols="3"
      class="kanban-column"
      @dragover.prevent
      @drop="dropCard"
    >
      <v-card>
        <v-card-title class="column-title">{{ columnName }}</v-card-title>
        <v-card-text>
          <div class="card-list">
            <KanbanCard
              v-for="(card, index) in cards"
              :key="index"
              :title="card.title"
              :description="card.description"
              :index="index"
              :columnName="columnName"
              @dragstart="dragStart(index)"
            />
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import KanbanCard from './KanbanCard.vue';
  
  export default defineComponent({
    name: 'KanbanColumn',
    components: {
      KanbanCard
    },
    props: {
      columnName: {
        type: String,
        required: true
      },
      cards: {
        type: Array as PropType<Array<{ title: string; description: string }>>,
        required: true
      }
    },
    setup(props, { emit }) {
      const dropCard = (event: DragEvent) => {
        const draggedCardIndex = event.dataTransfer?.getData('cardIndex');
        const draggedCardColumn = event.dataTransfer?.getData('columnName');
  
        if (draggedCardIndex && draggedCardColumn && draggedCardColumn !== props.columnName) {
          const cardIndex = parseInt(draggedCardIndex, 10);
          emit('card-dropped', {
            draggedCardIndex: cardIndex,
            draggedCardColumn,
            targetColumn: props.columnName
          });
        }
      };
  
      const dragStart = (index: number) => {
        emit('card-dragstart', index);
      };
  
      return {
        dropCard,
        dragStart
      };
    }
  });
  </script>
  
  
  <style scoped>
  .kanban-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    padding: 10px;
    border-radius: 8px;
    background-color: #f0f0f0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .column-title {
    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .card-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
  </style>
  