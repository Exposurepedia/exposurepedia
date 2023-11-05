export interface Disorder {
  __v: number;
  _id: string;
  name: string;
  approved: boolean;
  parent: string;
  subdisorders: string[];
}
