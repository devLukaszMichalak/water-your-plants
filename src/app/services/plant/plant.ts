export class Plant {
  constructor(
    public id: string | null,
    public name: string,
    public owner: string,
    public waterOnMonday: boolean,
    public waterOnTuesday: boolean,
    public waterOnWednesday: boolean,
    public waterOnThursday: boolean,
    public waterOnFriday: boolean,
    public waterOnSaturday: boolean,
    public waterOnSunday: boolean,
    public image: string | null,
  ) {}
}
