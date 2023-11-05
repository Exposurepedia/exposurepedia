export const embedYoutubeLink = (link?: string) => {
  const embedUrl = `https://www.youtube.com/embed/`;
  // Video id can be in different formats including
  // https://youtu.be/watch?v=pTSiQCYQuvA
  // https://youtube.com/watch?v=pTSiQCYQuvA
  if (link?.includes('watch?v=')) {
    return `${embedUrl}/${link.split('=').at(-1)}`;
  }
  // https://youtu.be/pTSiQCYQuvA
  return `${embedUrl}/${link?.split('/').at(-1)}`;
};
