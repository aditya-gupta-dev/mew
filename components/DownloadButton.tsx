import { Download } from "@/modals"
import { Download as DownloadIcon } from "lucide-react-native"
import { TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import * as Progress from "react-native-progress";

function DownloadButton({
    item
}: {
    item: Download
}) {

    const [isLoading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [resumable, setResumable] = useState<FileSystem.DownloadResumable>();

    const onButtonPress = async () => {
        setLoading(true);
        await resumable.downloadAsync();
    }

    useEffect(() => {
        const callback = downloadProgress => {
            const prog = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
            setProgress(prog);
        };
          

        const path = FileSystem.documentDirectory + "wow.mp3";
        const downloadResumable = FileSystem.createDownloadResumable(
            item.url,
            path,
            { },
            callback
            );
        setResumable(downloadResumable);
    }, []);

  return (
    <TouchableOpacity className="p-4 bg-zinc-600 rounded-3xl" onPress={onButtonPress}>
        { isLoading ? (
            <Progress.Circle 
                color="white"
                progress={progress}
                thickness={1.5}
                size={26}
                strokeCap="round"
                showsText
                textStyle={{
                    fontSize: 10,
                    fontWeight: "bold" 
                }}
            />
        ) : (
            <DownloadIcon color="white" size={26}/>
        ) }
    </TouchableOpacity>
  )
}

export default DownloadButton