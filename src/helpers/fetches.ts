import { config } from "@/config";
import { Download } from "@/modals";
import axios from "axios";

export async function getDownloadData(link: string): Promise<Download[] | null> {
    try {
        const response = await axios.get(`${config.rootUrl}/download`, { 
            headers: {
                'url': link
            }
        });

        if (response.status > 340) {
            return null;
        } else {
            return response.data as Download[];
        }
    } catch {
        return null;
    }
}