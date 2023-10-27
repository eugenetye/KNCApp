import { Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as FileSystem from 'expo-file-system';
import { FIREBASE_STORAGE } from "../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

const CachedImage = (props : any) => {
    const {url, style} = props;
    const [cachedUri, setCachedUri] = useState<string | null>(null);

    useEffect(() => {
        Cached();
    }, [])

    const Cached = async () => {

        // Create a file path by concatenating 'FileSystem.cacheDirectory' and 'kncapp/'.
        const path = `${FileSystem.cacheDirectory}kncapp/`;

        // Ensure the cache directory exists
        await FileSystem.makeDirectoryAsync(path, { intermediates: true });

        // Check if the image is already cached
        const cachedImageInfo = await FileSystem.getInfoAsync(path + url);

        if (cachedImageInfo.exists) {
            setCachedUri(cachedImageInfo.uri);
          } 
        else {
            const reference = ref(FIREBASE_STORAGE, url); 

            try {
                const downloadURL = await getDownloadURL(reference);
      
                // Download the image and save it to the cache
                const downloadedImage = await FileSystem.downloadAsync(downloadURL, path + url);
                setCachedUri(downloadedImage.uri);

              } catch (error) {
                console.error('Error downloading and caching image:', error);
              }
          }
    }

    // Conditionally render the Image component
    return cachedUri ? (
        <Image style={style} source={{ uri: cachedUri }} />
    ) : null;
}

export default CachedImage;