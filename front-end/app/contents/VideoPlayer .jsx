import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Video } from 'expo-av';

const VideoPlayer = ({ visible, onClose, videoSource, onCompletion, progress }) => {
  const [isReady, setIsReady] = useState(false);

  if (!visible) return null;

  const handlePlaybackStatusUpdate = status => {
    if (status.didJustFinish && !status.isLooping) {
      onCompletion();  
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>{progress}</Text>
      <Video
        source={videoSource}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        isLooping={false}
        shouldPlay
        onLoad={() => setIsReady(true)}
        onError={(error) => {
          console.error("Video failed to load", error);
          setIsReady(true);
        }}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />
      {!isReady && (
        <ActivityIndicator
          size="large"
          color="#ffffff"
          style={styles.loadingIndicator}
        />
      )}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <AntDesign name="closecircle" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  video: {
    width: '100%',
    height: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  loadingIndicator: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default VideoPlayer;
