import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmergencyNumberScreen = () => {
  const [emergencyNumber, setEmergencyNumber] = useState('');

  const isValidNumber = (number: string): boolean => {
    const phoneRegex = /^\d{13}$/;
    return phoneRegex.test(number);
  };

  const saveEmergencyNumber = async () => {
    if (!isValidNumber(emergencyNumber)) {
      Alert.alert('Número no válido', 'Por favor ingresa un número de 10 dígitos.');
      return;
    }

    try {
      await AsyncStorage.setItem('emergencyNumber', emergencyNumber);
      Alert.alert('Éxito', 'Número de emergencia guardado.');
      setEmergencyNumber('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el número.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurar Número de Emergencia</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el número de emergencia"
        keyboardType="phone-pad"
        value={emergencyNumber}
        onChangeText={setEmergencyNumber}
      />
      <Button title="Guardar" onPress={saveEmergencyNumber} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default EmergencyNumberScreen;
