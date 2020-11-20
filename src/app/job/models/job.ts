import {Workplace} from '../../workplace/models/workplace';

export class Job {

  constructor(
    public id: number,
    public version: string,
    public vacancy: number,
    public startDate: Date,
    public completionDate: Date,
    public description: string,
    public enabled: boolean,
    public wage: number,
    public workplace: Workplace,
) {
  }
}
