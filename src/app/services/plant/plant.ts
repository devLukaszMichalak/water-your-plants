export class Plant {
  constructor(
    public name: string,
    public owner: string,
    public waterPerDay: number,
    public waterPerWeek: number,
    public image: string | null,
    public lastWatering: Date | null
  ) {}
}
