export class Format {
  /** 날짜 포맷팅
   * @param date 포맷할 날짜
   * @returns 포맷팅된 날짜 (ex. 1월 1일 오전 1시 30분)
   */
  static date = (date: Date): string => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours > 12 ? '오후' : '오전';
    const formattedHours = hours > 12 ? hours - 12 : hours;

    return `${month}월 ${day}일 ${period} ${formattedHours}시 ${minutes}분`;
  };

  /**
   * 리스트 포맷팅
   * @param list 포맷할 리스트
   * @returns 포맷팅된 리스트 (ex. [{ value: 1.0 }, { value: 2.0 }])
   */
  static list = <T extends number>(list: T[]): { value: number }[] => {
    return list.map((time) => ({
      value: Number(time.toFixed(1)),
    }));
  };

  /**
   * 시간 포맷팅
   * @param number 포맷할 시간 (초)
   * @returns 포맷팅된 시간 (ex. 01:30)
   */
  static time = (number: number) => {
    const minutes = Math.floor(number / 60);
    const seconds = number % 60;

    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };
}
