/** 00:00 형식으로 시간을 포맷팅합니다 */
export const formatTime = (number: number) => {
  return number.toString().padStart(2, '0').padStart(5, '00:');
};
