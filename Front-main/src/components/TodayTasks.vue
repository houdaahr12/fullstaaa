<template>
  <div class="today-tasks-card">
    <div class="header d-flex justify-content-between align-items-center fw-bold">
      <h3>Tâches d’aujourd’hui</h3>
      <button class="add" @click="goToAddTask">+</button>
    </div>
    <div class="task-list">
      <TaskDisplay
        v-for="task in sortedTasks"
        :key="task.id"
        :task="task"
        @update-task-status="updateTaskStatus"
      />
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import TaskDisplay from "./TaskDisplay.vue";

export default {
  name: 'TodayTasks',
  components: {
    TaskDisplay,
    
  },
  data() {
  return {
    tasks: [],
  };
},
computed: {
  // Sort tasks so that completed tasks appear at the bottom
  sortedTasks() {
    return this.tasks.slice().sort((a, b) => {
      if (a.status === 'termine' && b.status !== 'termine') {
        return 1; // Move completed tasks down
      }
      return -1; // Keep other tasks in order
    });
  },
},
 methods: {
    goToAddTask() {
      this.$router.push('/add');
    },

    updateTaskStatus(updatedTask) {
      // Update the task status in the local tasks array
      const taskIndex = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex].status = updatedTask.status;
      }

      // Send the updated status to the backend
      axios.put(`http://localhost:3000/api/tasks/${updatedTask.id}`, {
        status: updatedTask.status,
      })
      .then(response => {
        console.log('Task status updated:', response.data);
      })
      .catch(error => {
        console.error('Error updating task status:', error);
      });
    },
  },

  mounted() {
    // Fetch tasks from the backend
    axios.get('http://localhost:3000/api/tasks')
      .then(response => {
        this.tasks = response.data;  // Fill the tasks array with the fetched data
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  },

}
</script>

<style>
/* Your styles here */
.today-tasks-card {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 1.3rem;
  margin-left: 150px;
  background: #f7eaff;
  width: 80%;
  max-height: 280px;
  overflow-y: auto;
  scroll-behavior: smooth;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.header {
  margin-bottom: 1rem;
  color: #491784;
  font-weight: bolder;
}

button.add {
  padding: 0.3rem;
  width: 2rem; /* Makes it a perfect circle */
  height: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  background: #491784;
  color: #fff;
  border: none;
  border-radius: 50%; /* Ensures it's perfectly round */
  display: flex; /* Centers the "+" symbol */
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Adds subtle depth */
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.3s ease;
}

button.add:hover {
  background: hsl(268, 70%, 60%); /* Softer hover effect */
  transform: scale(1.1); /* Subtle growth effect */
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); /* Enhance shadow on hover */
}

@media screen and (max-width: 768px) {
  .today-tasks-card{
    margin-left: 15px;
  }
}
</style>
