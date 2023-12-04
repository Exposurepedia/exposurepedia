export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  date: string;
  password: string;
  verified: boolean;
  admin: boolean;
  status: string; // likely a union of literals, but the only value I've seen is "Approved"
  isProfessional: boolean;
  profession: string;
  degree: string;
  settings: string[];
  percentCaseload: number;
  difficulty: number;
  __v: number;
};
