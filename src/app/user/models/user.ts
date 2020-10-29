export class User {

  constructor(
    public id: number,
    public email: string,
    public enabled: boolean,
    public name: string,
    public lastName: string,
    public phoneNumber: string,
    public version: string) {
  }
}
