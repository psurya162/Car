import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const staticPolicies = [
  { id: 1, vehicleNo: 'ABC123', category: 'Car', expiryDate: '2024-12-31', status: 'Active', leadDate: '2023-11-29', remarks: 'No issues' },
  { id: 2, vehicleNo: 'XYZ456', category: 'Bike', expiryDate: '2025-01-15', status: 'Inactive', leadDate: '2023-10-10', remarks: 'Needs inspection' },
  { id: 3, vehicleNo: 'LMN789', category: 'Truck', expiryDate: '2024-08-22', status: 'Active', leadDate: '2023-08-01', remarks: 'Renewal pending' },
];

const PolicyDetails = ({ route }) => {
  const { policyId } = route.params; // Get the policyId from navigation params
  const [policyDetails, setPolicyDetails] = useState(null);

  useEffect(() => {
    // Find the policy by its ID in the static data
    const policy = staticPolicies.find((policy) => policy.id === policyId);
    setPolicyDetails(policy); // Set the policy details in the state
  }, [policyId]);

  if (!policyDetails) return <Text>Loading Policy Details...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Policy Details</Text>
      <Text>Vehicle No: {policyDetails.vehicleNo}</Text>
      <Text>Category: {policyDetails.category}</Text>
      <Text>Expiry Date: {policyDetails.expiryDate}</Text>
      <Text>Status: {policyDetails.status}</Text>
      <Text>Lead Date: {policyDetails.leadDate}</Text>
      <Text>Remarks: {policyDetails.remarks}</Text> {/* Any other details you want to show */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default PolicyDetails;
