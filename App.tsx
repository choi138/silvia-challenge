import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootStack } from 'src/navigators';
import { ModalProvider } from 'src/providers';

export default function App() {
  return (
    <SafeAreaProvider>
      <ModalProvider>
        <RootStack />
      </ModalProvider>
    </SafeAreaProvider>
  );
}
