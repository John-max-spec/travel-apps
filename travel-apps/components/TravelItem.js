import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function TravelItem({ trip, onDelete, onEdit, onCamera, onViewImage }) {
  return (
    <View style={styles.card}>
      {(trip.photoUri || trip.image) && (
        <TouchableOpacity onPress={onViewImage}>
          <Image source={{ uri: trip.photoUri || trip.image }} style={styles.img} />
        </TouchableOpacity>
      )}

      <View style={styles.body}>
        <Text style={styles.title}>{trip.title}</Text>
        <Text style={styles.desc}>{trip.description}</Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={onCamera}>
            <Text style={styles.btnText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={onEdit}>
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.del]} onPress={onDelete}>
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', marginBottom: 15, borderRadius: 12, overflow: 'hidden' },
  img: { width: '100%', height: 180 },
  body: { padding: 15 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  desc: { color: '#444', marginBottom: 10 },
  row: { flexDirection: 'row', gap: 8 },
  btn: { flex: 1, backgroundColor:'#2980b9', padding: 10, borderRadius: 8, alignItems: 'center' },
  del: { backgroundColor: '#e74c3c' },
  btnText: { color: 'white', fontWeight: 'bold' }
});