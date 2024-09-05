import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import imagePaths from './imagePaths';

const courses = [
  { id: '1', name: 'Web Development', image: imagePaths.webDevelopment, description: 'Learn the fundamentals of web development.', rating: '4.5/5', videoUrl:"hnVOvvbQrwA"  },
  { id: '2', name: 'Java Developer', image: imagePaths.javaDeveloper, description: 'Master Java programming with practical examples.', rating: '3/5', videoUrl:"fMMz9UUjFY8&list=PLhvdldYcnZMku_viVb2tU7NuW5DZxwIfw"  },
  { id: '3', name: 'Machine Learning', image: imagePaths.machineLearning, description: 'Explore machine learning algorithms and their applications.', rating: '4.8/5', videoUrl: 'AYgMefUlKq8' },
  { id: '4', name: 'Python Developer', image: imagePaths.pythonDeveloper, description: 'Become proficient in Python programming.', rating: '4.6/5', videoUrl: 'KEku-6CBX6M&list=PL9ooVrP1hQOE4KoZLUP4LgBwFH2IJCQs6' },
  { id: '5', name: 'Software Tester', image: imagePaths.softwareTester, description: 'Learn techniques for effective software testing.', rating: '5/5', videoUrl: 'E2t5XbWwj7I&list=PLL34mf651faM_nn8uKlnwbQPw5zSh_F84' },
  { id: '6', name: 'App Developer', image: imagePaths.webDeveloperMERN, description: 'Understand the principles of full-stack app development.', rating: '1/5', videoUrl: '7nQsQ0rvYqQ' },
];

const Journey = ({ userId }) => {
  const navigation = useNavigation();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [numColumns, setNumColumns] = useState(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/enrollCourse/${userId}`);
        const response = await axios.get(`http://10.0.2.2:8000/enrollCourse/${userId}`);
        console.log('Courses data:', response.data);

        if (response.data && response.data.courses) {
          const courseIds = response.data.courses.map(course => course.courseId);
          console.log('Enrolled course IDs:', courseIds);
          setEnrolledCourses(courseIds);
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    if (userId) {
      fetchData();
    }

    const updateLayout = () => {
      const { width } = Dimensions.get('window');
      setNumColumns(width < 600 ? 1 : 2);
    };

    const subscription = Dimensions.addEventListener('change', updateLayout);
    updateLayout();
    return () => subscription?.remove();
  }, [userId]);

  const handleEnrollPress = async (course) => {
    if (enrolledCourses.includes(course.id)) {
      Alert.alert('Course Already Added', 'This course is already in your cart.');
    } else {
      try {
        // await axios.post(`http://localhost:5000/enrollCourse/${userId}`,{
        await axios.post(`http://10.0.2.2:8000/enrollCourse/${userId}`, {
          courseId: course.id,
          courseName: course.name,
          description: course.description,
          imagePath: course.image,
          videoUrl: course.videoUrl,
          description: course.description,
          rating: parseFloat(course.rating.split('/')[0]),
        });
        setEnrolledCourses(prev => [...prev, course.id]);
        Alert.alert('Course Added', 'The course has been added to your cart.');
      } catch (error) {
        console.log('Error enrolling course:', error);
        Alert.alert('Enrollment Failed', 'Failed to enroll in the course. Please try again later.');
      }
    }
  };

  const renderStars = (rating) => {
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
  };

  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns}
        data={courses}
        renderItem={({ item }) => (
          <View style={[styles.card, { width: (Dimensions.get('window').width / numColumns) - 15 }]}>
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.ratingOverlay}>
                {renderStars(item.rating)}
              </View>
            </View>
            <View style={styles.content}>
              <Text style={styles.title}>{item.name}</Text>
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => handleEnrollPress(item)}
            >
              <Text style={styles.buttonText}>
                {enrolledCourses.includes(item.id) ? 'Enrolled' : 'Enroll now'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
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
    height: 200, 
    position: 'relative',
  },
  imageContainer: {
    width: '60%',
    height: '100%',  
    overflow: 'hidden',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,  
    resizeMode: 'contain',  
  },
  ratingOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',  
    borderRadius: 5,
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
   marginBottom:50
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#001F3F',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008000',
    height: 30,
    borderRadius: 5,
    width: 100,
    position: 'absolute',
    right: 30,
    bottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
});

export default Journey;
