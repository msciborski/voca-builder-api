import { interfaces } from "inversify-express-utils";

export class UserPrincipal implements interfaces.Principal {
    details: any;

    public constructor(details: any) {
        this.details = details;
    }

    isAuthenticated(): Promise<boolean> {
        return Promise.resolve(true);
    }
    isResourceOwner(resourceId: any): Promise<boolean> {
        return Promise.resolve(true);
    }
    isInRole(role: string): Promise<boolean> {
        return Promise.resolve(true);
    }

}