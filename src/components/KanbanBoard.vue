<template>
  <v-btn @click="toggleCardForm" color="primary">Add New Card</v-btn>

  <!-- Custom Header for the Board -->
  <v-text-field v-model="boardTitle" label="Board Title" class="board-title" outlined dense
    :style="{ fontSize: '2em', textAlign: 'center' }" />

  <!-- Conditional input fields for title and description -->
  <div v-if="isFormVisible" class="new-card-form">
    <v-text-field v-model="newCardTitle" label="Title" required></v-text-field>
    <v-textarea v-model="newCardDescription" label="Description" required></v-textarea>
    <v-btn @click="addCard" color="success">Add Card</v-btn>
    <v-btn @click="cancelAddCard" color="error">Cancel</v-btn>
  </div>

  <!-- Trashcan for deleting cards -->
  <v-row class="kanban-board">
    <KanbanColumn v-for="(column, index) in columns" :key="index" :columnName="column.name" :cards="column.cards"
      @card-dropped="handleCardDropped" />

    <!-- Trashcan Icon -->
    <v-col class="trashcan-column" cols="3" @dragover.prevent @drop="handleCardDelete">
      <v-icon color="red" large>mdi-delete</v-icon>
      <p>Drag cards here to delete</p>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import KanbanColumn from './KanbanColumn.vue';

interface Card {
  title: string;
  description: string;
  color: string;
}

export default defineComponent({
  name: 'KanbanBoard',
  components: {
    KanbanColumn,
  },
  setup() {
    const columns = ref([
      { name: 'To Do', cards: [] as Card[] },
      { name: 'In Progress', cards: [] as Card[] },
      { name: 'Done', cards: [] as Card[] },
    ]);

    const boardTitle = ref('My Kanban Board');
    const isFormVisible = ref(false);
    const newCardTitle = ref('');
    const newCardDescription = ref('');

    const toggleCardForm = () => {
      isFormVisible.value = !isFormVisible.value;
    };

    const cancelAddCard = () => {
      isFormVisible.value = false;
      newCardTitle.value = '';
      newCardDescription.value = '';
    };

    const addCard = () => {
      if (newCardTitle.value && newCardDescription.value) {
        const newCard: Card = {
          title: newCardTitle.value,
          description: newCardDescription.value,
          color: '#FFFFFF',
        };
        columns.value[0].cards.push(newCard);
        cancelAddCard();
      }
    };

    // Ensure this function is correctly defined
    const handleCardDropped = (payload: { draggedCardIndex: number, draggedCardColumn: string, targetColumn: string }) => {
      const { draggedCardIndex, draggedCardColumn, targetColumn } = payload;
      const draggedCard = columns.value.find((col) => col.name === draggedCardColumn)?.cards[draggedCardIndex];
      if (draggedCard) {
        columns.value.find((col) => col.name === draggedCardColumn)?.cards.splice(draggedCardIndex, 1);
        columns.value.find((col) => col.name === targetColumn)?.cards.push(draggedCard);
      }
    };

    const handleCardDelete = (event: DragEvent) => {
      const draggedCardIndexValue = event.dataTransfer?.getData('cardIndex');
      const draggedCardColumnValue = event.dataTransfer?.getData('columnName');

      if (draggedCardIndexValue && draggedCardColumnValue) {
        const column = columns.value.find((col) => col.name === draggedCardColumnValue);
        if (column) {
          column.cards.splice(parseInt(draggedCardIndexValue), 1);
        }
      }
    };



    // Ensure all methods are returned
    return {
      columns,
      boardTitle,
      isFormVisible,
      newCardTitle,
      newCardDescription,
      toggleCardForm,
      cancelAddCard,
      addCard,
      handleCardDropped,  // Add this to the return object
      handleCardDelete     // Ensure this is also returned
    };
  },
});
</script>





<style scoped>
.kanban-board {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  overflow-x: auto;
}

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

.new-card-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.new-card-form .v-btn {
  margin-top: 10px;
}

.board-title {
  margin-bottom: 20px;
  text-align: center;
}

.trashcan-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: #f9f9f9;
  border: 2px dashed #ff0000;
  border-radius: 8px;
  color: #ff0000;
  cursor: pointer;
}

.trashcan-column p {
  font-size: 0.8em;
  color: #ff0000;
}
</style>
