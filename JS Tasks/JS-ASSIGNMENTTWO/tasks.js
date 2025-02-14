//1. Check if a String is a Palindrome
//check if a number a  the same when read in forward or backwords
function isPalindrome(str){
    let cleanedStr = str.toLowerCase().replace(/[\s+,.*-?]/g , '')
    let reverseString = cleanedStr.toLowerCase().split('').reverse().join('')   
   return (cleanedStr === reverseString)
  
}

console.log(isPalindrome("A man, a plan, a canal, panama"))//true
console.log(isPalindrome("Was it a car or a cat I saw?"))//true;
console.log(isPalindrome("Hello, world!"))//false

/* 2. Reverse a String
Write a function to reverse a given string.
 */
function reverse(str) {
    return str.split('').reverse().join('');
}
console.log(reverse("Hello world"));
console.log(reverse("string"));
 // 3. Find the Longest Palindromic Substring
 function longestPalindromicSubstring(s) {  
    function checkPal(s, low, high) {  
        while (low >= 0 && high < s.length && s[low] === s[high]) {  
            low--;  
            high++;  
        }  
        return high - low - 1; // Return the length of the palindrome  
    }  

    const n = s.length;  
    let len = 0;  
    let count = 0;  

    for (let i = 0; i < n; i++) {  
        // Check for odd-length palindromes  
        let len1 = checkPal(s, i, i);  
        // Check for even-length palindromes  
        let len2 = checkPal(s, i, i + 1);  
        let currentLen = Math.max(len1, len2);  

        if (currentLen > len) {  
            len = currentLen;  
            // Calculate start index based on currentLen  
            count = i - Math.floor((len - 1) / 2);  
        }  
    }  

    return s.substring(count, count + len);  
}  

console.log(longestPalindromicSubstring("babab")); // Output: "bab" or "aba"
console.log(longestPalindromicSubstring("cbbd")); // Output: "bab" or "aba"

// 4. Check if Two Strings are Anagrams
// Write a function to check if two given strings are anagrams of each other. Two strings are anagrams if they contain the same characters in the same frequency but in different orders.

function areAnagrams(str1, str2){
    str1 = str1.toLowerCase().replace(/\s+/g, '');
    str2 = str2.toLowerCase().replace(/\s+/g, '');
    // return str1 +' '+ str2
    if (str1.length !== str2.length) return false;

    return str1.split('').sort().join('') === str2.split('').sort().join('');// sort function orders the data and then === checks whether the sorted data is equal

}
console.log(areAnagrams('Listen', 'Silent'))//true
console.log(areAnagrams('Hello', 'World'))//false
 /* 5. Remove Duplicates from a String
Write a function to remove duplicate characters from a string while preserving the order of the first appearance of each character.

 */
function removeDuplicates(str) {  
    str = str.split('');  
    let characters = [];  

    for (let i = 0; i < str.length; i++) {    
        if (characters.indexOf(str[i]) === -1) {  
            characters.push(str[i]);  
        }  
    }  

    return characters.join('');  
}  
console.log(removeDuplicates("programming"));// Output: "programin"
console.log(removeDuplicates("hello world"));// Output: "helo wrd"
console.log(removeDuplicates("aaaaaa")); // Output: "a"
console.log(removeDuplicates("abcd"));
console.log(removeDuplicates("aabbcc"));// Output: "abc"
/* 6. Count Palindromes in a String
Write a function to count how many distinct palindromes are in a given string. A palindrome is considered distinct based on its start and end position in the string.
 */
function countPalindromes(s) {
    function isPalindrome(s, i, j) {
        while (i < j) {
            if (s[i] !== s[j]) {
                return false;
            }
            i++;
            j--;
        }
        return true;
    }

    let len = s.length;
    let result = 0;

    for (let i = 0; i < len; i++) {
        for (let j = i; j < len; j++) {
            if (isPalindrome(s, i, j)) {
                result++;
            }
        }
    }

    return result;
}

console.log(countPalindromes("ababa")); // Output: 9
  console.log(countPalindromes("racecar")); // Output: 10
console.log(countPalindromes("aabb")); // Output: 7
console.log(countPalindromes("ababa"));// output 7
console.log(countPalindromes("a"));
console.log(countPalindromes("abc"));

/* 7. Longest Common Prefix
Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.
 */
function longestCommonPrefix(strs) {
    if (strs.length === 0) return "";

    let prefix = strs[0]; // Start with the first word as the prefix

    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) { 
            prefix = prefix.substring(0, prefix.length - 1); 
            if (prefix === "") return "";
        }
    }

    return prefix;
}
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // Output: "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"])); // Output: ""
console.log(longestCommonPrefix(["interspecies", "interstellar", "interstate"])); // Output: "inters"
console.log(longestCommonPrefix(["prefix", "prefixes", "preform"])); // Output: "pref"
console.log(longestCommonPrefix(["apple", "banana", "cherry"])); // Output: ""



/*  8. Case Insensitive Palindrome
Modify the palindrome function to be case insensitive, meaning it should ignore upper and lower case differences when checking for a palindrome.
 */
function isCaseInSensitivePalindrome(str){
    let cleanedStr = str.toLowerCase().replace(/[\s+,.*-?]/g , '')
    let reverseString = cleanedStr.toLowerCase().split('').reverse().join('')  
    if (cleanedStr.toLowerCase() === reverseString.toLowerCase()) { 
   return (cleanedStr === reverseString)}else{return false}

}
console.log(isCaseInSensitivePalindrome("Aba"));//true
console.log(isCaseInSensitivePalindrome("Racecar"));//true
console.log(isCaseInSensitivePalindrome("Palindrome"));//false
console.log(isCaseInSensitivePalindrome("Madam"));//true
console.log(isCaseInSensitivePalindrome("Hello"));//false

