import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const ForgotPassword = ({ navigation }) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Logic to handle forgot password request
    console.log('Forgot Password Request:', data);
    alert('Password reset link sent to your email');
  };

  return (
    <View style={styles.container}>
      {/* Transparent background logo */}
      <Image
        source={{
          uri: 'https://e7.pngegg.com/pngimages/136/532/png-clipart-car-electric-vehicle-green-vehicle-computer-icons-car-text-logo.png', // Replace with your transparent logo URL
        }}
        style={styles.logo}
      />

      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your email address to reset your password</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.linkText}>Back to Login</Text>
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
    height: 100,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
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

export default ForgotPassword;
