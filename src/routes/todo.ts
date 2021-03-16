import express from 'express';

import { verifyToken } from '../util/verifyToken';
import { Todo } from '../model/todo';

const todoRouter = express.Router();

todoRouter.post('/api/todo', verifyToken, async (req: any, res: any) => {
  const { title, description, date, status, user } = req.body;

  const todoExist = Boolean(await Todo.find({ userId: user._id, title }));

  if (todoExist) {
    res.status(400).json({ message: 'Tarefa já existente em nosso sistema' });
    return;
  }

  const finalDate = new Date(date);
  const finalStatus = status || null;

  try {
    const newTodo = Todo.build({
      userId: user._id,
      userName: user.userName,
      title,
      description,
      date: finalDate,
      status: finalStatus,
    });
    await newTodo.save();
    res.status(200).json(newTodo);
  } catch (e) {
    res.status(400).json(e);
  }
});

todoRouter.get('/api/todo', verifyToken, async (req, res) => {
  const { user } = req.body;
  try {
    const todos = await Todo.find({ userId: user._id });
    res.status(200).json(todos);
  } catch (e) {
    res.status(400).json(e);
  }
});

todoRouter.delete("/api/todo", verifyToken, async (req, res) => {
  const { user, title } = req.body;
  const deleteTodo = await Todo.deleteOne({ user: user._id, title });

  if (deleteTodo.deletedCount === 0) {
    res.status(404).json({ message: "Tarefa não encontrada" });
  } else {
    res.status(200).json({ ...deleteTodo, message: "Tarefa deletada" });
  }
});

todoRouter.put("/api/todo", async (req, res) => {
  const { title, newTitle, description, date, status, user } = req.body;
  const todoExist = await Todo.find({ userId: user._id, title });

  if (!Boolean(todoExist)) {
    res.status(404).json({ message: "Tarefa inexistente em nosso sistema" });
    return;
  }

  const finalDate = date ? new Date(date) : todoExist[0].data;
  const finalTitle = newTitle ? newTitle : title;
  const finalStatus = status ? status : todoExist[0].status;
  const finalDescription = description ? description : todoExist[0].description;

  try {
    const updateTodo = await Todo.findOneAndUpdate(
      { userId: user._id, title },
      {
        userId: user._id,
        userName: user.userName,
        title: finalTitle,
        description: finalDescription,
        date: finalDate,
        status: finalStatus,
      }
    );
    res.status(200).json(updateTodo);
  } catch (e) {
    res.status(400).json(e);
  }
});

export default todoRouter;
