/**
 *
 * @param arr
 * @returns
 */
export function bubbleSort(arr: number[]): number[] {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    // 1
    for (let j = 0; j < len - i - 1; j++) {
      // 2
      if (arr[j] > arr[j + 1]) {
        // 3
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  // 4
  return arr;
}
