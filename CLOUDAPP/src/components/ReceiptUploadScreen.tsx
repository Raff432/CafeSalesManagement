import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'ReceiptUpload'>;

export const ReceiptUploadScreen: React.FC<Props> = ({ navigation }) => {
  const [scannerActive, setScannerActive] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [processing, setProcessing] = useState(false);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    if (status === 'granted') {
      setScannerActive(true);
    }
  };

  const handleQRSuccess = async (result: { data: string }) => {
    setProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Here you would typically send the QR data to your backend
    console.log('QR Code detected:', result.data);
    setProcessing(false);
    setScannerActive(false);
  };

  const handleImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setProcessing(true);
        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Receipt uploaded:', result.assets[0].uri);
        setProcessing(false);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={24} color="#fff" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Upload Receipt</Text>
        <Text style={styles.subtitle}>Earn points from your purchases</Text>
      </View>

      <View style={styles.content}>
        {scannerActive ? (
          <View style={styles.scannerContainer}>
            <BarCodeScanner
              onBarCodeScanned={handleQRSuccess}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.scannerOverlay}>
              <View style={styles.scannerFrame}>
                <View style={[styles.cornerTL, styles.corner]} />
                <View style={[styles.cornerTR, styles.corner]} />
                <View style={[styles.cornerBL, styles.corner]} />
                <View style={[styles.cornerBR, styles.corner]} />
              </View>
              <Text style={styles.scannerText}>Position QR code in frame</Text>
            </View>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setScannerActive(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel Scanning</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={requestCameraPermission}
            >
              <Icon name="camera" size={24} color="#ec4899" />
              <Text style={styles.optionButtonText}>Scan QR Code</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionButton, styles.uploadButton]}
              onPress={handleImageUpload}
            >
              <Icon name="upload" size={24} color="#6b7280" />
              <Text style={[styles.optionButtonText, styles.uploadButtonText]}>
                Upload Receipt Image
              </Text>
            </TouchableOpacity>

            <View style={styles.noteContainer}>
              <Icon name="alert-circle" size={24} color="#d97706" />
              <View style={styles.noteContent}>
                <Text style={styles.noteTitle}>Important Note</Text>
                <Text style={styles.noteText}>
                  Points will be credited to your account after receipt
                  verification. This usually takes 1-2 business days.
                </Text>
              </View>
            </View>
          </>
        )}

        <Modal visible={processing} transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ActivityIndicator size="large" color="#ec4899" />
              <Text style={styles.modalText}>Processing receipt...</Text>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ec4899',
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: '#fce7f3',
    marginTop: 4,
  },
  content: {
    padding: 16,
    flex: 1,
  },
  scannerContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    height: Dimensions.get('window').width,
  },
  scannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrame: {
    width: '75%',
    height: '75%',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 12,
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#ec4899',
    borderWidth: 2,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  scannerText: {
    color: '#fff',
    marginTop: 16,
    fontSize: 14,
  },
  cancelButton: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  cancelButtonText: {
    color: '#ec4899',
    fontWeight: '600',
  },
  optionButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#fce7f3',
  },
  uploadButton: {
    borderColor: '#e5e7eb',
  },
  optionButtonText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#ec4899',
  },
  uploadButtonText: {
    color: '#6b7280',
  },
  noteContainer: {
    backgroundColor: '#fefce8',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    marginTop: 16,
  },
  noteContent: {
    marginLeft: 12,
    flex: 1,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
  },
  noteText: {
    color: '#b45309',
    marginTop: 4,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '600',
  },
});