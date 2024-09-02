import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Profile = ({userId}) => {
  const navigate = useNavigation();

  const [userData, setUserData] = useState(null);
  const [imageUri, setImageUri] = useState(null); 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/studylogin/${userId}`);  
        const response = await axios.get(`http://10.0.2.2:8000/studylogin/${userId}`);  
        setUserData(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
        setImageUri(response.data.profileImage || '');  
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setImageUri(response.assets[0].uri);
 
      }
    });
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
  
      if (imageUri) {
        formData.append('image', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'profile.jpg',
        });
      }
  
      // const response = await axios.put(`http://localhost:5000/studysignups/${userId}`
      const response = await axios.put(`http://10.0.2.2:8000/studysignups/${userId}` , formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      Alert.alert('Profile Updated', 'Your profile has been updated successfully.');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Update Failed', 'Failed to update profile. Please try again later.');
    }
  };
  

  const handleLogout = () => {
    navigate.navigate('MainPage');
  };

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri || 'https://via.placeholder.com/100' }} style={styles.profileImage} />
        <TouchableOpacity onPress={handleImagePick} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.saveChanges} onPress={handleSaveChanges}>
        <Text style={styles.saveChangesText}>Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', 
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#e5e5e5',
  },
  uploadButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007bff', // Blue color for button
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007bff',
    marginRight:140
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  saveChanges: {
    backgroundColor: 'teal',  
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveChangesText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'chocolate', // Red color for button
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
