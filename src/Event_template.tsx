import {
  ScrollView,
  Text,
  View,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_STORAGE } from "../firebaseConfig";
import { ref, listAll } from "firebase/storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CachedImage } from "../components/CachedImage";
import Carousel from "react-native-snap-carousel";
import { Linking } from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1, // this will make the container expand to fill available space
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    justifyContent: "flex-start", // changed from 'center' to 'flex-start' to align children to the top
    marginTop: 60, // adjust this value to shift the container down under the back arrow
  },

  itemImg: {
    width: width * 0.7, // 80% of screen width
    height: height * 0.3, // 30% of screen height
    borderRadius: 8, // Added rounding to images
  },

  itemTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10, // Space between the image and title
  },

  itemTitle2: {
    fontSize: 17, // You can customize these values
    fontWeight: "bold",
    color: "#333333", // Example color
    marginTop: 5, // Adjust spacing as needed
    textAlign: "center", // Customize alignment
    // Add other styling properties as needed
  },

  itemBody: {
    fontSize: 15,
    lineHeight: 20,
    marginTop: 10, // Space between the title and body
    textAlign: "center", // Center the text if it's a short sentence
  },

  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8", // or any other background color you prefer
  },

  scrollView: {
    flex: 1,
  },

  viewContainer: {
    flex: 1,
  },

  backButton: {
    position: "absolute",
    top: 10, // safe distance from the top edge
    left: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    zIndex: 1,
  },
});

const button = StyleSheet.create({
  header: {
    alignItems: 'flex-start',
  },
  image: {
    marginTop: -20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#046339',
    borderRadius: 15,
    padding: 10,
    height: 50,
    width: "100%",
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Questrial-Regular',
  },
  headertext: {
    fontFamily: 'Questrial-Regular',
    fontSize: 40,
    padding: 15,
  }
});

export type RootStackParamList = {
  Past: { param?: any } | undefined;
  Current: { param?: any } | undefined;
  Event_template: { param?: any } | undefined;
  Event_item: { param?: any } | undefined;
};

const TextAndPicture = (route: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const item = route.params.param;

  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const folderRef = ref(FIREBASE_STORAGE, item.type + "/fire_story"); // Assuming item.type is the folder name

      const listResult = await listAll(folderRef);

      const imageArray = await Promise.all(
        listResult.items.map((obj, i) => {
          return {
            //title: imageRef.name,
            body: item.bio[i], // Existing description
            imgUrl: obj.fullPath,
            header1: item.header1[i], // Assuming these are arrays and have the same length as bio
            header2: item.header2[i],
          };
        })
      ); 

      setImages(imageArray);
    };

    fetchImages();
  }, []);

  const { width: screenWidth } = Dimensions.get("window");
  const sliderWidth = screenWidth;
  const itemWidth = screenWidth * 0.8;

  interface YourItemType {
    imgUrl: string;
    title: string;
    body: string;
    header1: string;
    header2: string;
  }

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <CachedImage url={'/' + item.imgUrl} style={styles.itemImg} />

      <Text style={styles.itemTitle}>{item.header1}</Text>
      <Text style={styles.itemTitle2}>{item.header2}</Text>
      <Text style={styles.itemBody}>{item.body}</Text>
    </View>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 relative">
      <ScrollView className="flex-1 px-4 py-6">
        <View className="relative">
          {/* Back button with higher zIndex */}

          <View
            className="absolute flex-row inset-x-0 justify-between"
            style={{ zIndex: 1 }}
          >
            <Pressable
              onPress={() => navigation.goBack()}
              className="w-10 h-10 rounded-md items-center justify-center bg-white"
            >
              <Ionicons size={24} name="arrow-back" />
            </Pressable>
          </View>

          {/* Picture or Carousel */}

          <Carousel
            layout="default"
            data={images}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={width * 0.8}
            vertical={false}
          />
          <Pressable 
            style={button.button} 
            className='mt-10 mb-11' 
            onPress={() => {
              Linking.openURL('https://storymaps.com/stories/09ed079e0c49449fa0f363f0d87b052c')
                .catch(err => console.error('An error occurred', err));
            }}
          >
            <Text style={button.text}>Access the Story Map Here</Text>
          </Pressable>
          <View style={{ height: 80 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Event_template = ({ route }: any) => {
  const item = route.params.param;

  return (
    <TextAndPicture {...route} />
  );
};

export default Event_template;
