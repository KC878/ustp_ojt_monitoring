export const toSmartTitleCase = (str) => {
  const lowerWords = ['a', 'an', 'and', 'the', 'in', 'on', 'at', 'for', 'of', 'to', 'with', 'by', 'from', 'as'];
  
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index, array) => {
      if (index === 0 || index === array.length - 1 || !lowerWords.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word;
      }
    })
    .join(' ');
}
