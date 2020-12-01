import {Job} from './job';
import {UserContract} from '../../user/models/user-contract';

export class Contract {

  constructor(
    public id: number,
    public version: string,
    public status: string,
    public job: Job,
    public user: UserContract,
) {
  }
}
