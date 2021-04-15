import { ClassExp, ProcExp, Exp, Program } from "./L31-ast";
import { Result, makeFailure } from "../shared/result";
import { makeProcExp } from "../imp/L3-ast";
import { first, rest } from "../shared/list";
import { map } from "ramda";

/*
Purpose: Transform ClassExp to ProcExp
Signature: for2proc(classExp)
Type: ClassExp => ProcExp
*/
export const class2proc = (exp: ClassExp): ProcExp =>
{
    const vars = exp.args;
    const funcName = map(b => b.var, exp.bindings)
    const funcBody = map(b => b.val, exp.bindings)
    const body = []
    const makeFunc = map(b =>  , exp.bindings)
    makeProcExp(vars, [])
    
    
    
}
/*
Purpose: Transform L31 AST to L3 AST
Signature: l31ToL3(l31AST)
Type: [Exp | Program] => Result<Exp | Program>
*/
export const L31ToL3 = (exp: Exp | Program): Result<Exp | Program> =>
    makeFailure("TODO");
