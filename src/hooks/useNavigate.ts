import { CommonActions, useNavigation } from '@react-navigation/native';

import { RootStackParams } from 'src/types';

export const useNavigate = () => {
  const navigation = useNavigation();

  const navigate = navigation.navigate as unknown as (
    screen: keyof RootStackParams,
    params?: RootStackParams[keyof RootStackParams],
  ) => void;

  const initNavigate = (name: string) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: name }],
      }),
    );
  };

  return { navigate, initNavigate };
};
