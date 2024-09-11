import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
 

const { width } = Dimensions.get('window');

const chapters = [
  { id: '1', title: 'Chapter 1', videoSource: require('../../assets/videos/chapter1.mp4') },
  { id: '2', title: 'Chapter 2', videoSource: require('../../assets/videos/chapter2.mp4') },
  { id: '3', title: 'Chapter 3', videoSource: require('../../assets/videos/chapter3.mp4') },
  { id: '4', title: 'Chapter 4', videoSource: require('../../assets/videos/chapter4.mp4') },
  { id: '5', title: 'Chapter 5', videoSource: require('../../assets/videos/chapter5.mp4') },
];

export default function VideoPlayerScreen() {
  const [videoVisible, setVideoVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [isCompletionAlertVisible, setIsCompletionAlertVisible] = useState(false);
  const [completedChapters, setCompletedChapters] = useState(0); // Track completed chapters

  const showVideo = (videoSource, chapter) => {
    setCurrentVideo(videoSource);
    setCurrentChapter(chapter);
    setVideoVisible(true);
  };

  const handleVideoCompletion = () => {
    setVideoVisible(false);
    setIsCompletionAlertVisible(true);
    setCompletedChapters(prev => prev + 1); // Increment completed chapters
  };

  const handleConfirmation = () => {
    setIsCompletionAlertVisible(false);
    const currentIndex = chapters.findIndex(chapter => chapter.id === currentChapter.id);
    const nextChapter = chapters[currentIndex + 1];
    if (nextChapter) {
      showVideo(nextChapter.videoSource, nextChapter);
    }
  };

  const handleAlertClose = () => {
    setIsCompletionAlertVisible(false);
  };

  // Calculate percentage of completed chapters
  const progressPercentage = (completedChapters / chapters.length) * 100;

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.progressBarContainer}>
          <Text style={styles.progressText}>Progress: {progressPercentage.toFixed(0)}%</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
          </View>
        </View>
        {chapters.map(chapter => (
          <View key={chapter.id} style={styles.buttonWrapper}>
            <Button
              title={chapter.title}
              onPress={() => showVideo(chapter.videoSource, chapter)}
              color="black"
              style={styles.button}
            />
          </View>
        ))}
      </ScrollView>
      <VideoPlayer
        visible={videoVisible}
        onClose={() => setVideoVisible(false)}
        videoSource={currentVideo}
        onCompletion={handleVideoCompletion}
      />
      {isCompletionAlertVisible && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>Video Completed! Proceed to next chapter?</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.alertButton, styles.yesButton]} onPress={handleConfirmation}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.alertButton, styles.noButton]} onPress={handleAlertClose}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  progressBarContainer: {
    width: width * 0.9,
    marginBottom: 20,
  },
  progressText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: 'grey',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'green',
  },
  buttonWrapper: {
    width: '100%',
    marginBottom: 10,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    width: '100%',
  },
  alertContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  alertText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  alertButton: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: 'green',
  },
  noButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
