import { Download } from "@/modals"
import { FlashList } from "@shopify/flash-list"
import { DownloadIcon, EarOff, Headset, Video, VideoOff } from "lucide-react-native"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import DownloadButton from "./DownloadButton"

function DownloadSection({
  data
}: {
  data: Download[]
}) {
  return (
    <ScrollView className="w-full h-80 border dark:border-white p-2 rounded-3xl">
      <FlashList
        data={data}
        renderItem={({ item }) => <DownloadItem item={item}></DownloadItem>}
        estimatedItemSize={10}
      />
    </ScrollView>
  )
}

function DownloadItem({
  item
}: {
  item: Download
}) {
  return (
    <View className="h-20 bg-zinc-800 rounded-3xl mb-3 flex flex-row items-center justify-between gap-3 p-4">
      <Features item={item}/>
      <View className="flex flex-col">  
        { item.quality && <Text className="text-xl font-extrabold text-center dark:text-white">{item.quality}</Text> }
        <Text className="dark:text-white">{item.sizeMB.toFixed(1)} MB</Text>
      </View>
      <DownloadButton item={item}/>
    </View>
  )
}

function Features({
  item
}:{ 
  item: Download
}) {
  return(
    <View className="flex flex-row gap-2">
    <TouchableOpacity className="p-4 bg-zinc-600 rounded-3xl">
        {item.hasAudio ? (
          <Headset color="white" size={26} />
        ) : (
          <EarOff color="white" size={26} />
        )}
      </TouchableOpacity>

      <TouchableOpacity className="p-4 bg-zinc-600 rounded-3xl">
      {item.hasVideo ? (
        <Video color="white" size={26} />
      ) : (
        <VideoOff color="white" size={26} />
      )}
      </TouchableOpacity>
    </View>
  )
}

export default DownloadSection