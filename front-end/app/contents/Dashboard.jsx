import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

export default function Dashboard({userId}) {
  
  console.log('User ID:', userId);

  const [username, setUsername] = useState('user');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/studylogin/${userId}`);
        const response = await axios.get(`http://10.0.2.2:8000/studylogin/${userId}`);
        console.log('Response data:', response.data.username);
        setUsername(response.data.username);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
  
    if (userId) {
      fetchData();
    }
  }, [userId]);
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Hello {username}!!!</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.firstCard}>
        <View style={styles.cardContainer}>
          <Image
            source={require('../../assets/images/numBd.png')}
            style={styles.cardImage}
          />
          <View style={styles.card}>
            <Text style={styles.motivationalText}>
              Come on! You can do it
            </Text>
          </View>
        </View>

        <View style={styles.cardContainer2}>
          <Text style={styles.textcard1}>Enroll For Free</Text>
          <Text style={styles.textcard1}>1000+ Free courses for you</Text>
        </View>

        <View style={styles.cardContainer3}>
          <Text style={styles.textcard1}>New Card Content</Text>
          <Text style={styles.textcard2}>Explore our latest features and updates</Text>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.motivationalText}>
              Discover More
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.infoSection}>
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Thoughts on Education</Text>
          <Text style={styles.infoText}>
            Education is the most powerful weapon which you can use to change the world.
            It is the foundation upon which we build our future. Every great achiever is
            inspired by a great mentor.
          </Text>
        </View>
        <Image
          source={{ uri: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-600nw-2071252046.jpg' }}
          style={styles.infoImage}
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Course Details</Text>
        <Text style={styles.detailsText}>
          Our courses are designed to equip you with the knowledge and skills you need to excel in your career. 
          Each course is crafted by industry experts to ensure that you receive the most relevant and up-to-date content.
        </Text>
      </View>

      <View style={styles.helpContainer}>
        <Text style={styles.helpTitle}>Help & Support</Text>
        <Text style={styles.helpText}>
          If you have any questions or need assistance, please reach out to our support team. 
          We are here to help you with any queries or issues you may have. 
          You can contact us via email or through our support chat.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d00',
    marginBottom: 20,
  },
  firstCard: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  cardContainer: {
    backgroundColor: '#e5f6e0',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    borderRadius: 8,
    padding: 10,
    width: 200,
    height: 120,
  },
  cardContainer2: {
    backgroundColor: '#e5f6e0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    width: 200,
    height: 120,
    marginRight: 20,
  },
  cardContainer3: {
    backgroundColor: '#e5f6e0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    width: 200,
    height: 120,
    marginRight: 20,
  },
  textcard1: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textcard2: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flex: 1,
    marginLeft: 10,
  },
  motivationalText: {
    fontSize: 12,
    color: '#004d00',
  },
  cardImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#d0f0c0',
    borderRadius: 8,
    padding: 20,
  },
  infoContent: {
    flex: 1,
    marginRight: 20,
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004d00',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#004d00',
  },
  infoImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  detailsContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004d00',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    color: '#004d00',
  },
  helpContainer: {
    backgroundColor: '#e0f7fa',
    padding: 20,
    borderRadius: 8,
  },
  helpTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004d00',
    marginBottom: 10,
  },
  helpText: {
    fontSize: 16,
    color: '#004d00',
  },
});
