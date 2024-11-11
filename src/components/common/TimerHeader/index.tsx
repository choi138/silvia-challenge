import React from 'react';

import { Text } from '../Text';
import { GoBackIcon } from '../GoBackIcon';

import * as S from './styled';

export interface TimerHeaderProps {
  time: string;
}

/**
 * 타이머 헤더 컴포넌트
 * @param time 표시할 시간
 */
export const TimerHeader: React.FC<TimerHeaderProps> = ({ time }) => {
  return (
    <S.TimerHeader>
      <GoBackIcon />
      <S.TextWrapper>
        <Text size={21} font="medium">
          {time}
        </Text>
      </S.TextWrapper>
    </S.TimerHeader>
  );
};
