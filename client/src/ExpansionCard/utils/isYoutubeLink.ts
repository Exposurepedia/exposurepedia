// This function is hacky and only account for all KNOWN possibilities from youtube.

export const isYoutubeLink = (link?: string) => {
  // Youtube has more than one domain name for its urls
  return link?.includes('youtube') || link?.includes('youtu.be');
};
