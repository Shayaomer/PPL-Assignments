import * as R from "ramda";


const stringToArray = R.split("");

/* Question 1 */
export const countVowels = (input : string) : number => {return stringToArray(input).filter(vowelCheck).length}


const vowelCheck: (letter: string) => boolean = (letter) => {
    if('aeiou'.indexOf(letter.toLowerCase()) !== -1)
        return true
    return false
} 

/* Question 2 */
export const runLengthEncoding = (input : string) : string => {
    return R.groupWith(R.equals,stringToArray(input)).reduce((acc : string, cur : string[]):string =>cur.length >1? acc + cur[0]+cur.length : acc + cur[0],'')
};

/* Question 3 */
export const isPaired = (text : string) : boolean => {
    const input = stringToArray(text);
    const arr1 : number[] = R.scan((acc:number, cur:string) => cur === '{'? acc = acc +1 : cur === '}'? acc = acc -1: acc, 0 ,input)
    if(arr1.indexOf(-1) !== -1)
        return false;
        const arr2 : number[] = R.scan((acc:number, cur:string) => cur === '('? acc = acc +1 : cur === ')'? acc = acc -1: acc, 0 ,input)
    if(arr2.indexOf(-1) !== -1)
        return false;
        const arr3 : number[] = R.scan((acc:number, cur:string) => cur === '['? acc = acc +1 : cur === ']'? acc = acc -1: acc, 0 ,input)
    if(arr3.indexOf(-1) !== -1)
        return false;
    return (R.last(arr1) === 0 && R.last(arr2) === 0 && R.last(arr1) === 0);    
};
console.log(isPaired("((([[[{{{)}])}]]})"));

