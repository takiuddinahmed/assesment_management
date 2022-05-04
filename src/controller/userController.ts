import { Request, Response, NextFunction } from 'express';

class UserController {
    static register(req: Request, res: Response, next: NextFunction) {
        console.log(req.body);
        res.json({ msg: 'Hello World' });
    }
}

export default UserController;
