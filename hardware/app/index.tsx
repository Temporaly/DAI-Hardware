import { Image, StyleSheet, Platform, Alert, Linking } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as React from 'react';
import { useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THRESHOLD = 1.5; // Ajusta el umbral de sensibilidad aquí

export default function Index() {
  useEffect(() => {
    const subscription = Accelerometer.addListener(accelerometerData => {
      const { x, y, z } = accelerometerData;
      if (Math.abs(x) > THRESHOLD || Math.abs(y) > THRESHOLD || Math.abs(z) > THRESHOLD) {
        handleShake();
      }
    });

    Accelerometer.setUpdateInterval(100); // Actualiza cada 100 ms

    return () => {
      subscription.remove();
    };
  }, []);

  const handleShake = async () => {
    const emergencyNumber = await AsyncStorage.getItem('emergencyNumber');
    if (emergencyNumber) {
      const message = '¡Ayuda! Necesito asistencia inmediata.';
      const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}&phone=${emergencyNumber}`;
      const smsUrl = `sms:${emergencyNumber}?body=${encodeURIComponent(message)}`;

      // Intentar enviar mensaje por WhatsApp primero
      Linking.canOpenURL(whatsappUrl)
        .then((supported) => {
          if (supported) {
            Linking.openURL(whatsappUrl);
          } else {
            // Si no se puede enviar por WhatsApp, intenta enviar SMS
            Linking.canOpenURL(smsUrl).then((smsSupported) => {
              if (smsSupported) {
                Linking.openURL(smsUrl);
              } else {
                Alert.alert('Error', 'No se puede enviar el mensaje.');
              }
            });
          }
        })
        .catch(() => {
          Alert.alert('Error', 'No se pudo enviar el mensaje.');
        });
    } else {
      Alert.alert('Número no configurado', 'Por favor, configura un número de emergencia.');
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
