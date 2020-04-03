export interface ILoyalty {
  id?: number;
  type?: string;
}

export class Loyalty implements ILoyalty {
  constructor(public id?: number, public type?: string) {}
}
