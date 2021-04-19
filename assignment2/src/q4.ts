import { map } from 'ramda';
import { AppExp, CExp, Exp, isAppExp, isBoolExp, isDefineExp, isIfExp, isNumExp, isPrimOp, isProcExp, isProgram, isStrExp, isVarRef, PrimOp, ProcExp, Program, VarDecl } from '../imp/L3-ast';
import { Result, makeFailure, makeOk } from '../shared/result';
import { isNumber, isString } from '../shared/type-predicates';

/*
Purpose: Transform L2 AST to Python program string
Signature: l2ToPython(l2AST)
Type: [EXP | Program] => Result<string>
*/
export const l2ToPython = (exp: Exp | Program): Result<string>  => 
    makeOk(unparseL2ToPython(exp))

const unparseL2ToPython = (exp : Exp | Program) : string =>
    isBoolExp(exp) ? valueToString(exp.val) :
    isNumExp(exp) ? valueToString(exp.val) :
    isStrExp(exp) ? valueToString(exp.val) : 
    isVarRef(exp) ? exp.var :
    isProcExp(exp) ? unparseProcExp(exp) :
    isIfExp(exp) ? `(${unparseL2ToPython(exp.then)} if ${unparseL2ToPython(exp.test)} else ${unparseL2ToPython(exp.alt)})` :
    isAppExp(exp) ? unparseAppExp(exp):
    isPrimOp(exp) ? exp.op :
    isDefineExp(exp) ? `${exp.var.var} = ${unparseL2ToPython(exp.val)}` :
    isProgram(exp) ? map(unparseL2ToPython, exp.exps).join("\n"):
    "";


const valueToString = (val : number | string | boolean) : string =>
    isNumber(val) ? val.toString() :
    val === true ? 'True' :
    val === false ? 'False' :
    isString(val) ? `"${val}"` :
    val;

const unparseProcExp = (pe : ProcExp) : string =>
    `(lambda ${map((p : VarDecl) => p.var, pe.args).join(",")} : ${unparseL2ToPython(pe.body[0])})`;

const unparseAppExp = (ae : AppExp) : string =>
    isPrimOp(ae.rator) ?  isClassic(ae.rator.op) ? `(${map(unparseL2ToPython, ae.rands).join(` ${ae.rator.op} `)})`:
    parsePrim(ae.rator, ae.rands) :
    `${unparseL2ToPython(ae.rator)}(${map(unparseL2ToPython, ae.rands).join(",")})`;

const parsePrim = (rat : PrimOp, rands : CExp[]) : string =>
    rat.op == "boolean?" ? `((lambda x : (type(x) == bool)) (${map(unparseL2ToPython,rands).join(",")}))` : 
    rat.op == "number?" ? `((lambda x : (type(x) == int or type(x) == float)) (${map(unparseL2ToPython,rands).join(",")}))` : 
    rat.op == "eq?" || rat.op == "=" ? `(${map(unparseL2ToPython, rands).join(" == ")})`:
    rat.op == "not" ? `(not ${map(unparseL2ToPython, rands).join(" ")})`: "";

const isClassic = (op : string) : boolean =>
    ["+", "-", ">", "<", "*", "/", "and", "or"].includes(op)