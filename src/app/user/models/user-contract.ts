export class UserContract {
  constructor(
    public id: number,
    public email: string,
    public name: string,
    public lastName: string,
    public phoneNumber: string,
    public version: string) {
  }
}
