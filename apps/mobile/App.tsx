import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { initSentry } from './lib/sentry';
import { initPostHog } from './lib/posthog';

initSentry();
initPostHog();

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shift Mobile</Text>
      <Text style={styles.subtitle}>Field-ready updates are coming soon.</Text>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});
