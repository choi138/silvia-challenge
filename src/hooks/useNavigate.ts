import { CommonActions, useNavigation } from '@react-navigation/native';

import { RootStackParams } from 'src/types';

/**
 * 네비게이션을 사용할 수 있는 훅
 * @return navigate, initNavigate
 */
export const useNavigate = () => {
  const navigation = useNavigation();

  /** 스택을 가지고 이동시킵니다. */
  const navigate = navigation.navigate as unknown as (
    screen: keyof RootStackParams,
    params?: RootStackParams[keyof RootStackParams],
  ) => void;

  /** 초기화된 스택을 가지고 이동시킵니다. */
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
