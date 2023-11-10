import { Image, View } from 'react-native'
import React, { forwardRef, useEffect, useState } from 'react'
import * as FileSystem from 'expo-file-system';
import { FIREBASE_STORAGE } from "../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import { GestureHandlerRootView, PinchGestureHandler, State } from 'react-native-gesture-handler';

const CachedImage = (props : any) => {
    const {url, style} = props;
    const [cachedUri, setCachedUri] = useState<string | any>(null);

    useEffect(() => {
        Cached();
    }, [])

    const Cached = async () => {
        // Create a file path by concatenating 'FileSystem.cacheDirectory' and 'kncapp/'.
        const path = FileSystem.cacheDirectory + 'kncapp/';

        const category = url.split('/')[1];

        // Ensure the cache directory exists
        await FileSystem.makeDirectoryAsync(path + category + '/', { intermediates: true });

        // Check if the image is already cached
        const cachedImageInfo = await FileSystem.getInfoAsync(`${FileSystem.cacheDirectory}kncapp` + url);

        if (cachedImageInfo.exists) {
            setCachedUri(cachedImageInfo.uri);
            console.log("cached image:",cachedImageInfo.uri)
          } 
        else {
            const reference = ref(FIREBASE_STORAGE, url); 

            try {
                const downloadURL = await getDownloadURL(reference);
                console.log("download url:", downloadURL);
      
                // Download the image and save it to the cache
                const downloadedImage = await FileSystem.downloadAsync(downloadURL, `${FileSystem.cacheDirectory}kncapp` + url);
                setCachedUri(downloadedImage.uri);

              } catch (error) {
                console.error('Error downloading and caching image:', error);
              }
          } 
    }

    

    return (
      <Image source={{ uri: cachedUri }} style={style}/>
    )
}

export default CachedImage;

