import { View, Text, Pressable } from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import React from 'react';
import { ProgressBar } from 'react-native-paper';
import { AVPlaybackStatus, Audio } from 'expo-av';

const _onPlaybackUpdate = (status: AVPlaybackStatus, setprog: any) => {
  if (status.isLoaded) {
    const prog = status.durationMillis
      ? status.positionMillis / status.durationMillis
      : 0;

    setprog(prog);
  } else {
    // There was an error...
  }
}

const Controls = ({ playing, onPlay, onPause }: { playing: Boolean, onPlay: () => void, onPause: () => void }) => {
  return (
    <View>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        {playing ? (
          // Show pause button when playing
          <Pressable onPress={onPause}>
            <Ionicons
              name='pause-circle'
              size={50}
              color={"gray"}
            />
          </Pressable>
        ) : (
          // Show play button when paused
          <Pressable onPress={onPlay}>
            <Ionicons
              name='play-circle'
              size={50}
              color={"#C5DFC5"}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

type AudioProps = {
  file: string
};
type AudioState = {
  playbackObj: Audio.Sound | null,
  isPlaying: Boolean,
  hasStarted: Boolean,
  progress: number,
  duration: number,
};


export class AudioPlayer extends React.Component<AudioProps, AudioState> {
  state: AudioState = {
    playbackObj: null,
    isPlaying: false,
    hasStarted: false,
    progress: 0,
    duration: 0,
  };

  async componentDidMount(): Promise<void> {
    const playbackObject = new Audio.Sound();
    playbackObject.setOnPlaybackStatusUpdate(
      (s: AVPlaybackStatus) => {
        _onPlaybackUpdate(
          s,
          (prog: number) => { this.setState({ progress: prog }); },
        );
      }
    );

    try {
      await playbackObject.loadAsync({ uri: this.props.file }, { shouldPlay: false });
    } catch (e) {
      console.log(`LOAD: ${e}`);
      throw e;
      return;
    }
    this.setState({
      playbackObj: playbackObject,
      isPlaying: false,
      hasStarted: true
    });
  }

  async componentDidUpdate(
    prevProps: Readonly<AudioProps>,
    prevState: Readonly<AudioState>,
    snapshot?: any
  ): Promise<void> {
    try {
      if (this.state.hasStarted && this.state.playbackObj) {
        if (prevState.isPlaying && !this.state.isPlaying) {
          await this.state.playbackObj.pauseAsync();
        } else if (!prevState.isPlaying && this.state.isPlaying) {
          await this.state.playbackObj.playAsync();
        }
      }
    } catch (e) {
      console.log(`PLAY/PAUSE: ${e}`);
    }
  }

  async componentWillUnmount(): Promise<void> {
      if (this.state.playbackObj) {
        await this.state.playbackObj.stopAsync();
        await this.state.playbackObj.unloadAsync();
      }
  }

  render(): React.ReactNode {
    return (
      <View style={{
        backgroundColor: "#F8F8F8",
        borderRadius: 8,
        padding: 15,
      }}>
        <Text style={{ padding: 3}}>Listen to the audio file here:</Text>
        <View style={{ height: 60, width: '100%'}}>
          <Controls
            playing={this.state.isPlaying}
            onPlay={() => { this.setState({ isPlaying: true }); }}
            onPause={() => { this.setState({ isPlaying: false }); }}
          />
        </View>
        <View>
          <ProgressBar progress={this.state.progress} />
        </View>
      </View>
    );
  }
}
