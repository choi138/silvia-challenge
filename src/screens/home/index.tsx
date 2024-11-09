import React from 'react';
import { View, StyleSheet } from 'react-native';

export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circleRow}>
        <View style={[styles.circle, styles.topCircle]} />
        <View style={styles.circle} />
      </View>
      <View style={styles.middleRow}>
        <View style={styles.circle} />
        <View style={styles.square} />
        <View style={styles.circle} />
      </View>
      <View style={styles.circleRow}>
        <View style={styles.circle} />
        <View style={[styles.circle, styles.bottomCircle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E9F0', // Light background color
  },
  circleRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 30,
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
    marginBottom: 30,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A4A4A', // Dark circle color
    borderColor: '#B0C4DE',
  },
  square: {
    width: 80,
    height: 80,
    backgroundColor: '#E0E9F0', // Light square color
    borderWidth: 2,
    borderColor: '#B0C4DE',
  },
  topCircle: {
    bottom: 20,
    right: 20,
  },
  bottomCircle: {
    top: 20,
    left: 20,
  },
});
