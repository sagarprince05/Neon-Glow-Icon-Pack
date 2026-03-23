import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';

type Screen = 'home' | 'settings';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home');

  return (
    <SafeAreaView style={styles.container}>
      {screen === 'home' ? (
        <HomeScreen onNavigateSettings={() => setScreen('settings')} />
      ) : (
        <SettingsScreen onBack={() => setScreen('home')} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1A',
  },
});

export default App;
