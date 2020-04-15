import { injectable } from "inversify";
import { interfaces } from "inversify-express-utils";
import { Request, Response, NextFunction} from "express";
import * as jwt from "jsonwebtoken";
import { UserPrincipal } from "./UserPrincipal";
import { config } from "../../../config.js";


@injectable()
export class Auth0AuthProvider implements interfaces.AuthProvider {
    getUser(req: Request, res: Response, next: NextFunction): Promise<interfaces.Principal> {
        const [type, token] = req.headers["authorization"].split (' ');
        const secret = config.authorization.secret;

        try {
            const x = jwt.verify(token, secret, {
                algorithms: ['HS256']
            });
            const data = {
                id: x.sub.split('|')[1]
            }
            return Promise.resolve(new UserPrincipal(data));

            
        } catch (err) {
            res.sendStatus(401);
        }
    }
}