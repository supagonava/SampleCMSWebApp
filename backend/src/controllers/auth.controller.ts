import '../types/custom.d.ts';

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

class AuthController {
    public async login(req: Request, res: Response) {
        const user = { id: 1, username: 'user', email: 'user@example.com' };

        // Sign JWT token
        const token = jwt.sign({ user }, `${process.env.JWT_SECRET || 'development'}`, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    }

    public async verifyToken(req: Request, res: Response, next: Function) { }
}

export default new AuthController();
