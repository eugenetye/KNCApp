import { View, Text, ScrollView, Button, Pressable } from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-native-paper';
import { AVPlaybackStatus, Audio } from 'expo-av';

const _onPlaybackUpdate = (status: AVPlaybackStatus, setdur: any, setprog: any, setplay: any) => {
  console.log(status);

  if (status.isLoaded) {
    const dur = status.durationMillis
      ? status.durationMillis
      : 0;

    setplay(status.isPlaying);
    setprog(status.positionMillis);
    setdur(dur);
  } else {
    // There was an error...
  }
}

const Controls = ({ playing, onPlay, onPause }: { playing: Boolean, onPlay: any, onPause: any }) => {
  const [isPlaying, setIsPlaying] = useState(playing);
  return (
    <View>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Pressable onPress={onPlay}>
          <Ionicons
            name='play-circle'
            size={25}
            color={isPlaying ? "#C5DFC5" : "grey"}
          />
        </Pressable>
        <Pressable onPress={onPause}>
          <Ionicons
            name='pause-circle'
            size={25}
            color={(!isPlaying) ? "#C5DFC5" : "grey"}
          />
        </Pressable>
      </View>
    </View>
  );
};

const AudioPlayer = ({ file }: { file: string }) => {
  const [progress, setprog] = useState(0);
  const [duration, setdur] = useState(0);
  const [isPlaying, setplay] = useState(false);

  const playbackObject = new Audio.Sound();
  playbackObject.setOnPlaybackStatusUpdate(
    (s: AVPlaybackStatus) => {
      _onPlaybackUpdate(s, setdur, setprog, setplay);
    }
  );

  useEffect(() => {
    (async () => {
      try {
        await playbackObject.loadAsync({ uri: file });
        await playbackObject.playAsync();
      } catch (e) {
        console.log(`DUMB ERROR ${e}`);
      }
    })();
  }, []);

  return (
    <View>
      <View>
        <Controls
          playing={progress <= duration || isPlaying}
          onPlay={() => setplay(true)}
          onPause={() => setplay(false)}
        />
        <ProgressBar progress={progress} />
      </View>
    </View>
  );
};

export default AudioPlayer;
