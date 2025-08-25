import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /tasks - Get all tasks
router.get('/', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// GET /tasks/:id - Get a specific task
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await prisma.todo.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json(todo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
});

// POST /tasks - Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, color } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todo = await prisma.todo.create({
      data: {
        title: title.trim(),
        color: color || 'blue'
      }
    });
    
    res.status(201).json(todo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// PUT /tasks/:id - Update a task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed, color } = req.body;
    
    const existingTodo = await prisma.todo.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    const updateData: any = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description?.trim() || null;
    if (completed !== undefined) updateData.completed = Boolean(completed);
    if (color !== undefined) updateData.color = color;
    
    const todo = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: updateData
    });
    
    res.json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// DELETE /tasks/:id - Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const existingTodo = await prisma.todo.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    await prisma.todo.delete({
      where: { id: parseInt(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

export default router;
