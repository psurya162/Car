import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createLead } from '../redux/slices/leadSlice';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateLead = ({ navigation }) => {
  const { control, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([
    { label: 'Car', value: 'car' },
    { label: 'Bike', value: 'bike' },
    { label: 'Truck', value: 'truck' },
  ]);
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const categoryImages = {
    car: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYDdMlhCts13FNVvXrtFYyRKP-fi_zllTt_g&s',
    bike: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Motorcycle.svg/768px-Motorcycle.svg.png',
    truck: 'https://www.iconpacks.net/icons/1/free-truck-icon-1058-thumb.png',
  };

  const handleFileUpload = () => {
    Alert.alert(
      'Upload File',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => handleCamera() },
        { text: 'File Manager', onPress: () => handleFilePicker() },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const handleCamera = () => {
    launchCamera({ mediaType: 'photo', saveToPhotos: true }, (response) => {
      if (response.didCancel || response.errorCode) return;
      if (response.assets) setFiles((prev) => [...prev, ...response.assets]);
    });
  };

  const handleFilePicker = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 }, (response) => {
      if (response.didCancel || response.errorCode) return;
      if (response.assets) setFiles((prev) => [...prev, ...response.assets]);
    });
  };

  const onSubmit = (data) => {
    dispatch(
      createLead({
        ...data,
        category,
        expiryDate: expiryDate.toISOString().split('T')[0],
        files,
      })
    )
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Lead created successfully');
        reset();  // Clear form fields after successful submission
        setFiles([]); // Clear uploaded files
        setCategory(null); // Clear selected category
        setExpiryDate(new Date()); // Reset expiry date
      })
      .catch((error) => Alert.alert('Error', error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Lead</Text>

      {/* Vehicle Number Input */}
      <Text style={styles.label}>Vehicle No</Text>
      <Controller
        name="vehicleNo"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter Vehicle Number"
            placeholderTextColor="black"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* Category Dropdown */}
      <Text style={styles.label}>Category</Text>
      <DropDownPicker
        open={openCategory}
        value={category}
        items={categories}
        setOpen={setOpenCategory}
        setValue={setCategory}
        setItems={setCategories}
        placeholder="Select a category"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      {/* Display Category Image */}
      {category && (
        <View style={styles.categoryImageContainer}>
          <Image source={{ uri: categoryImages[category] }} style={styles.categoryImage} />
        </View>
      )}

      {/* Expiry Date Picker */}
      <Text style={styles.label}>Expiry Date</Text>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.datePickerText}>{expiryDate.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={expiryDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setExpiryDate(selectedDate);
          }}
        />
      )}

      {/* Remarks Input */}
      <Text style={styles.label}>Remarks</Text>
      <Controller
        name="remarks"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter Remarks"
            value={value}
            onChangeText={onChange}
            placeholderTextColor="black"
          />
        )}
      />

      {/* File Upload Button */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
        <Text style={styles.uploadButtonText}>Upload Files</Text>
      </TouchableOpacity>

      {/* File Previews */}
      <FlatList
        data={files}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.filePreview} />
        )}
        horizontal
        style={styles.fileList}
      />

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  categoryImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  input: {
    borderWidth: 1,
    padding: 14,
    marginBottom: 16,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
  },
  dropdown: {
    marginBottom: 16,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#f9f9f9',
  },
  dropdownContainer: {
    borderRadius: 10,
  },
  datePickerButton: {
    padding: 14,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    marginBottom: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filePreview: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
  fileList: {
    marginVertical: 16,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute', // Positioning the button
    left: 0,
    right: 0,
    bottom: 20, // Keeping it at the bottom
    marginHorizontal: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateLead;
``
