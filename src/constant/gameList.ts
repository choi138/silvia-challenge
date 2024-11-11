import { ImageSourcePropType } from 'react-native';

import { BabyPNG, HandUpPNG, ThinkingPNG, Umbrella3DPNG } from 'src/assets';
import { RootStackParams } from 'src/types';

export interface GameItem {
  gif: ImageSourcePropType;
  title: string;
  description: string;
  linkTo?: keyof RootStackParams;
}

export const GAME_LIST: GameItem[] = [
  {
    gif: Umbrella3DPNG,
    title: '같은 그림 찾기',
    description: '쌍 찾기',
    linkTo: 'GameStart',
  },
  {
    gif: BabyPNG,
    title: '얼굴 연관 그림 찾기',
    description: '기억',
  },
  {
    gif: HandUpPNG,
    title: '반복해서 누르기',
    description: '팔 운동 능력',
  },
  {
    gif: ThinkingPNG,
    title: '반응 속도 측정',
    description: '집중력',
  },
];
