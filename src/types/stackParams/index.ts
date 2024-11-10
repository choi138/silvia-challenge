import { GameStackParamList } from './game.type';

export type RootStackParams = GameStackParamList & {
  Main: undefined;
  History: undefined;
};
