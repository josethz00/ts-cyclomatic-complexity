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
    // first loop
    const mid = left + Math.floor((right - left) / 2);

    if (array[mid] === target) {
      // first conditional
      return mid;
    }

    if (array[mid] < target) {
      // second conditional
      left = mid + 1;
    } else {
      // third conditional
      right = mid - 1;
    }
  }

  if (left > array.length || array[left] != target) {
    // fourth conditional
    return -1;
  } else {
    // fifth conditional
    return left;
  }
}
