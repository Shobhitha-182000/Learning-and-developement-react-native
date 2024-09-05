

// import React from 'react';
// import { View, StyleSheet, Dimensions } from 'react-native';
// import YoutubePlayer from 'react-native-youtube-iframe';

// const VideoPlayerScreen = ({ route }) => {
//   const { videoUrl } = route.params;

 
 

//   return (
//     <View style={styles.container}>
//       <YoutubePlayer
//         height={Dimensions.get('window').height}
//         play
//         videoId={'MvmKSNdyJ9g'}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
// });

// export default VideoPlayerScreen;

import { View, Text } from 'react-native'
import React from 'react'

export default function VideoPlayerScreen() {
  return (
    <View>
      <Text>VideoPlayerScreen</Text>
    </View>
  )
}