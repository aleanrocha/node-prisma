import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const server = express()
const prisma = new PrismaClient()

const port = 3001

server.use(express.json())
server.use(cors())

server.get('/', (_req, res) => {
  return res.status(200).json({ message: 'Hello World 🌎' })
})

// get all users
server.get('/users', async (_req, res) => {
  try {
    const users = await prisma.user.findMany()
    return res.status(200).json(users)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

// create new user
server.post('/users', async (req, res) => {
  try {
    const { email, name, job, gender } = req.body
    if ((!email, !name, !job, !gender)) {
      return res
        .status(400)
        .json({ message: 'Some required fields are missing.' })
    }
    const userData = {
      data: {
        email,
        name,
        job,
        gender,
      },
    }
    await prisma.user.create(userData)
    return res.status(201).json({ message: 'User created successfully' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

// update user by ID
server.put('/users/:id', async (req, res) => {
  try {
    const { email, name, job, gender } = req.body
    if ((!email, !name, !job, !gender)) {
      return res
        .status(400)
        .json({ message: 'Some required fields are missing.' })
    }
    const userData = {
      where: {
        id: req.params.id,
      },
      data: {
        email,
        name,
        job,
        gender,
      },
    }
    await prisma.user.update(userData)
    return res.status(201).json({ message: 'User updated successfully' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

// remove user by ID
server.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    await prisma.user.delete({ where: { id } })
    return res.status(200).json({ message: 'User removed successfully' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

server.listen(port, () => console.log('🚀 Server started on port ', port))
