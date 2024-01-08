import express = require('express');
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const postsId = parseInt(req.params.id, 10);
    const posts = await prisma.post.findUnique({ where: { id: postsId } });
    if (!posts) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json(posts);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { title, content, userId } = req.body;
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        userId
      },
    });
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create posts' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const postsId = parseInt(req.params.id, 10);
  const { title, content, userId } = req.body;
  try {
    const updatedPost = await prisma.post.update({
      where: { id: postsId },
      data: {
        title,
        content,
        userId
      },
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update posts' });
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const postsId = parseInt(req.params.id, 10);
  const { title, content } = req.body;
  try {
    const patchedPost = await prisma.post.update({
      where: { id: postsId },
      data: {
        title,
        content,
      },
    });
    res.json(patchedPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to patch posts' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const postsId = parseInt(req.params.id, 10);
  try {
    await prisma.post.delete({ where: { id: postsId } });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete posts' });
  }
});

router.get('/', async (req: Request, res: Response) => {
    try {
      const { title, content } = req.query;
  
      const posts = await prisma.post.findMany({
        where: {
          // Apply filters based on query parameters
          ...(title && { title: { contains: title.toString() } }),
          ...(content && { content: { contains: content.toString() } }),
        },
      });
  
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

export default router;
