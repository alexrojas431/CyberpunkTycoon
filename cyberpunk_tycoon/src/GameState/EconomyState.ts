import { atom } from "jotai";

const totalProfitAtom = atom(1000);
const baseEmployeePayAtom = atom(10);
const baseIncomeAtom = atom(1);

export { totalProfitAtom, baseEmployeePayAtom, baseIncomeAtom};