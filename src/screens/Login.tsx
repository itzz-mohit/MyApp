import React, {useState, useEffect} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

import google from '../assets/google.png';
import axios from 'axios';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({navigation}: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = async () => {
    try {
      const response = await axios.post(
        'http://192.168.80.106:5000/api/v1/login',
        {
          email,
          password,
        },
      );
      console.log(response);
      console.log(response.data);
      Alert.alert('Login Successful', 'You have successfully logged in.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Details', {userDetails: email}),
        },
      ]);
    } catch (error) {
      console.log('Error while logging in');
      console.error(error);
      Alert.alert(
        'Login Failed',
        'An error occurred while logging in. Please try again.',
      );
    }
  };

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.user);
      Alert.alert('Login Successful', 'You have successfully logged in.', [
        {
          text: 'OK',
          onPress: () =>
            navigation.navigate('Details', {userDetails: userInfo.user.email}),
        },
      ]);
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            break;
          case statusCodes.IN_PROGRESS:
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            break;
          default:
            break;
        }
      } else {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

      <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.orText}>Or</Text>

      <TouchableOpacity style={styles.googleButton} onPress={googleLogin}>
        <Image source={google} style={styles.socialIcon} />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

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
  orText: {
    fontSize: 18,
    color: '#aaa',
    marginVertical: 15,
  },
  googleButton: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
  },
  googleButtonText: {
    color: '#000',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
});
