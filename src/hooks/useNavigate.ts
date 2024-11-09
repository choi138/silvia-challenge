import { useNavigation } from '@react-navigation/native';

import { RootStackParams } from 'src/types';

export const useNavigate = () => {
  const navigate = useNavigation().navigate as unknown as (
    screen: keyof RootStackParams,
    params?: RootStackParams[keyof RootStackParams],
  ) => void;

  return { navigate };
};
