export function clipText(text: string, numOfCharacters: number): string{
    if (text.length > numOfCharacters) return text.substring(0, numOfCharacters ) + "..."
    else return text
   
}