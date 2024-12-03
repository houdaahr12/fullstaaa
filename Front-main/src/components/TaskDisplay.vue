<template>
  <div
    class="task-display d-flex justify-content-between align-items-center"
    :style="getPriorityStyle(task.priority)"
  >
    <div class="d-flex align-items-center">
      <!-- Custom Checkbox -->
      <label class="custom-checkbox">
        <input type="checkbox" class="task-checkbox" />
        <span class="checkmark"></span>
      </label>
      <div>
        <p class="task-name mb-0">{{ task?.task_name || 'Nom de la tâche non disponible' }}</p>
        <small class="task-date">
          {{ formatTaskDate(task.due_date) }}
        </small>
      </div>
    </div>
    <div class="d-flex align-items-center">
      <!-- Tooltip Icon -->
      <div class="position-relative tooltip-container">
        <i class="fa fa-info-circle task-tooltip-icon"></i>
        <div class="tooltip-content">
          <p><strong>Priorité:</strong> {{ task?.priority || 'Non spécifiée' }}</p>
          <p><strong>Catégorie:</strong> {{ task?.category || 'Non spécifiée' }}</p>
        </div>
      </div>
      <!-- Dropdown Menu -->
      <div class="dropdown ms-3">
        <i
          class="fa fa-ellipsis-v task-options"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        ></i>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li>
            <a class="dropdown-item" href="#" @click="handleEditClick">
              <i class="fa fa-pencil-alt me-2"></i> Modifier
            </a>
          </li>
          <li>
            <a class="dropdown-item text-danger" href="#" @click="handleDeleteClick">
              <i class="fa fa-trash me-2"></i> Supprimer
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: 'TaskDisplay',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  
  methods: {
  formatTaskDate(date) {
    if (!date) return '';

    const taskDate = new Date(date);
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = taskDate.toLocaleDateString('fr-FR', optionsDate);

    const optionsTime = { hour: '2-digit', minute: '2-digit' };
    const formattedTime = taskDate.toLocaleTimeString('fr-FR', optionsTime);

    return formattedTime !== '00:00'
      ? `${formattedDate}, ${formattedTime}`
      : formattedDate;
  },
  getPriorityStyle(priority) {
    let shadowColor;

    switch (priority?.toLowerCase()) {
      case 'urgent':
        shadowColor = 'rgba(255, 0, 0, 0.5)'; // Red
        break;
      case 'important':
        shadowColor = 'rgba(0, 128, 0, 0.5)'; // Green
        break;
      case 'moins important':
        shadowColor = 'rgba(255, 165, 0, 0.5)'; // Orange
        break;
      default:
        shadowColor = 'rgba(128, 128, 128, 0.5)'; // Gray for default
    }

    return {
      boxShadow: `0px 4px 8px ${shadowColor}`,
    };
  },
  handleCheckboxChange() {
      // Emit the updated status to the parent component
      this.$emit('update-task-status', {
        id: this.task.id,
        status: this.isChecked ? 'termine' : 'pas commence', // Update status based on checkbox
      });
    },
  },
};



</script>


<style scoped>
/* Task Display */
.task-display {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.8rem;
  margin-bottom: 1rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.task-display:hover {
  transform: translateY(-3px);
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
}

/* Custom Checkbox */
.custom-checkbox {
  position: relative;
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.8rem;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.custom-checkbox .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #f2f2f2;
  border: 2px solid #491784;
  border-radius: 50%; /* Makes it rounded */
  transition: background-color 0.2s ease, transform 0.2s ease;
}

/* Checked State */
.custom-checkbox input:checked ~ .checkmark {
  background-color: #491784;
  border-color: #491784;
  transform: scale(0.9);
}

/* Improved Checkmark */
.custom-checkbox .checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.custom-checkbox .checkmark:after {
  width: 0.5rem;
  height: 0.8rem;
  border: solid white;
  border-width: 0 2px 2px 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  border-radius: 2px; /* Optional to make the edges of the checkmark slightly rounded */
}
/* Three Dots Icon */
.task-options {
  font-size: 1.4rem;
  color: #491784;
  cursor: pointer;
}

/* Dropdown Menu */
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  bottom: -5px; /* Adjust the distance from the bottom */
  right: 0px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 0.9rem;
}

.dropdown-item {
  padding: 0.4rem 1rem;
  color: #491784;   
  transition: transform 0.2s ease;
}

.dropdown-item:hover {
  color: #491784;
  background-color: hsl(268, 70%, 90%);
  transform: translateY(-3px) scale(1.05);
}

.dropdown-item.text-danger {
  color: #e63946;
}

.dropdown-item.text-danger:hover {
  background-color: rgba(230, 57, 70, 0.1);
  color: #e63847;
}

/* Tooltip Container */
.tooltip-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.tooltip-content {
  display: none;
  position: absolute;
  top: -50px;
  transform: translateX(-50%);
  background: rgba(73, 23, 132, 0.9);
  color: white;
  padding: 0.2rem;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  z-index: 10;
  font-size: 0.7rem;
}

/* Show Tooltip on Hover */
.tooltip-container:hover .tooltip-content {
  display: block;
}

/* Tooltip Icon */
.task-tooltip-icon {
  font-size: 1.2rem;
  color: #491784;
  transition: color 0.2s ease;
}

.task-tooltip-icon:hover {
  color: hsl(268, 70%, 60%);
}


/* Priority Colors */
.priority-border-urgent::before {
  background-color: red;
}

.priority-border-important::before {
  background-color: green;
}

.priority-border-low::before {
  background-color: orange;
}

.priority-border-default::before {
  background-color: gray; /* Default color if priority is missing */
}


/* Base Task Display Styles */
.task-display {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.8rem;
  margin-bottom: 1rem;
  background: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
}

.task-display:hover {
  transform: translateY(-3px);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2); /* Subtle shadow on hover */
}

/* Other Styles (unchanged from your code) */
.custom-checkbox {
  position: relative;
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.8rem;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.custom-checkbox .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #f2f2f2;
  border: 2px solid #491784;
  border-radius: 50%;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

/* Checked State */
.custom-checkbox input:checked ~ .checkmark {
  background-color: #491784;
  border-color: #491784;
  transform: scale(0.9);
}

.custom-checkbox .checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.custom-checkbox .checkmark:after {
  width: 0.5rem;
  height: 0.8rem;
  border: solid white;
  border-width: 0 2px 2px 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  border-radius: 2px;
}
</style>

