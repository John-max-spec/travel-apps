import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function CameraImage({ item, onClose, onPhoto }) {
  const [perm, requestPerm] = useCameraPermissions();
  const [camRef, setCamRef] = useState(null); 

  if (perm === null) {
    return <View />;
  }

  if (!perm.granted) {
    return (
      <View style={styles.center}>
        <TouchableOpacity style={styles.btn} onPress={requestPerm}>
          <Text style={styles.btnText}>Allow Camera Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

 const toggleFacing = () => {
    setFacing(prev => prev === 'back' ? 'front' : 'back');
  };


  const takePicture = async () => {
    if (!camRef) return;

    try {
    
      const photo = await camRef.takePictureAsync({
        quality: 0.5,
        base64: false,
      });

    
      if (photo?.uri) {
        onPhoto(item._id, photo.uri);
      }

      onClose();
    } catch (err) {
      console.log('拍照失败：', err);
    }
  };

  return (
    <View style={styles.full}>
    
      <CameraView
        ref={setCamRef}
        style={styles.cam}
        facing="back"
      />

      <View style={styles.controls}>
        <TouchableOpacity style={styles.btn} onPress={takePicture}>
          <Text style={styles.btnText}>CAPTURE</Text>
        </TouchableOpacity>

         <TouchableOpacity style={styles.btn} onPress={toggleFacing}>
              <Text style={styles.btnText}>Flip</Text>
            </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={onClose}>
          <Text style={styles.btnText}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  full: { flex: 1 },
  cam: { flex: 1 },
  controls: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    flex: 1,
    backgroundColor: '#0a3d62',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: { color: 'white', fontWeight: 'bold' },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});