// import React from 'react';

// export const HistoryCard: React.FC = () => {
//   return (
//     <S.Card>
//       <S.CardInnerContainer>
//         <Text size={15}>
//           {date.getMonth() + 1}월 {date.getDate()}일 {date.getHours() > 12 ? '오후' : '오전'}{' '}
//           {Math.floor(date.getHours() / 12)}시 {date.getMinutes()}분
//         </Text>
//         <S.ProgressBarContainer>
//           <ProgressBar progress={item.accuracy} text="정확도" variant="accuracy" />
//           <ProgressBar progress={item.avgReactionTime} text="반응속도" variant="avgReactionTime" />
//         </S.ProgressBarContainer>
//       </S.CardInnerContainer>
//       <S.ScoreContainer>
//         <Text size={26}>{item.score}점</Text>
//         <Tag variant={item.score < 0.5 ? 'danger' : 'safe'} size="small">
//           {item.score < 0.5 ? '위험' : '안전'}
//         </Tag>
//       </S.ScoreContainer>
//     </S.Card>
//   );
// };
