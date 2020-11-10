export class UserOwnPasswordEdit {
  constructor(
    public previousPassword: string,
    public  password: string,
    public rePassword: string,
    public version: string) {
  }
}
