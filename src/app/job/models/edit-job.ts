

export class EditJob {

  constructor(

    public vacancy: number,
    public startDate: Date,
    public completionDate: Date,
    public description: string,
    public wage: number,
    public version: string) {
  }
}
