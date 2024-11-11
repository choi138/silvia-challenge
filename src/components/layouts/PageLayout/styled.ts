import { SafeAreaView } from 'react-native-safe-area-context';

import styled from '@emotion/native';

import { isAndroid } from 'src/utils';

export const PageLayoutContainer = styled(SafeAreaView)`
  flex: 1;
  row-gap: 40px;
  padding: 10px 20px ${isAndroid ? '20px' : 0} 20px;
`;
