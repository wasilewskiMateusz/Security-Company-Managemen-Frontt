import {Job} from './job';
import {UserContract} from '../../user/models/user-contract';

export class Contract {

  constructor(
    public id: number,
    public version: string,
    public name: string,
    public job: Job,
    public user: UserContract,
) {
  }
}
