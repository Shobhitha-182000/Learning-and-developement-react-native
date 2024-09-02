import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
// import YoutubePlayer from 'react-native-youtube-iframe';
 
const localImages = {
  'Web Development': require('./fullstack.png'),
  'Java Developer': require('./java develop.jpeg'),
  'Machine Learning': require('../../assets/courseimage/machine.jpg'),
  'Python Developer': require('../../assets/courseimage/python develop.png'),
  'Software Tester': require('../../assets/courseimage/softwaretesting1.jpg'),
  'Web Developer': require('../../assets/courseimage/mern stack.png'),
  'default': require('./fullstack.png'),
};

const Courses = ({ userId }) => {
  const navigation = useNavigation();
  const [courses, setCourses] = useState([]);
  const [numColumns, setNumColumns] = useState(2);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
         
        const response = await axios.get(`http://10.0.2.2:8000/enrollCourse/${userId}`);
        // const response = await axios.get(`http://localhost:5000/enrollCourse/${userId}`);
        console.log('Courses data:', response.data);
        setCourses(response.data.courses || []); 
      } catch (error) {
        console.log('Error fetching courses:', error);
      }
    };

    if (userId) {
      fetchCourses();
    }

    const updateLayout = () => {
      const { width } = Dimensions.get('window');
      setNumColumns(width < 600 ? 1 : 2);
    };

    const subscription = Dimensions.addEventListener('change', updateLayout);
    updateLayout();
    return () => subscription?.remove();
  }, [userId]);

  const handleCardPress = (id) => {
    navigation.navigate('CourseDetails', { courseId: id });
  };

  const handleImagePress = (course) => {
    // navigation.navigate('VideoPlayer', { videoUrl: course.videoUrl });
  };

  const renderStars = (rating) => {
    if (typeof rating === 'string' && rating.includes('/')) {
      const stars = parseFloat(rating.split('/')[0]) || 0;
      return (
        <View style={styles.ratingContainer}>
          {Array.from({ length: 5 }).map((_, index) => (
            <FontAwesome
              key={index}
              name={index < stars ? 'star' : 'star-o'}
              size={16}
              color="#FFD700"
            />
          ))}
        </View>
      );
    }
    return (
      <View style={styles.ratingContainer}>
        {Array.from({ length: 5 }).map((_, index) => (
          <FontAwesome
            key={index}
            name='star-o'
            size={16}
            color="#FFD700"
          />
        ))}
      </View>
    );
  };

  const getImageSource = (courseName) => {
    return localImages[courseName] || localImages['default'];  
  };

  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns}
        data={courses}
        renderItem={({ item }) => (
          <View style={[styles.card, { width: (Dimensions.get('window').width / numColumns) - 15 }]}>
            <TouchableOpacity
              onPress={() => handleCardPress(item._id)}
              style={styles.imageContainer}
            >
              <Image 
                source={getImageSource(item.courseName)} 
                style={styles.image} 
              />
            </TouchableOpacity>
            <View style={styles.content}>
              <Text style={styles.title}>{item.courseName}</Text> 
              {/* <View style={styles.ratingContainer}>
                {renderStars(item.rating)}
              </View> */}
              <Text style={styles.price}>{item.description}</Text>
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => handleImagePress(item)}
            >
              <Text style={styles.buttonText}>Watch</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item._id}
        numColumns={numColumns}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
  list: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    margin: 5,
    flexDirection: 'row',
    height: 180,
  },
  imageContainer: {
    width: '40%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#001F3F',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: 'grey',
    fontWeight: 'bold',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008000',
    height: 40,
    borderRadius: 5,
    margin: 10,
    marginTop: 120,
    width: 90,
    marginRight: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Courses;
