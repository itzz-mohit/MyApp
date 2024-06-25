import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import axios from 'axios';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

type RegisterProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

const Register = ({navigation}: RegisterProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegisterPress = async () => {
    try {
      const response = await axios.post(
        'http://192.168.80.106:5000/api/v1/register',
        {
          username,
          email,
          password,
        },
      );
      console.log(response.data);
      Alert.alert(
        'Registration Successful',
        'You have successfully registered. Please log in.',
        [{text: 'OK', onPress: () => navigation.navigate('Login')}],
      );
    } catch (error) {
      console.log('Error while registering');
      console.error(error);
      Alert.alert(
        'Registration Failed',
        'An error occurred while registering. Please try again.',
      );
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={text => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleRegisterPress}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#ffffff',
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#1e90ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#333',
    fontSize: 16,
  },
  registerLink: {
    color: '#1e90ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
