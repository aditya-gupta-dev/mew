export function isYoutubeUrl(link: string): boolean {
    try {
        new URL(link);
        if(link.includes('youtube') || link.includes('youtu.be')) {
            return true;
        }
        return false;
    } catch {
        return false;
    }
}