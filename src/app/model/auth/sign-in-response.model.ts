export class SignInResponse {
  constructor(
    public id: string,
    public username: string,
    public role: string,
    public tokenExpirationDate: string
  ) {
  }
}
