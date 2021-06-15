#lang racket

(provide (all-defined-out))

(define integers-from
  (lambda (n)
    (cons-lzl n (lambda () (integers-from (+ n 1))))))

(define cons-lzl cons)
(define empty-lzl? empty?)
(define empty-lzl '())
(define head car)
(define tail
  (lambda (lzl)
    ((cdr lzl))))

;; Signature: take(lz-lst,n)
;; Type: [LzL*Number -> List]
;; If n > length(lz-lst) then the result is lz-lst as a List
(define take
  (lambda (lz-lst n)
    (if (or (= n 0) (empty-lzl? lz-lst))
      empty-lzl
      (cons (head lz-lst)
            (take (tail lz-lst) (- n 1))))))

; Signature: nth(lz-lst,n)
;; Type: [LzL*Number -> T]
;; Pre-condition: n < length(lz-lst)
(define nth
  (lambda (lz-lst n)
    (if (= n 0)
        (head lz-lst)
        (nth (tail lz-lst) (- n 1)))))

;;; Q1.1
; Signature: append$(lst1, lst2, cont) 
; Type: [List * List * [List -> T]] -> T
; Purpose: Returns the concatination of the given two lists, with cont pre-processing
(define append$
 (lambda (lst1 lst2 cont)
   (if (empty? lst1)
       (cont lst2)
       (append$ (cdr lst1) lst2 (lambda (res) 
                                    (cont (cons (car lst1) res)))))))

;;; Test for append$:
;(append$ '(1 2) '(3 4) (lambda (x) x))

;;; Q1.2
; Signature: equal-trees$(tree1, tree2, succ, fail) 
; Type: [Tree * Tree * [Tree ->T1] * [Pair->T2] -> T1 U T2
; Purpose: Determines the structure identity of a given two lists, with post-processing succ/fail
(define leaf? (lambda (x) (not (list? x))))
(define equal-trees$ 
 (lambda (tree1 tree2 succ fail)
  (cond
    ((and (empty? tree1) (empty? tree2)) (succ '()))
    ((and (not (list? tree1)) (not (list? tree2))) (succ (cons tree1 tree2)))
    ((and (list? tree1) (list? tree2)) 
      (equal-trees$ (car tree1) (car tree2) (lambda (car-tree) 
        (equal-trees$ (cdr tree1) (cdr tree2) (lambda (cdr-tree) (succ (cons car-tree cdr-tree))) fail)) fail)
    )
    (else (fail (cons tree1 tree2)))
  )
 )
)

;;; Q2a
; Signature: reduce1-lzl(reducer, init, lzl) 
; Type: [T2*T1 -> T2] * T2 * LzL<T1> -> T2
; Purpose: Returns the reduced value of the given lazy list
(define reduce1-lzl 
  (lambda (reducer init lzl)
    (cond 
      ((empty-lzl? lzl) init)
      (else (reduce1-lzl reducer (reducer init (head lzl)) (tail lzl)))
    )
  )
)  

;;; Q2b
; Signature: reduce2-lzl(reducer, init, lzl, n) 
; Type: [T2*T1 -> T2] * T2 * LzL<T1> * Number -> T2
; Purpose: Returns the reduced value of the first n items in the given lazy list
(define reduce2-lzl 
  (lambda (reducer init lzl n)
    (cond 
      ((= n 0) init)
      ((empty-lzl? lzl) init)
    (else (reduce2-lzl reducer (reducer init (head lzl)) (tail lzl) (- n 1)))
    )
  )
)  

;;; Q2c
; Signature: reduce3-lzl(reducer, init, lzl) 
; Type: [T2 * T1 -> T2] * T2 * LzL<T1> -> Lzl<T2>
; Purpose: Returns the reduced values of the given lazy list items as a lazy list
(define reduce3-lzl 
  (lambda (reducer init lzl)
    (cond 
      ((empty-lzl? lzl) init)
      (else (cons-lzl (reducer init (head lzl)) (lambda () (reduce3-lzl reducer (reducer init (head lzl)) (tail lzl)))))
    )
  )
)  
 
;;; Q2e
; Signature: integers-steps-from(from,step) 
; Type: Number * Number -> Lzl<Number>
; Purpose: Returns a list of integers from 'from' with 'steps' jumps
(define integers-steps-from
  (lambda (from step)
    (cons-lzl from (lambda () (integers-steps-from (+ from step) step)))))

;;;Helping methods for 2.f:

;; Signature: lzl-map(f, lz)
;; Type: [[T1 -> T2] * Lzl(T1) -> Lzl(T2)]
(define lzl-map
  (lambda (f lzl)
    (if (empty-lzl? lzl)
        lzl
        (cons-lzl (f (head lzl))
                  (lambda () (lzl-map f (tail lzl)))))))

;; Objects for the pi-lzl method
(define lhs-lzl
    (integers-steps-from 1 4))
(define rhs-lzl
    (integers-steps-from 3 4))

;; Signature: pi-lzl(l-lzl, r-lzl)
;; Type: [Lzl<Number> * Lzl<Number> -> Lzl<Number>]
;; Purpouse: Calculating the items of the approximation as a lazy-list
(define pi-lzl
  (lambda (l-lzl r-lzl)
    (cons-lzl (/ 1 (* (head l-lzl) (head r-lzl))) (lambda ()
                         (pi-lzl (tail l-lzl) (tail r-lzl))))))


;;; Q2f
; Signature: generate-pi-approximations() 
; Type: Empty -> Lzl<Number>
; Purpose: Returns the approximations of pi as a lazy list
(define generate-pi-approximations
  (lambda ()
    (reduce3-lzl + 0 (lzl-map (lambda (x) (* 8 x)) (pi-lzl lhs-lzl rhs-lzl))) 
   )
 )



 

   