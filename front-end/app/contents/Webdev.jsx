// import React, { useState } from 'react';
// import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
// import { WebView } from 'react-native-webview';

// const Webdev = () => {
//   const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/-mJFZp84TIY');

//   const handleVideoChange = (url) => {
//     setVideoUrl(url);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Web Developer Contents</Text>
//       <View style={styles.videoContainer}>
//         <WebView
//           source={{ uri: videoUrl }}
//           style={styles.video}
//         />
//         <View style={styles.aboutSection}>
//           <Text style={styles.sectionTitle}>About the Course</Text>
//           <Text style={styles.sectionContent}>
//             This web development course is designed to teach you the ins and outs of building dynamic, responsive websites and applications. You'll start with the basics of HTML, CSS, and JavaScript, then move on to more advanced topics such as frameworks, libraries, and full-stack development.
//           </Text>
//         </View>
//       </View>
//       <View style={styles.syllabusSection}>
//         <Text style={styles.sectionTitle}>Syllabus</Text>
//         <View style={styles.lessonButtons}>
//           {[...Array(10).keys()].map((_, index) => (
//             <Button
//               key={index}
//               title={`Lesson ${index + 1}`}
//               onPress={() => handleVideoChange(`https://www.youtube.com/embed/video${index + 1}`)}
//               color="#1b1b33"
//             />
//           ))}
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1e1e2f',
//     padding: 20,
//   },
//   title: {
//     fontSize: 25,
//     color: 'white',
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   videoContainer: {
//     marginBottom: 20,
//   },
//   video: {
//     height: 200,
//   },
//   aboutSection: {
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     padding: 15,
//     borderRadius: 10,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     color: 'white',
//     marginBottom: 10,
//   },
//   sectionContent: {
//     color: 'white',
//   },
//   syllabusSection: {
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     padding: 15,
//     borderRadius: 10,
//   },
//   lessonButtons: {
//     marginTop: 10,
//   },
// });

// export default Webdev;
 
import { View, Text } from 'react-native'
import React from 'react'

export default function Webdev() {
  return (
    <View>
      <Text>Webdev</Text>
    </View>
  )
}