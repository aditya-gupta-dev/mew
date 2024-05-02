import { config } from "@/config";
import { Download, Metadata } from "@/modals";
import axios from "axios";

export async function getDownloadData(link: string): Promise<Download[]> {
    try {
        const response = await axios.get(`${config.rootUrl}/download`, { 
            headers: {
                'url': link
            }
        });

        if (response.status > 340) {
            console.log(response.status);
            
            throw new Error("Unexpected error occured");
        } else {
            return response.data as Download[];
        }
    } catch {
        throw new Error("Check your network connection.");
    }
}

export async function getMetadata(link: string): Promise<Metadata> {
    try {
        const response = await axios.get(`${config.rootUrl}/metadata`, {
            headers: {
                'url': link
            }
        })

        if(response.status > 240) {
            throw new Error("Unexpected error occured");
        } else {
            return response.data as Metadata;
        }
    } catch {
        throw new Error("Check your network connection.");
    }
}