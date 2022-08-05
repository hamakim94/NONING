import React from 'react';
import LottieView from 'lottie-react-native';

const FireAnimation = () => {
  return (
    <LottieView
      source={require('@/assets/fire.json')}
      resizeMode="cover"
      autoPlay
      loop
    />
  );
};

export default FireAnimation;
