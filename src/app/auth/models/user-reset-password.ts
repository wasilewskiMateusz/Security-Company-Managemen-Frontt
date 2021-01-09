export class UserResetPassword {
  constructor(
    public password: string,
    public rePassword: string,
    public token: string,
  ) {
  }
}
