import {Workplace} from '../../workplace/models/workplace';

export class CreateJob {

  constructor(

    public vacancy: number,
    public startDate: Date,
    public completionDate: Date,
    public description: string,
    public wage: number,
    public workplaceId: number,
) {
  }
}
