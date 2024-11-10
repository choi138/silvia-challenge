/**
 *  00:00 형식으로 시간을 포맷팅합니다
 * @example formatTime(65) // 01:05
 */
export const formatTime = (number: number) => {
  const minutes = Math.floor(number / 60);
  const seconds = number % 60;

  return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};
