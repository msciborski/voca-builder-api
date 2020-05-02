import { controller, BaseHttpController, httpPost, httpGet, requestParam, requestBody} from 'inversify-express-utils'
import { MemoGroupCreateViewModel } from '../../domain/memo/viewModels/memoGroup/MemoGroupCreateViewModel';
import { inject } from 'inversify';
import MEMO_TYPES from '../../domain/memo/types';
import USER_TYPES from '../../domain/user/types';
import { IMemoGroupService } from '../../domain/memo/services/interfaces/IMemoGroupService';
import { IUserService } from "../../domain/user/services/interfaces/IUserService";

const memoGroupService = inject(MEMO_TYPES.IMemoGroupService);
const userService = inject(USER_TYPES.IUserService);

@controller('/memogroups')
export class MemoGroupController extends BaseHttpController {
    @memoGroupService _memoGroupService: IMemoGroupService;
    @userService _userService: IUserService;

    @httpPost("/")
    public async addMemoGroup(@requestBody() memoGroupCreateViewModel: MemoGroupCreateViewModel) {
        if (this.httpContext.user.isAuthenticated()) {
            memoGroupCreateViewModel.ownerId = this.httpContext.user.details.id;
            
            const memoGroupReadViewModel = await this._memoGroupService.createMemoGroup(memoGroupCreateViewModel);
            const user = await this._userService.addMemoGroup({ 
                memoGroupId: memoGroupReadViewModel.id, 
                userId: memoGroupReadViewModel.ownerId 
            });

            return this.ok(user);
        }
    }

    @httpGet("/")
    public async getMemoGroups() {
        if (this.httpContext.user.isAuthenticated()) {
            const { userMemoGroups } = await this._userService.getUser(this.httpContext.user.details.id);

            const memoGroupsViewModel = await Promise.all(userMemoGroups.map(m => 
                this._memoGroupService.getMemoGroup(m.memoGroupId)));
            
            return this.ok(memoGroupsViewModel);
        }

    }

    @httpGet("/:id")
    public async getMemoGroupById(@requestParam("id") id: string) {
        if (this.httpContext.user.isAuthenticated()) {
            const memoGroupViewModel = await this._memoGroupService.getMemoGroup(id);

            return this.ok(memoGroupViewModel);
        }
    }
}
