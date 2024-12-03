<!-- DeleteTask.vue -->
<template>
  <div class="modal" tabindex="-1" aria-labelledby="deleteTaskModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteTaskModalLabel">Supprimer la tâche</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Êtes-vous sûr de vouloir supprimer cette tâche ?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
          <button type="button" class="btn btn-danger" @click="deleteTask">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteTask',
  props: {
    task: Object,
  },
  methods: {
    deleteTask() {
      // Delete the task from the backend (You could call an API here)
      this.$emit('delete-task', this.task); // Emit event to parent component
      // Close the modal (Bootstrap modal close can be triggered via JS or Vue method)
      const modal = bootstrap.Modal.getInstance(document.getElementById('deleteTaskModal'));
      modal.hide();
    },
  },
};
</script>
