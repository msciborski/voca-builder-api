import { inject } from "inversify";
import { controller, BaseHttpController, httpGet, httpPost, requestBody} from "inversify-express-utils";
import { IUserService } from "../../domain/user/services/interfaces/IUserService";
import { UserCreateViewModel } from "../../domain/user/viewModels/UserCreateViewModel"
import USER_TYPES from "../../domain/user/types";


const userService = inject(USER_TYPES.IUserService)
@controller('/users')
export class UserController extends BaseHttpController {
    @userService private readonly _userService: IUserService;

    //TODO: EXCEPTION HANDLING - GLOBAL, RETURN DIFFERENT STATUS CODE BASE ON EXCEPTION
    @httpGet('/current')
    public async get()  {
        if (this.httpContext.user.isAuthenticated()) {
            const user = await this._userService.getUser(this.httpContext.user.details.id);
            return this.ok(user);
        } 
    }

    @httpPost('')
    public async createUser(@requestBody() userCreateViewModel: UserCreateViewModel) {
        if (this.httpContext.user.isAuthenticated()) {
            userCreateViewModel.id = this.httpContext.user.details.id;
            const userReadViewModel = await this._userService.addUser(userCreateViewModel);
            // Create DefaultMemoGroup for user

            return this.created('', userReadViewModel);
        }
    }

    // PUT ''
}

// export class UserController {
//   private logger;
//   private userService: IUserService;

//   constructor(logger, userService: IUserService) {
//     this.logger = logger;
//     this.userService = userService;
//   }
//   // public logger = logger(__filename);
  
//   public addUser = (req: Request, res: Response) => {
//     this.userService.addUser(req.body).then(user => {
//       res.send(user);
//     })
//     .catch(err => {
//       this.logger.error(err);
//       res.send(err);
//     })
//   }

//   public getUser = (req: Request, res: Response) => {
//     const { userId } = req.params;

//     this.userService.getUser(userId).then(user => {
//       res.send(user);
//     })
//     .catch(err => {
//       this.logger.error(err);
//       res.send(err);
//     })
//   }
// }