import React, {useEffect, useRef, useState} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CachedImage from '../components/CachedImage';

export const Trail_Map = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <CachedImage url={'/trails/trail_map.jpeg'} style={styles.image} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
});

