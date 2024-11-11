export interface FormatListReturnType {
  value: number;
}

export const formatList = <T extends number>(list: T[]): FormatListReturnType[] => {
  const formattedReactionTimeList = list.map((time) => ({
    value: Number(time.toFixed(1)),
  }));

  return formattedReactionTimeList;
};
