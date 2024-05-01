import { getDownloadData } from '@/helpers/fetches';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { View, Text } from 'react-native';
import * as Clipboard from "expo-clipboard";
import { isYoutubeUrl } from '@/helpers/utils';

async function downloadQueryFunction() {
    let text = await Clipboard.getStringAsync();
    if (isYoutubeUrl(text)) {
        return await getDownloadData(text);
    } else {
        throw new Error("the text is not a valid youtube url");
    }
}

function HomePage() {
    const downloadQuery = useQuery({
        queryKey: ['download'],
        queryFn: downloadQueryFunction
    });

    return (
        <View className='flex flex-1 p-4'>
            {downloadQuery.isLoading && (
                <Text className='text-center'>Loading...</Text>
            )}

            {downloadQuery.data && (
                downloadQuery.data.map((data) => {
                    return (
                        <Text className='text-center'>{`${data.quality} : ${data.hasAudio} : ${data.hasVideo}`}</Text>
                    )
                })
            )}

            {downloadQuery.error && (
                <Text className='text-center'>Error...</Text>
            )}

        </View>
    )
}

export default HomePage