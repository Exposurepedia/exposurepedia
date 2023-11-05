import { Disorder } from './disorders';
import { Format } from './formats';
import { InterventionType } from './interventionTypes';

export interface Exposure {
  __v: number;
  _id: string;
  name: string;
  isAdultAppropriate: boolean;
  isChildAppropriate: boolean;
  modifications?: string;
  link?: string;
  isLinkBroken: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  disorders: Disorder[];
  formats: Format[];
  interventionTypes: InterventionType[];
  keywords: string[];
  likes: string[];
}
