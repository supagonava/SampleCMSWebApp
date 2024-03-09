import { Request } from 'express';

interface ExpressRequest extends Request {
    user?: { username: string; id: string };
    token?: string;
}
export { ExpressRequest };