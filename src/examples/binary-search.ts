/**
 *
 * @param array
 * @param target
 * @returns
 */
export function binarySearch(array: number[], target: number): number {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    // 1
    const mid = left + Math.floor((right - left) / 2);

    if (array[mid] === target) {
      // 2
      return mid;
    }

    if (array[mid] < target) {
      // 3
      left = mid + 1;
    } else {
      // 4
      right = mid - 1;
    }
  }

  if (left > array.length || array[left] != target) {
    // 5
    return -1;
  } else {
    // 6
    return left;
  }
}
