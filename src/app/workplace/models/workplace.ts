
export class Workplace {

  constructor(
    public id: number,
    public name: string,
    public description: string,
    public street: string,
    public city: string,
    public enabled: boolean,
    public averageRate: number,
    public version: string,
    public employerData: string,
    public employerPhone: string,
) {
  }
}
