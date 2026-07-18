export const parseMarkdown = async (content: string): Promise<string> => {
  return content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\[(.*?)\]\([^\)]+\)/g, '$1')
    .replace(/[#>*_-]+/g, '')
    .replace(/\n{2,}/g, '\n')
    .trim();
};
