import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Switch,
  Alert,
  Animated,
} from 'react-native';

interface SettingsScreenProps {
  onBack: () => void;
}

interface SettingRowProps {
  icon: string;
  label: string;
  value?: string;
  accentColor?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

const SettingRow: React.FC<SettingRowProps> = ({
  icon,
  label,
  value,
  accentColor = '#6C63FF',
  onPress,
  rightElement,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!onPress) return;
    Animated.spring(scaleAnim, {toValue: 0.97, useNativeDriver: true}).start();
  };

  const handlePressOut = () => {
    if (!onPress) return;
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{transform: [{scale: scaleAnim}]}}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={onPress ? 0.8 : 1}
        style={styles.settingRow}>
        <View style={[styles.iconBubble, {backgroundColor: `${accentColor}22`, borderColor: `${accentColor}44`}]}>
          <Text style={styles.rowIcon}>{icon}</Text>
        </View>
        <View style={styles.rowContent}>
          <Text style={styles.rowLabel}>{label}</Text>
          {value ? <Text style={[styles.rowValue, {color: accentColor}]}>{value}</Text> : null}
        </View>
        {rightElement ? (
          rightElement
        ) : onPress ? (
          <Text style={styles.chevron}>›</Text>
        ) : null}
      </TouchableOpacity>
    </Animated.View>
  );
};

const SectionHeader: React.FC<{title: string}> = ({title}) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

const SettingsScreen: React.FC<SettingsScreenProps> = ({onBack}) => {
  const [glowEnabled, setGlowEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const handleRate = () => {
    Alert.alert('Rate App', 'Thanks for using Neon Glow Icon Pack! Rating helps us grow.', [
      {text: 'Not Now', style: 'cancel'},
      {text: 'Rate ⭐', style: 'default'},
    ]);
  };

  const handleShare = () => {
    Alert.alert('Share', 'Share Neon Glow Icon Pack with friends!', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Share', style: 'default'},
    ]);
  };

  const handleReport = () => {
    Alert.alert(
      'Report Issue',
      'Describe your issue and we\'ll look into it.',
      [{text: 'OK'}],
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A1A" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.headerAccentLine} />
        </View>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* Appearance */}
        <SectionHeader title="APPEARANCE" />
        <View style={styles.card}>
          <SettingRow
            icon="✨"
            label="Glow Effects"
            accentColor="#6C63FF"
            rightElement={
              <Switch
                value={glowEnabled}
                onValueChange={setGlowEnabled}
                trackColor={{false: 'rgba(255,255,255,0.1)', true: 'rgba(108,99,255,0.5)'}}
                thumbColor={glowEnabled ? '#6C63FF' : 'rgba(255,255,255,0.3)'}
              />
            }
          />
          <View style={styles.separator} />
          <SettingRow
            icon="🎬"
            label="Animations"
            accentColor="#BF00FF"
            rightElement={
              <Switch
                value={animationsEnabled}
                onValueChange={setAnimationsEnabled}
                trackColor={{false: 'rgba(255,255,255,0.1)', true: 'rgba(191,0,255,0.5)'}}
                thumbColor={animationsEnabled ? '#BF00FF' : 'rgba(255,255,255,0.3)'}
              />
            }
          />
        </View>

        {/* Icon Pack Info */}
        <SectionHeader title="ICON PACK" />
        <View style={styles.card}>
          <SettingRow
            icon="🎨"
            label="Pack Name"
            value="Neon Glow"
            accentColor="#39FF14"
          />
          <View style={styles.separator} />
          <SettingRow
            icon="📦"
            label="Total Icons"
            value="7 Icons"
            accentColor="#00FFFF"
          />
          <View style={styles.separator} />
          <SettingRow
            icon="🚀"
            label="Supported Launchers"
            value="Nova, Apex, ADW & more"
            accentColor="#FF6600"
          />
        </View>

        {/* Support */}
        <SectionHeader title="SUPPORT" />
        <View style={styles.card}>
          <SettingRow
            icon="⭐"
            label="Rate App"
            accentColor="#FFD700"
            onPress={handleRate}
          />
          <View style={styles.separator} />
          <SettingRow
            icon="📤"
            label="Share App"
            accentColor="#1DB954"
            onPress={handleShare}
          />
          <View style={styles.separator} />
          <SettingRow
            icon="🐛"
            label="Report Issue"
            accentColor="#FF073A"
            onPress={handleReport}
          />
        </View>

        {/* About */}
        <SectionHeader title="ABOUT" />
        <View style={styles.card}>
          <SettingRow
            icon="👤"
            label="Developer"
            value="sagarprince05"
            accentColor="#FF00FF"
          />
          <View style={styles.separator} />
          <SettingRow
            icon="📋"
            label="Version"
            value="1.0.0"
            accentColor="#6C63FF"
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Neon Glow Icon Pack</Text>
          <Text style={styles.footerSub}>Made with ✨ by sagarprince05</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(108,99,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(108,99,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: '#6C63FF',
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '300',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  headerAccentLine: {
    marginTop: 4,
    width: 30,
    height: 2,
    backgroundColor: '#6C63FF',
    borderRadius: 2,
  },
  headerRight: {
    width: 40,
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 10,
    marginTop: 4,
    marginLeft: 4,
  },
  card: {
    backgroundColor: 'rgba(26,26,46,0.8)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    marginBottom: 24,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  iconBubble: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  rowIcon: {
    fontSize: 18,
  },
  rowContent: {
    flex: 1,
  },
  rowLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
  rowValue: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '400',
  },
  chevron: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 24,
    fontWeight: '300',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginLeft: 68,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 16,
  },
  footerText: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
  },
  footerSub: {
    color: 'rgba(255,255,255,0.1)',
    fontSize: 11,
    marginTop: 4,
  },
});

export default SettingsScreen;
