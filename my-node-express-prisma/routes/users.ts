import express from 'express';
import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

router.get('/', async (req, res) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      console.log("test", response)
      throw new Error('Failed to fetch data');
    }
    const users = await response.json();
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const userData: Prisma.UserCreateInput = {
    name: '',
    username: '',
    email: '',
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    lat: '',
    lng: '',
    phone: '',
    website: '',
    companyName: '',
    catchPhrase: '',
    bs: ''
  };
  
  if (name) userData.name = name;
  if (email) userData.email = email;
  try {
    const newUser = await prisma.user.create({
      data: userData
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});


router.put('/:id', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const { name, email } = req.body;
  
  const userData: Prisma.UserUpdateInput = {};
  
  if (name) userData.name = name;
  if (email) userData.email = email;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: userData, // Pass the constructed object here
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const { name, email } = req.body;
  try {
    const patchedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
      },
    });
    res.json(patchedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to patch user' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  try {
    await prisma.user.delete({ where: { id: userId } });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

router.get('/', async (req: Request, res: Response) => {
    try {
      const { name, email } = req.query;
  
      const users = await prisma.user.findMany({
        where: {
          // Apply filters based on query parameters
          ...(name && { name: { contains: name.toString() } }),
          ...(email && { email: { contains: email.toString() } }),
        },
      });
  
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
});

export default router;
