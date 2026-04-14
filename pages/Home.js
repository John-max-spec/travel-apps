import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default function Home({ navigation }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ImageBackground source={{ uri: 'https://qcloud.dpfile.com/pc/TrdZpLN1zkXDV4oN2FH98LdVnvHj694NKQu0_KA3ul4eYxZWRPQ7CJuw-PqyZBS4.jpg' }} style={styles.bg}>
      <View style={styles.overlay}>
        <View style={styles.navbar}>
          <Text style={styles.logo}>Start new Trip</Text>
          <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
            <Text style={styles.menu}>☰</Text>
          </TouchableOpacity>
        </View>

        {menuOpen && (
          <View style={styles.menuBox}>
            <TouchableOpacity onPress={() => { navigation.navigate('TravelForm'); setMenuOpen(false); }}>
              <Text style={styles.menuItem}>Add some Trips</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('TravelList'); setMenuOpen(false); }}>
              <Text style={styles.menuItem}>My own Trips</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.center}>
          <Text style={styles.title}>Welcome to My Trips </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  navbar: { padding: 20, flexDirection: 'row', justifyContent: 'space-between',marginTop: 60 },
  logo: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  menu: { color: 'white', fontSize: 28 },
  menuBox: { backgroundColor: '#0a3d62', padding: 15, marginHorizontal: 20, borderRadius: 10 },
  menuItem: { color: 'white', padding: 10, fontSize: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { color: 'white', fontSize: 30, fontWeight: 'bold' },
});