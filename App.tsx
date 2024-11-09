import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootStack } from 'src/navigators';

export default function App() {
  return (
    <SafeAreaProvider>
      <RootStack />
    </SafeAreaProvider>
  );
}
