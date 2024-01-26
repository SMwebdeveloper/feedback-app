import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.samandar.app',
  appName: 'feedback',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
