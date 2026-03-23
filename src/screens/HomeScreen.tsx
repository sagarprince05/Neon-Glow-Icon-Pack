import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Animated,
  NativeModules,
  Alert,
  TouchableOpacity,
} from 'react-native';
import IconCard from '../components/IconCard';
import GlowButton from '../components/GlowButton';

const {IconPackModule} = NativeModules;
// Icon data with local images and accent colors
const ICONS_DATA = [
  {
    name: 'WhatsApp',
    image: require('../assets/whatsapp.png'),
    accentColor: '#39FF14',
  },
  {
    name: 'Instagram',
    image: require('../assets/instagram.png'),
    accentColor: '#FF00FF',
  },
  {
    name: 'YouTube',
    image: require('../assets/youtube.png'),
    accentColor: '#FF073A',
  },
  {
    name: 'Facebook',
    image: require('../assets/facebook.png'),
    accentColor: '#0080FF',
  },
  {
    name: 'Chrome',
    image: require('../assets/chrome.png'),
    accentColor: '#00FFFF',
  },
  {
    name: 'Camera',
    image: require('../assets/camera.png'),
    accentColor: '#FF6600',
  },
  {
    name: 'Settings',
    image: require('../assets/settings.png'),
    accentColor: '#BF00FF',
  },
];

interface HomeScreenProps {
  onNavigateSettings: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({onNavigateSettings}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const [iconCount, setIconCount] = useState(7);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Load icon pack info from native module
    loadIconPackInfo();
  }, []);

  const loadIconPackInfo = async () => {
    try {
      const info = await IconPackModule.getIconPackInfo();
      setIconCount(info.iconCount);
    } catch (error) {
      console.log('Native module not available, using defaults');
    }
  };

  const handleApplyIcons = async () => {
    try {
      const result = await IconPackModule.openLauncherSettings();
      if (result === 'fallback') {
        Alert.alert(
          'Apply Icon Pack',
          'To apply this icon pack:\n\n1. Open your launcher settings\n2. Go to "Look & Feel" or "Themes"\n3. Select "Neon Glow Icons"\n\nSupported launchers: Nova, Apex, ADW, Smart Launcher, Action Launcher, Lawnchair',
          [{text: 'Got it!', style: 'default'}],
        );
      }
    } catch (error) {
      Alert.alert(
        'Apply Icon Pack',
        'To apply this icon pack:\n\n1. Open your launcher settings\n2. Go to "Look & Feel" or "Themes"\n3. Select "Neon Glow Icons"\n\nSupported launchers: Nova, Apex, ADW, Smart Launcher, Action Launcher, Lawnchair',
        [{text: 'Got it!', style: 'default'}],
      );
    }
  };

  const handleViewLaunchers = async () => {
    try {
      const launchers = await IconPackModule.getInstalledLaunchers();
      const names = launchers.map((l: any) => `• ${l.label}`).join('\n');
      Alert.alert('Installed Launchers', names || 'No launchers found');
    } catch (error) {
      Alert.alert('Info', 'Could not detect installed launchers');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A1A" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}],
            },
          ]}>
          <TouchableOpacity
            onPress={onNavigateSettings}
            style={styles.settingsButton}
            activeOpacity={0.7}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
          <Text style={styles.title}>✨ Neon Glow</Text>
          <Text style={styles.subtitle}>Icon Pack</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{iconCount} Icons</Text>
          </View>
        </Animated.View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Section Title */}
        <Animated.View
          style={[styles.sectionHeader, {opacity: fadeAnim}]}>
          <Text style={styles.sectionTitle}>Icon Preview</Text>
          <Text style={styles.sectionSubtitle}>
            Dark theme • Neon glow accents
          </Text>
        </Animated.View>

        {/* Icon Grid */}
        <View style={styles.iconGrid}>
          {ICONS_DATA.map((icon, index) => (
            <IconCard
              key={icon.name}
              name={icon.name}
              image={icon.image}
              accentColor={icon.accentColor}
              index={index}
            />
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonSection}>
          <GlowButton
            title="Apply Icon Pack"
            onPress={handleApplyIcons}
            colors={['#6C63FF', '#4A42D4']}
            icon="🎨"
          />

          <View style={{height: 14}} />

          <GlowButton
            title="View Launchers"
            onPress={handleViewLaunchers}
            colors={['#1DB954', '#168D40']}
            icon="🚀"
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Compatible with Nova, Apex, ADW, Smart Launcher & more
          </Text>
          <Text style={styles.version}>v1.0.0 • by sagarprince05</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1A',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  badge: {
    marginTop: 16,
    backgroundColor: 'rgba(108, 99, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.4)',
  },
  badgeText: {
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginHorizontal: 30,
    marginVertical: 20,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
  },
  buttonSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 30,
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.3)',
    textAlign: 'center',
    lineHeight: 18,
  },
  version: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.2)',
    marginTop: 8,
  },
  settingsButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: -10,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(108,99,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(108,99,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 18,
  },
});

export default HomeScreen;
