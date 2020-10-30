import {Role} from './role';

export class User {

  public roles: Role[];

  constructor(
    public id: number,
    public email: string,
    public enabled: boolean,
    public name: string,
    public lastName: string,
    public phoneNumber: string,
    public version: string,
) {
  }
}
