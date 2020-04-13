import { injectable } from "inversify";
import { interfaces } from "inversify-express-utils";
import { Request, Response, NextFunction} from "express";
import * as jwksRsa from "jwks-rsa";

@injectable()
export class Auth0AuthProvider implements interfaces.AuthProvider {
    getUser(req: Request, res: Response, next: NextFunction): Promise<interfaces.Principal> {
        const token = req.headers["authorization"];
        const secret = 'gMzXa5gp8nHHGrXCfICouyhce7xOn37-9BDQShhuRly8hTUoZGqaEVB5qEd0LFem'
        console.log(token);
        return null;
    }

}

  // private configureAuth(): void {
  //   const checkJwt = jwt({
  //     secret: jwksRsa.expressJwtSecret({
  //       cache: true,
  //       rateLimit: true,
  //       jwksRequestsPerMinute: 5,
  //       jwksUri: config.authorization.jwksUri,
  //     }),
  //     audience: config.authorization.audience,
  //     issuer: config.authorization.issuer,
  //     algorithms: ['RS256']
  //   })

  //   this.app.use(checkJwt);
  // }