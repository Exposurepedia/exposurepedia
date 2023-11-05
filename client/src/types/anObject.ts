// this type should be used for generics that accept an object that don't have index signatures.
// eslint complains about using the object type but don't care about that since we aren't asserting for property existence within the object
// eslint-disable-next-line @typescript-eslint/ban-types
export type anObject = object;
