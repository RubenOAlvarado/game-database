export const createParagraphs = (text: string): string[] => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const paragraphs: string[] = [];
    for (let i = 0; i < sentences.length; i++) {
        const paragraph = sentences
            .slice(i, i + 3)
            .join(' ')
            .trim();
        paragraphs.push(paragraph);
    }
    return paragraphs;
}