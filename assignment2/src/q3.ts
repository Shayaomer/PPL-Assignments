import { ClassExp, ProcExp, Exp, Program, CompoundExp, makeClassExp, isAppExp, makeAppExp, isProcExp, isLetExp, isClassExp, makePrimOp, makeVarRef, Binding, IfExp, makeLetExp } from "./L31-ast";
import { Result, makeFailure, makeOk } from "../shared/result";
import { CExp, makeIfExp, makeProcExp, makeStrExp, makeVarDecl, VarDecl } from "./L31-ast";
import { first, rest } from "../shared/list";
import { map } from "ramda";
import { makeNone } from "../shared/optional";
import { isCExp, isDefineExp, isExp, isProgram, makeDefineExp, makeProgram } from "./L31-ast";
import { isAtomicExp, isIfExp, isLitExp, makeBoolExp, makeLitExp } from "../imp/L3-ast";

/*
Purpose: Transform ClassExp to ProcExp
Signature: for2proc(classExp)
Type: ClassExp => ProcExp
*/
export const class2proc = (exp: ClassExp): ProcExp =>
{
    const vars = exp.args;
    const body = makeProcExp([makeVarDecl("msg")], [statementMaker(exp.bindings)])
    return makeProcExp(vars, [body])
    
}

const statementMaker = (exp: Binding[]): CExp =>
{  
    const test : CExp = makeAppExp(makePrimOp('eq?'), [makeVarRef("msg"), makeLitExp(`'${first(exp).var.var}`)]); 
    if(rest(exp).length != 0){
        const a = first(exp).val
        if (isProcExp(a)) {
            return makeIfExp(test, makeAppExp(makeProcExp(a.args, a.body),[]), statementMaker(rest(exp)));
        }
        else
            return makeIfExp(test, first(exp).val, statementMaker(rest(exp)))
    }
    else{
        const a = first(exp).val
        if (isProcExp(a)) {
            return makeIfExp(test, makeAppExp(makeProcExp(a.args, a.body),[]), makeBoolExp(false))
        }
        else
        return makeIfExp(test, first(exp).val, statementMaker(rest(exp)))
    }
}
/*
Purpose: Transform L31 AST to L3 AST
Signature: l31ToL3(l31AST)
Type: [Exp | Program] => Result<Exp | Program>
*/
export const L31ToL3 = (exp: Exp | Program): Result<Exp | Program> =>
{
    
    return isExp(exp) ? makeOk(ExpToL3(exp)) :
    isProgram(exp) ? makeOk(makeProgram(map(ExpToL3, exp.exps))) :
    exp;
}

const ExpToL3 = (exp: Exp): Exp =>{
    return isCExp(exp) ? CExpToL3(exp) :
    isDefineExp(exp) ? makeDefineExp(exp.var, CExpToL3(exp.val)) :
    exp
}


const CExpToL3 = (exp: CExp): CExp => {
    return isAtomicExp(exp) ? exp :
    isLitExp(exp) ? exp :
    isIfExp(exp) ? makeIfExp(CExpToL3(exp.test),
    CExpToL3(exp.then),
    CExpToL3(exp.alt)) :
    isAppExp(exp) ? makeAppExp(CExpToL3(exp.rator),
    map(CExpToL3, exp.rands)) :
    isProcExp(exp) ? makeProcExp(exp.args,
    map(CExpToL3, exp.body)) :
    isLetExp(exp) ? makeLetExp(exp.bindings, exp.body) :
    isClassExp(exp) ? class2proc(exp) :
    exp;
    }
   



