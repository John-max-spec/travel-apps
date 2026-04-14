import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ImageViewer({ uri, onClose }) {
 
 
  if (!uri) return null;


  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.close} onPress={onClose}>
        <Text style={styles.closeText}>✕ CLOSE</Text>
      </TouchableOpacity>
      <Image source={{ uri }} style={styles.image} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'black', justifyContent: 'center' },
  image: { width: '100%', height: '85%' },
  close: { position: 'absolute', top: 40, right: 20 },
  closeText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});