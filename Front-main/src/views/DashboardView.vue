<template>
  <div class="dashboard">
    <!-- Pass taskCount to TaskOverview -->
    <TaskOverview :taskCount="taskCount" />
    <div class="container">
        <div class="row">
        <!-- TodayTasks Component -->
        <div class="col-11 col-lg-6 d-flex justify-content-center ms-5 ms-md-0">
            <TodayTasks :tasks="tasksArray" />

        </div>

        <!-- StatisticsChart Component -->
        <div class="col-12 col-md-6">
            <StatisticsChart />
        </div>
    </div>
  </div>
  </div>
</template>

<script>
import TaskOverview from '@/components/TaskOverview.vue';
import TodayTasks from '@/components/TodayTasks.vue';
import axios from 'axios';

export default {
    name: 'DashboardView',
    components: { TaskOverview, TodayTasks },
    data() {
        return {
            taskCount: 0, // Default task count
            
        };
    },
    mounted() {
        // Fetch task count
        axios
            .get('http://localhost:3000/api/tasks/today')
            .then((response) => {
                this.taskCount = response.data.taskCount; // Assign the fetched count
            })
            .catch((error) => {
                console.error('Error fetching task count:', error);
            });
    },
};
</script>
