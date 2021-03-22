import * as R from "ramda";


const stringToArray = R.split("");

/* Question 1 */
export const countVowels = (input : string) : number => {return stringToArray(input).filter(vowelCheck).length}


const vowelCheck: (letter: string) => boolean = (letter) => {
    return ('aeiou'.indexOf(letter.toLowerCase()) !== -1)
} 

/* Question 2 */
export const runLengthEncoding: (input : string) => string = (input : string) =>
{
    return R.groupWith(R.equals, stringToArray(input)).reduce((acc : string, cur : string[]):string =>cur.length >1? acc + cur[0]+cur.length : acc + cur[0],'')
}
;



/* Question 3*/
export const isPaired = 
    R.pipe((input : string)=> stringToArray(input),
        (input :string[]) => R.filter((z: string)=> "(){}[]".indexOf(z)!== -1, input),
        (input: string []) => R.reduce((acc:string[], cur: string)=> cur === '}' || cur === ')' || cur === ']'? 
            acc[0] === paranth[cur] ? 
                acc = acc.slice(1): 
                acc = acc.concat('F') :
            acc = [cur].concat(acc), [], input),
        (y : string[]) => {return y.length ===0});
    
interface par {
    '}' : string,
    ')' : string,
    ']' : string
    
}
const paranth : par= {
    '}' : '{',
    ')' : '(',
    ']' : '['
}


