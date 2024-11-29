import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const staticPolicies = [
  { id: 1, vehicleNo: 'ABC123', category: 'Car', expiryDate: '2024-12-31', status: 'Active', leadDate: '2023-11-29' },
  { id: 2, vehicleNo: 'XYZ456', category: 'Bike', expiryDate: '2025-01-15', status: 'Inactive', leadDate: '2023-10-10' },
  { id: 3, vehicleNo: 'LMN789', category: 'Truck', expiryDate: '2024-08-22', status: 'Active', leadDate: '2023-08-01' },
  { id: 4, vehicleNo: 'ABC123', category: 'Car', expiryDate: '2024-12-31', status: 'Active', leadDate: '2023-11-29' },
  { id: 5, vehicleNo: 'XYZ456', category: 'Bike', expiryDate: '2025-01-15', status: 'Inactive', leadDate: '2023-10-10' },
  { id: 6, vehicleNo: 'LMN789', category: 'Truck', expiryDate: '2024-08-22', status: 'Active', leadDate: '2023-08-01' },
  { id: 7, vehicleNo: 'ABC123', category: 'Car', expiryDate: '2024-12-31', status: 'Active', leadDate: '2023-11-29' },
  { id: 8, vehicleNo: 'XYZ456', category: 'Bike', expiryDate: '2025-01-15', status: 'Inactive', leadDate: '2023-10-10' },
  { id: 9, vehicleNo: 'LMN789', category: 'Truck', expiryDate: '2024-08-22', status: 'Active', leadDate: '2023-08-01' },
];

const categoryIcons = {
  All: 'https://example.com/all-icon.png',
  Car: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYDdMlhCts13FNVvXrtFYyRKP-fi_zllTt_g&s',
  Bike: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Motorcycle.svg/768px-Motorcycle.svg.png',
  Truck: 'https://www.iconpacks.net/icons/1/free-truck-icon-1058-thumb.png',
};

const PolicyList = () => {
  const [showActive, setShowActive] = useState(false); // Show Active policies by default
  const [showInactive, setShowInactive] = useState(true); // Show Inactive policies by default
  const [filteredPolicies, setFilteredPolicies] = useState(staticPolicies);

  // Function to filter the policies based on active and inactive
  const filterPolicies = () => {
    let filtered = staticPolicies;
  
    // If both toggles are off, show all policies
    if (!showActive && !showInactive) {
      filtered = staticPolicies; // Show all policies
    } else {
      if (!showActive) {
        filtered = filtered.filter(policy => policy.status === 'Inactive');
      }
      if (!showInactive) {
        filtered = filtered.filter(policy => policy.status === 'Active');
      }
    }
  
    setFilteredPolicies(filtered);
  };
  

  useEffect(() => {
    filterPolicies(); // Re-filter policies whenever showActive or showInactive changes
  }, [showActive, showInactive]);

  const renderPolicy = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: categoryIcons[item.category] }} style={styles.icon} />
        <Text style={styles.vehicleText}>{item.vehicleNo}</Text>
      </View>
      <Text style={styles.policyInfo}>Category: <Text style={styles.highlight}>{item.category}</Text></Text>
      <Text style={styles.policyInfo}>Expiry Date: <Text style={styles.highlight}>{item.expiryDate}</Text></Text>
      <Text style={styles.policyInfo}>Status: <Text style={item.status === 'Active' ? styles.activeStatus : styles.inactiveStatus}>{item.status}</Text></Text>
      <Text style={styles.policyInfo}>Lead Date: <Text style={styles.highlight}>{item.leadDate}</Text></Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Status Filter Toggles */}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>Show Active Policies</Text>
        <Switch
          value={showActive}
          onValueChange={(newValue) => {
            setShowActive(newValue);
            if (newValue) setShowInactive(false); // Turn off Inactive when Active is on
          }}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={showActive ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
        />
      </View>

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>Show Inactive Policies</Text>
        <Switch
          value={showInactive}
          onValueChange={(newValue) => {
            setShowInactive(newValue);
            if (newValue) setShowActive(false); // Turn off Active when Inactive is on
          }}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={showInactive ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
        />
      </View>

      {/* Policy List */}
      <FlatList
        data={filteredPolicies}
        renderItem={renderPolicy}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  toggleContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleText: {
    fontSize: 16,
    color: '#333',
  },
  flatListContainer: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  vehicleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  policyInfo: {
    fontSize: 14,
    color: '#666',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#333',
  },
  activeStatus: {
    color: 'green',
  },
  inactiveStatus: {
    color: 'red',
  },
});

export default PolicyList;
