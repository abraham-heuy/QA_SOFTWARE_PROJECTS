//1. Check String Input
function is_string(input) {
    if (typeof input === 'string') {
        //console.log("The input is a string")
        return true
        }
    else{
        //console.log("The input is not a string, it is a: ", typeof input)}
        return false
}}

console.log(is_string('w3resource'))//true
console.log(is_string([1,2,4,0]))//false
// 2. check Blank string.
function is_Blank(string){
    if(string === "" || string === ''){
        return true
    }else{
        return false
    }
}
console.log(is_Blank(''))//true
console.log(is_Blank('abc')); // false
 //3. String to Array of words
 function string_to_array(data){
    return data.split(" ") 

 }
 console.log(string_to_array("Robin Singh"))// output is [ 'Robin', 'Singh' ]

//4. Extract Characters
function truncate_string(string, length){
    if(string.length>length){
        return string.substring(0 , length)

    }else{
        return string
    }

}
console.log(truncate_string("Robin Singh", 4)); // "Robi
//console.log(truncate_string("Rob", 4)); for the else conndition
//5. abbreviate name
function abbrev_name(str) {
    //trim any whitespases  and split the string  
    str = str.trim().split(" ")
    // check if the split data array contains  more than one element
    if(str.length > 1){
        return (str[0] +" " +  str[1].charAt(0) + ".")
    }else{
        return str[0]
    }
}
console.log(abbrev_name ("Robin Singh"));
//6. Hide Email address
function protect_email(str){
    const [localName, domainName] = str.split("@");
    if (localName.length > 5){
        //extract part of a string before the @ symbol which is split
        const protectEmail = localName.substring(0, 5) + "..."
        //concatenate the parts of the email to print out a hidden email. output will be= robin...@example.com
        return `${protectEmail}@${domainName}`
    }else{
        return str 
    }
}
console.log(protect_email("robin_singh@example.com")); //

//7. Parameterize String
function string_parameterize(par){
    //convert string first to lower case and trim it 
    //use the 
     par =  par.toLowerCase().trim(" ").replace(/[^a-zA-Z0-9 -]/, "").replace(/\s/g, "-")
     return par

}
console.log(string_parameterize("Robin Singh from USA."));

//8. Capitalize First Letter
function capitalize(letter){
    //access the first letter of the string using charAt() and then extract the other remaining letters to avoid repetition using substring()
    return letter.charAt(0).toUpperCase() + letter.substring(1);   
}
console.log(capitalize('js string exercises')); // "Js string exercises"

// 9. capitalize each first letter in a string
   function capitalize_Words(str) {
     return str.split(' '). map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')// map data into a new array and access it through index
   }
   console.log(capitalize_Words('js string exercises')); // "Js String Exercises"
   //10. swap Case
   //split the string the  string and then map each element into a new array char, then check that if each element is in lowercase/uppercase
   function swapcase(str) {
    return str.split('').map(char=> {return (char === char.toUpperCase())? char.toLowerCase(): char.toUpperCase()}).join('');
   }

console.log(swapcase('AaBbc')); // "aAbBC
//11. Camelize String
function camelize(string){
 return string.split(' ').map((word, index) => {return (index === 0 ) ? word : word.charAt(0).toUpperCase() + word.slice(1)}).join('')
}
console.log(camelize("JavaScript Exercises")); // "JavaScriptExercises"
// 12. Uncamelize String
function uncamelize(string, delimeter=(' ')){
    //look for a pattern in the string where there is lowercase followed by uppercase to replace
    return string.replace(/([a-z])([A-Z])/g, `$1${delimeter}$2`).toLowerCase()// g means global
}

console.log(uncamelize('helloWorld')); // "hello world"
console.log(uncamelize('helloWorld','-')); // "hello-world
// 13. Repeat the string
function repeat(str, num){
    // use the repeat method to to pass the number of times you want to repeat the string
    return str.repeat(num);
}
console.log(repeat('Ha!', 3)); // "Ha!Ha!Ha!"
//Insert in string
// the function should use three arguments
//for my case i'm going to pass the original string, the string to insert and the positin to insert the string into
function  insert(original, string_to_insert, position){
 // check if the position is a negative number or exceeds the length of the string
 if (position< 0 || position > original.length){
    return "Invalid position"
 } 
 //now return the string  with the added string. and use the slice method to produce a copy of the original string upto a specified position/index
 return original.slice(0, position) + string_to_insert + original.slice(position)
}
console.log(insert('We are doing some exercises.', 'JavaScript ', 18));
// "We are doing some JavaScript exercises."
//15. Humanize Format
// check for the last number after performing a modulos and assign it  to the correct suffix
//initialize the function and pass the argument number
function humanize_format(number){
    // declare a variable suffix to contain the suffix to assign to the number
    let suffix = (num)=>{
        if (num % 100 >= 11 && num % 100 <= 13) {//special case for numbers btn 11 to 13
            return "th"   
        }
    //use the switch  control structure to determine the suffix for numbers btn 1 - 10
    switch(num % 10) {
        case 1: return "st"
        case 2: return "nd"
        case 3: return "rd"
        default: return "th"

      }   
     
   }
return `${number}${suffix(number)}`
}
console.log(humanize_format(301)); // "301st
//16. Truncate String with Ellipsis
//first  check if the string length is greater than the number to truncate to
//my function will take three arguments, the string,the number to truncate, and the string to append
function text_truncate(string, number, ellipsis) {
    if (string.length > number){
        return string.slice(0, number - ellipsis.length) + ellipsis 
    }
    return str
}
console.log(text_truncate('We are doing JS string exercises.', 15, '!!'));// "We are doing !!"
//17.Chop String into Chunks
//first the function will accept parameters string and a size to break the string
//then loop through the string and break it and then create an array object of the chunks
function string_chop(str, size) {
    //create an array object
    let chunks = [];
    //loop through the string and push the chunks into the array object
    for (let i = 0; i < str.length; i+=size) {
        chunks.push(str.slice(i, i+size));
}
return chunks;
}
console.log(string_chop('w3resource', 3)); // ["w3r", "eso", "urc", "e"]
//18. Count Substring Occurrences
// the function takes the arguments string and the substring to check in the string
function count(string, substring){
    const regex = new RegExp(substring, "gi"); // g is a global notation to search for the occurence i the whoke strng while it is case insensitive using i
    const matches = string.match(regex) //The match method is used to find all occurrences of the substring in the string.
    return matches ? matches.length : 0 //check for the matches count and if none , it returns  0 instead
}
console.log(count("The quick brown fox jumps over the lazy dog", 'the'));// Output: 2
//19. Reverse Binary Representation
// the number is converted to a binary representation first and then reversed and converted again to decimal
 function reverse_binary(num){
    num = num.toString(2).split('').reverse().join('');
    return parseInt(num, 2)
 }
 console.log(reverse_binary(100)); // 19
 //20. Pad String to Length
 function formatted_string(padString, num, alignment) {  
    // Convert the number to a string  
    const stringNum = num.toString();  
    
    // Calculate the desired total length  
    const totalLength = Math.max(padString.length, stringNum.length);  
    
    // Pad the number accordingly  
    let paddedString;  
    if (alignment === 'l') {  
        // Left pad with zeros  
        paddedString = stringNum.padStart(totalLength, '0');  
    } else if (alignment === 'r') {  
        // Right pad with zeros  
        paddedString = stringNum.padEnd(totalLength, '0');  
    } else {  
        return ("Invalid alignment. Use 'l' for left or 'r' for right.");  
    }  

    return paddedString;  
}  
 
console.log(formatted_string('0000', 123, 'l')); // Output: "0123"






