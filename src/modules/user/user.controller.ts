import { NextFunction, Request, Response, Router } from 'express';
import Controller from '../../interfaces/controller.interface';
import ValidateDto from '../../utils/validate.dto';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import UserService from './user.service';

class UserController implements Controller {
    public router: Router = Router();
    public service: UserService;

    constructor() {
        this.initializeRoutes();
        this.service = new UserService();
    }

    public initializeRoutes() {
        this.router.post('/register', this.register);
        this.router.post('/login', this.login);
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data: RegisterDto = await ValidateDto<RegisterDto>(
                RegisterDto,
                req.body
            );
            await this.service.register(data);
            res.status(201);
        } catch (err) {
            console.log({ err });
            next(err);
        }
    };

    private login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const loginData: LoginDto = await ValidateDto<LoginDto>(
                LoginDto,
                req.body
            );
            const response = await this.service.login(loginData);
            res.send(response);
        } catch (error) {
            console.log({ error });
            next(error);
        }
    };
}

export default UserController;
