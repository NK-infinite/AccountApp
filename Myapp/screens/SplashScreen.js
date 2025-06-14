import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
    

  useEffect(() => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 2000,
    useNativeDriver: true,
  }).start(() => {
    navigation.replace('HomeTabs'); 
  });
}, []);


  return (
    <View style={styles.container}>
      <Animated.View style={[styles.centerContent, { opacity: fadeAnim }]}>
        <Image
          source={require('../assets/Personnel_and_Document_Icon.png')}
          style={styles.icon}
        />
        <Animated.Text style={styles.text}>
          Welcome to MyApp
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 300,
    height: 300,
  },
  text: {
    color: 'white',
    fontSize: 24,
    marginTop: 20,
  },
});

export default SplashScreen;