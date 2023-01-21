/**
 * A file containing the api call to submit an exposure item.
 */
import { useData, postData, patchData } from '../../util/api';

/**
 * Update the exposure item with the given id.
 * @returns true if successful, false otherwise
 */
async function updateItem(
  exposureID: string,
  name: string,
  disorders: string[],
  formats: string[],
  interventionTypes: string[],
  isAdultAppropriate: boolean,
  isChildAppropriate: boolean,
  isLinkBroken: boolean,
  keywords: string[],
  modifications: string,
  link: string,
) {
  const res = await patchData(`exposure/${exposureID}`, {
    name,
    disorders,
    formats,
    interventionTypes,
    isAdultAppropriate,
    isChildAppropriate,
    isLinkBroken,
    keywords,
    modifications,
    link,
  });
  if (res.error) return false;
  return true;
}

// eslint-disable-next-line import/prefer-default-export
export { updateItem };
