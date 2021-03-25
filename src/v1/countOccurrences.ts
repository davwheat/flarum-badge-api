/**
 * Counts the number of times a substring appears in a string.
 *
 * @param str String to look in
 * @param checkWord Substring to look for
 * @returns Instances of Substring in String
 */
export default function countOccurrences(str: string, checkWord: string) {
  return str.split(checkWord).length - 1
}
