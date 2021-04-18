import { ClassExp, ProcExp, Exp, Program, CompoundExp, makeClassExp } from "./L31-ast";
import { Result, makeFailure } from "../shared/result";
import { CExp, makeIfExp, makeProcExp, makeStrExp, makeVarDecl, VarDecl } from "./L31-ast";
import { first, rest } from "../shared/list";
import { map } from "ramda";
import { makeNone } from "../shared/optional";

/*
Purpose: Transform ClassExp to ProcExp
Signature: for2proc(classExp)
Type: ClassExp => ProcExp
*/
export const class2proc = (exp: ClassExp): ProcExp =>
{
    const vars = exp.args;
    const body = makeProcExp([makeVarDecl("msg")], strComparsions("msg", exp)).body
    return makeProcExp(vars, body)
    
}

const strComparsions = (msg: String, exp: ClassExp): CExp[] =>
{  
    if (msg === 'first(exp.bindings).var')
        return [first(exp.bindings).val]
    else 
        return strComparsions(msg, makeClassExp(exp.args,rest(exp.bindings)))
}

/*
Purpose: Transform L31 AST to L3 AST
Signature: l31ToL3(l31AST)
Type: [Exp | Program] => Result<Exp | Program>
*/
export const L31ToL3 = (exp: Exp | Program): Result<Exp | Program> =>
{

return makeFailure("TODO");
}
   



