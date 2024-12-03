// backend/tasks.js
import express from 'express';
import db from './db.js';

const router = express.Router();

// Get the number of tasks due today
router.get('/tasks/today', (req, res) => {
  const query = `
    SELECT COUNT(*) AS taskCount
    FROM tasks
    WHERE DATE(due_date) = CURDATE() 
      AND due_date > NOW()
      AND (status = 'pas commencé' OR status = 'en cours')
  `;
  
  db.query(query, (err, results) => { 
    if (err) {
      console.error('Error fetching tasks due today:', err);
      return res.status(500).send('Server Error');
    }
    res.json({ taskCount: results[0].taskCount });
  });
}); 

// Get all tasks due today and order by priority, filter by status
router.get('/tasks', (req, res) => {
  const query = `
    SELECT * 
    FROM tasks
    WHERE DATE(due_date) = CURDATE() 
      AND due_date > NOW()
      AND (status = 'pas commencé' OR status = 'en cours')
    ORDER BY FIELD(priority, 'urgent', 'important', 'moins important')
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      return res.status(500).send('Server Error');
    }
    res.json(results); 
  });
});

//update the status of the task
router.put('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { status } = req.body;

  // Update the task in the database
  const query = 'UPDATE tasks SET status = ? WHERE id = ?';
  db.query(query, [status, taskId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database update failed' });
    }
    res.json({ message: 'Task updated successfully', id: taskId, status });
  });
});




export default router;
