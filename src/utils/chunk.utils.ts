/**  목록을 n개씩 나눠줍니다 */
export const chunk = <T>(arr: T[], size: number) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};
