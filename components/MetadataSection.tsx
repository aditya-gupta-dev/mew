import { Metadata } from '@/modals'
import { Link } from 'expo-router'
import React from 'react'
import { History } from 'lucide-react-native'
import { View, Text, Image, TouchableOpacity, Button, ScrollView } from 'react-native'

function MetadataSection({
  metadata
}: {
  metadata: Metadata
}) {
  return (
    <View className='flex flex-col gap-10'>
      <View className='flex flex-row  items-center gap-4'>
        <ScrollView horizontal className='p-4'>
          <Text className='dark:text-white text-black text-ellipsis text-3xl font-bold text-center' selectable>
            {metadata.title}
          </Text>
        </ScrollView>
        
        <Link href="/downloads" className='p-4 bg-zinc-800 rounded-3xl'>
          <History color="white" size={26}/>
        </Link>
      </View>

      <View>
        <Image
          source={{
            uri: metadata.thumbnail,
            width: 320,
            height: 240,
          }}
          resizeMode="cover"
          className='rounded-3xl border'
        />
        <TouchableOpacity className='absolute right-8 bottom-4 p-3 rounded-2xl opacity-70  bg-zinc-50'>
          <Text className='text-black'>Download</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MetadataSection