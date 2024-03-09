import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { Response } from 'express';
import { getRepository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { ExpressRequest } from '../interfaces/request.interface';

class AuthController {
    public async signin(req: ExpressRequest, res: Response) {
        try {
            const { username, password } = req.body;

            const UserRepository = getRepository(UserEntity);
            const existUser = await UserRepository.findOneBy({ username: username });
            if (existUser) {
                const checkedPassword = await bcrypt.compare(password, existUser.password);
                if (checkedPassword) {
                    const userObjectData = { username: existUser.username, id: existUser.id };

                    const expiresIn = 3600; // 1 hour in seconds
                    const token = jwt.sign(userObjectData, `${process.env.JWT_SECRET || 'development'}`, { expiresIn: expiresIn });
                    const expirationTime = Math.floor(Date.now() / 1000) + expiresIn;

                    return res.status(200).json({
                        message: 'Logged in successfully',
                        access_token: { token, expires_at: expirationTime },
                        user: userObjectData
                    });
                }
            }
            return res.status(401).json({ message: 'Username or password incorrect!' });
        } catch (error) {
            return res.status(500).json({ message: `Error ${error}` });
        }
    }

    public async me(req: ExpressRequest, res: Response) {
        return res.json({ user: req?.user });
    }

    public async refresh(req: ExpressRequest, res: Response) {
        const token = req?.token;

        if (!token) {
            return res.status(401).json({ message: 'Token is required!' });
        }

        try {
            // Verify the token, but ignore expiration
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'development', { ignoreExpiration: true });
            const { username, id } = JSON.parse(JSON.stringify(decoded));

            const expiresIn = 3600;
            const newAccessToken = jwt.sign({ username: username, id: id }, `${process.env.JWT_SECRET || 'development'}`, { expiresIn: expiresIn });
            const expirationTime = Math.floor(Date.now() / 1000) + expiresIn;

            return res.status(200).json({
                message: 'Access Token refreshed successfully',
                access_token: newAccessToken,
                expirationTime
            });
        } catch (error) {
            // Handle invalid token cases
            return res.status(403).json({ message: 'Invalid Token' });
        }
    }
}

export default AuthController;
