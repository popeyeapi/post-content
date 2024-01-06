import express from 'express';
import usersRouter from '../routes/users';
import postsRouter from '../routes/posts';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Use route modules
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error('Failed to start server:', error);
  }
});
