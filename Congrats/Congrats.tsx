import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Generate random positions and delays for balloons
const balloons = Array.from({ length: 12 }).map((_, i) => ({
  left: Math.random() * (width - 60),
  delay: Math.random() * 2000,
  color: `hsl(${Math.random() * 360}, 80%, 60%)`,
}));

// Generate random positions and delays for particles
const particles = Array.from({ length: 40 }).map((_, i) => ({
  left: Math.random() * width,
  top: Math.random() * height,
  delay: Math.random() * 2000,
  color: `hsl(${Math.random() * 360}, 90%, 70%)`,
}));

const Congrats = () => {
  // Balloons animation
  const balloonAnims = useRef(balloons.map(() => new Animated.Value(height))).current;
  // Particles animation
  const particleAnims = useRef(particles.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Animate balloons
    balloons.forEach((balloon, i) => {
      Animated.timing(balloonAnims[i], {
        toValue: -120,
        duration: 4000 + Math.random() * 2000,
        delay: balloon.delay,
        useNativeDriver: true,
      }).start();
    });
    // Animate particles
    particles.forEach((particle, i) => {
      Animated.timing(particleAnims[i], {
        toValue: 1,
        duration: 2000 + Math.random() * 2000,
        delay: particle.delay,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Particles */}
      {particles.map((particle, i) => (
        <Animated.View
          key={i}
          style={[
            styles.particle,
            {
              backgroundColor: particle.color,
              left: particle.left,
              top: particle.top,
              opacity: particleAnims[i],
              transform: [
                {
                  scale: particleAnims[i].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.2, 1.2],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
      {/* Balloons */}
      {balloons.map((balloon, i) => (
        <Animated.View
          key={i}
          style={[
            styles.balloon,
            {
              backgroundColor: balloon.color,
              left: balloon.left,
              transform: [
                { translateY: balloonAnims[i] },
                { scale: 1 + Math.sin(i) * 0.1 },
              ],
            },
          ]}
        />
      ))}
      {/* Congratulation Text */}
      <View style={styles.textContainer}>
        <Text style={styles.congratsText}>🎉 Congrat Hruitea! 🎉</Text>
        <Text style={styles.subText}>I kal zelna turah duhsakna kan hlan a che.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7eaff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  textContainer: {
    position: 'absolute',
    top: height * 0.25,
    width: '100%',
    alignItems: 'center',
    zIndex: 10,
  },
  congratsText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#a020f0',
    textShadowColor: '#fff',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    marginBottom: 10,
  },
  subText: {
    fontSize: 20,
    color: '#6a1b9a',
    marginTop: 8,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  balloon: {
    position: 'absolute',
    width: 60,
    height: 80,
    borderRadius: 30,
    opacity: 0.85,
    zIndex: 2,
    borderWidth: 2,
    borderColor: '#fff',
  },
  particle: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    opacity: 0.7,
    zIndex: 1,
  },
});

export default Congrats; 