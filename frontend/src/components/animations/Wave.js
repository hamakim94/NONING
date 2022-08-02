import React from "react";
import LottieView from "lottie-react-native";

const WaveAnimation = () => {
    return <LottieView source={require('@/assets/wave.json')} autoPlay loop />;
}

export default WaveAnimation;