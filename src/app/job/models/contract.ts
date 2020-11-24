import {Job} from './job';

export class Contract {

  constructor(
    public id: number,
    public version: string,
    public name: string,
    public job: Job,
) {
  }
}
