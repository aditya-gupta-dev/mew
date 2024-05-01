export interface Download {
    type: string;
    quality: string | null;
    size: number;
    sizeKB: number;
    sizeMB: number;
    hasAudio: boolean;
    hasVideo: boolean;
};

export interface Metadata {
    title: string;
    views: string;
    thumbnail: string; 
};
