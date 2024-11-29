import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import ErrorModal from './ErrorModal'; // Import the modal

const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [error, setError] = useState(''); // State for error message
  const [isModalVisible, setModalVisible] = useState(false); // Modal visibility

  const onSubmit = (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then(() => navigation.navigate('PolicyList'))
      .catch((error) => {
        // Make sure error is a string
        const errorMessage = error?.message || JSON.stringify(error);
        setError(errorMessage); // Set error message
        setModalVisible(true);
      });
  };

  return (
    <View style={styles.container}>
      {/* Transparent background logo */}
      <Image
        source={{
          uri: 'https://e7.pngegg.com/pngimages/136/532/png-clipart-car-electric-vehicle-green-vehicle-computer-icons-car-text-logo.png',
        }}
        style={styles.logo}
      />

      <Text style={styles.title}>Login</Text>

      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#666"
            value={value}
            onChangeText={onChange}
            secureTextEntry
          />
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('SignupScreen')}
      >
        <Text style={styles.linkText}>Don’t have an account? Sign Up</Text>
      </TouchableOpacity>

      {/* Error Modal */}
      <ErrorModal
        isVisible={isModalVisible}
        message={error}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f4f9f4',
  },
  logo: {
    width: 120,
    height: 100,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 8,
    alignItems: 'center',
  },
  linkText: {
    color: '#4caf50',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
