// This type increases type safety when indexing objects.
// Makes all object values of type T | undefined. This means the developer is forced to check for undefined when accessing values from the record.

// 1) If you use Object.values() on a aDictionary then the resulting type will be Array<T | undefined>. To get around this, use a type assertion - Object.values(dict) as T[]
export type aDictionary<K extends string, T> = {
  [P in K]?: T;
};
