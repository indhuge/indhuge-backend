export class AuthenticatedUserDTO<T> {
    id: string;
    username: string;
    scope: string;
    data : T;
}