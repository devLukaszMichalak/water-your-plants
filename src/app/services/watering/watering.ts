export class Watering {
  constructor(
    public id: string | null,
    public plantName: string,
    public date: string,
    public wasWatered: boolean,
    public plantId: string,
  ) {}
}
