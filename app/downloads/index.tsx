import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";
import * as Linking from "expo-linking";

function DownloadPage() {
  const { top } = useSafeAreaInsets();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    (async () => {
      const streams = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
      console.log(streams);
      setFiles(streams);
      
    })();
  }, []); 

  return (
    <ScrollView style={{ paddingTop: top }}>
     { files.map((file, i) => {
      return(
        <TouchableOpacity key={i} onPress={async () => {
           let p = FileSystem.documentDirectory+file;
           await Linking.openURL(p);
          }} className="p-4 bg-zinc-500 m-4">
          <Text>{file}</Text>
        </TouchableOpacity>
      )
     }) }
    </ScrollView>
  )
}

export default DownloadPage