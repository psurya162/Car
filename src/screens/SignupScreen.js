import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signupUser } from '../redux/slices/authSlice';

const SignupScreen = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(signupUser(data))
      .unwrap()
      .then(() => navigation.navigate('Login'))
      .catch((error) => alert(error));
  };

  return (
    <View style={styles.container}>
      {/* Transparent logo */}
      <Image
        source={{
          uri: 'https://e7.pngegg.com/pngimages/136/532/png-clipart-car-electric-vehicle-green-vehicle-computer-icons-car-text-logo.png', // Replace with a transparent logo URL
        }}
        style={styles.logo}
      />

      <Text style={styles.title}>Sign Up</Text>

      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#666"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

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
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f4f9f4', // Pistachio color background
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 24,
    resizeMode: 'contain',
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
    backgroundColor: '#4caf50', // Green color button
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

export default SignupScreen;
