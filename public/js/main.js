document.addEventListener('DOMContentLoaded', function() {
  // Add task
  document.getElementById('saveTaskBtn').addEventListener('click', function() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;
    const priority = document.getElementById('priority').value;

    if (!title) {
      alert('Title is required');
      return;
    }

    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, status, priority })
    })
    .then(response => response.json())
    .then(data => {
      if (data.id) {
        $('#addTaskModal').modal('hide');
        window.location.reload();
      } else {
        alert('Failed to create task');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while creating the task');
    });
  });

  // Edit task - Load task data into modal
  const editButtons = document.querySelectorAll('.edit-task');
  editButtons.forEach(button => {
    button.addEventListener('click', function() {
      const taskId = this.getAttribute('data-id');
      
      fetch(`/api/tasks/${taskId}`)
      .then(response => response.json())
      .then(task => {
        document.getElementById('editTaskId').value = task.id;
        document.getElementById('editTitle').value = task.title;
        document.getElementById('editDescription').value = task.description || '';
        document.getElementById('editStatus').value = task.status;
        document.getElementById('editPriority').value = task.priority;
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to load task data');
      });
    });
  });

  // Update task
  document.getElementById('updateTaskBtn').addEventListener('click', function() {
    const taskId = document.getElementById('editTaskId').value;
    const title = document.getElementById('editTitle').value;
    const description = document.getElementById('editDescription').value;
    const status = document.getElementById('editStatus').value;
    const priority = document.getElementById('editPriority').value;

    if (!title) {
      alert('Title is required');
      return;
    }

    fetch(`/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, status, priority })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Task updated successfully') {
        $('#editTaskModal').modal('hide');
        window.location.reload();
      } else {
        alert('Failed to update task');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while updating the task');
    });
  });

  // Delete task - Show confirmation modal
  let deleteTaskId = null;
  const deleteButtons = document.querySelectorAll('.delete-task');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
      deleteTaskId = this.getAttribute('data-id');
      $('#deleteTaskModal').modal('show');
    });
  });

  // Confirm delete task
  document.getElementById('confirmDeleteBtn').addEventListener('click', function() {
    if (!deleteTaskId) return;

    fetch(`/api/tasks/${deleteTaskId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Task deleted successfully') {
        $('#deleteTaskModal').modal('hide');
        window.location.reload();
      } else {
        alert('Failed to delete task');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while deleting the task');
    });
  });
});