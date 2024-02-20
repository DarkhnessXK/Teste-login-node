import express from 'express';
import { UserRepository } from '../domain/repositories/userRepository.js';

export const loginRouter = express.Router();
const userRepository = new UserRepository();


loginRouter.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userRepository.getOne(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

async function authenticateUser(headers) {
    console.log({headers: headers})
    let token = headers.authorization
    console.log({token: token})
    let user = await userRepository.getOne(token)
    console.log({user: user})
    return user
}

loginRouter.get('/home', async(req, res) => {
    let user = await authenticateUser(req.headers)
    if (!user) {
        res.status(401).json({ message: 'Acesso não autorizado: Login requerido' });
    } else {
        let body = {
            message: 'Acesso autorizado com sucesso!'
        }
        res.status(200).json(body);
    }
})


loginRouter.get('/user/', async (req, res) => {
    try {
        const users = await userRepository.getAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


loginRouter.post('/user', async (req, res) => {
    const newUser = req.body;
    try {
        await userRepository.save(newUser);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


loginRouter.post('/login-user', async (req, res) => {
    const data = req.body;
    try {
        let user = await userRepository.getOneByUsername(data.username);
        // let token = generateJWTToken(user)
        if (user.senha == data.senha) {
            res.status(200).json({ message: 'Login realizado com sucesso!', token: user.id });
        }

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


loginRouter.put('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const newData = req.body;
    try {
        const updated = await userRepository.update(userId, newData);
        if (updated) {
            res.json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


loginRouter.delete('/user/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const deleted = await userRepository.delete(userId);
        if (deleted) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
