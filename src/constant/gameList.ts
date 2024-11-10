import { ImageSourcePropType } from 'react-native';

import { BabyGIF, HandUpGIF, ThinkingGIF, UmbrellaGIF } from 'src/assets';
import { RootStackParams } from 'src/types';

export interface GameItem {
  gif: ImageSourcePropType;
  title: string;
  description: string;
  linkTo?: keyof RootStackParams;
}

export const GAME_LIST: GameItem[] = [
  {
    gif: UmbrellaGIF,
    title: '같은 그림 찾기',
    description: '쌍 찾기',
    linkTo: 'GameStart',
  },
  {
    gif: BabyGIF,
    title: '얼굴 연관 그림 찾기',
    description: '기억',
  },
  {
    gif: HandUpGIF,
    title: '반복해서 누르기',
    description: '팔 운동 능력',
  },
  {
    gif: ThinkingGIF,
    title: '반응 속도 측정',
    description: '집중력',
  },
];
