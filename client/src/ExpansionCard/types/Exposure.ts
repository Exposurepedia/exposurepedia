export interface Exposure {
  name: string;
  disorders: string[];
  formats: string[];
  interventionTypes: string[];
  appropriateFor: 'child' | 'adult' | 'all';
  keywords: string[];
  modifications?: string;
  link?: string;
  updatedAt: string;
}
