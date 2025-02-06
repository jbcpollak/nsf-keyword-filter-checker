export const countWords = (text: string): number => {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
};

export const countLines = (text: string): number => {
  return text === "" ? 0 : text.split("\n").length;
};

export const highlightKeywords = (text: string, keywords: string[]): string => {
  let processedText = text;

  // Convert text to lowercase for case-insensitive comparison
  let lowerText = processedText.toLowerCase();

  keywords.forEach((keyword) => {
    // Create a regex that matches whole words only, case insensitive
    const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, "gi");

    // Find all matches to preserve original case
    let match;
    while ((match = regex.exec(lowerText)) !== null) {
      const originalCase = processedText.slice(
        match.index,
        match.index + keyword.length
      );
      processedText =
        processedText.slice(0, match.index) +
        `<span class="highlighted">${originalCase}</span>` +
        processedText.slice(match.index + keyword.length);

      // Update lowerText to maintain correct indices
      lowerText =
        lowerText.slice(0, match.index) +
        "x".repeat(`<span class="highlighted">${originalCase}</span>`.length) +
        lowerText.slice(match.index + keyword.length);

      // Update regex lastIndex to account for the HTML tags
      regex.lastIndex =
        match.index + `<span class="highlighted">${originalCase}</span>`.length;
    }
  });

  // Replace newlines with <br> tags for HTML display
  return processedText.replace(/\n/g, "<br>");
};
