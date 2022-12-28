import { View, ActivityIndicator,StyleSheet } from 'react-native';

export default LoadingOverlay = () => {
  return (
    <View style={styles.overlay}>
        <ActivityIndicator size="large" style={{zIndex: 1, flex: 1}} color='black'/>
    </View>
  );
}

const styles = StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 100,
    },
  });