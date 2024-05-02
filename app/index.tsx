import { getDownloadData, getMetadata } from '@/helpers/fetches';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import * as Clipboard from "expo-clipboard";
import { isYoutubeUrl } from '@/helpers/utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { History, LoaderCircle } from 'lucide-react-native';
import MetadataSection from '@/components/MetadataSection';
import DownloadSection from '@/components/DownloadSection';
import { Link } from 'expo-router';

function HomePage() {

    const { top } = useSafeAreaInsets();

    const downloadQuery = useQuery({
        queryKey: ['download'],
        queryFn: async () => {
            let text = await Clipboard.getStringAsync();
            if (!isYoutubeUrl(text)) {
                throw new Error("the text you copied, is not a valid youtube url.");
            } else {
                return await getDownloadData(text);
            }
        }
    });

    const metadataQuery = useQuery({
        queryKey: ['metadata'],
        queryFn: async () => {
            let text = await Clipboard.getStringAsync();
            if (!isYoutubeUrl(text)) {
                throw new Error("the text you copied, is not a valid youtube url.");
            } else {
                return await getMetadata(text);
            }
        }
    });

    return (
        <View className='flex flex-1 p-4 gap-4 dark:bg-black' style={{ paddingTop: top }}>
            
            {downloadQuery.isLoading || metadataQuery.isLoading && (
                <LoadingWithTimer />
            )}

            {downloadQuery.data && metadataQuery.data && (
                <>
                    <MetadataSection metadata={metadataQuery.data} />
                    <DownloadSection data={downloadQuery.data} />
                </>
            )}

            {downloadQuery.error && (
                <ErrorComponent error={downloadQuery.error} />
            )}

        </View>
    )
}

const LoadingWithTimer = () => {
    const [counter, setCounter] = useState(0.0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prevCounter => prevCounter + 0.1);
        }, 100);

        return () => clearInterval(interval);
    }, []);


    return (
        <View className='flex flex-1 items-center justify-center'>
            <View className='animate-spin'>
                <LoaderCircle color='white' size={44} />
            </View>
            <Text className='text-center dark:text-white'>{counter.toFixed(2)} s</Text>
        </View>
    );
};

const ErrorComponent = ({ error }: { error: Error }) => {
    return (
        <View className='flex flex-1 justify-center items-center'>
            <Text className='text-center text-red-500 text-5xl font-extrabold'>Error!</Text>
            <Text className='dark:text-white'>Cause: {error.message}</Text>

            <View className='flex flex-col mt-14 gap-2'>
                <Text className='text-4xl text-black text-center dark:text-white'>How to use?</Text>
                <Text className='text-ellipsis text-center dark:text-white'>
                    Copy the share link the of youtube video
                    then leave the rest to the app, it will read
                    the clipboard and prepare the download links for you.
                </Text>
            </View>
        </View>
    )
}

export default HomePage;