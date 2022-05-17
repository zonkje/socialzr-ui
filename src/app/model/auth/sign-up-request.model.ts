export class SignUpRequest{

  constructor(
    public username: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public avatarUrl: string,
    public contactInformationId?: number) {}

}
