import { atom } from "jotai";

const totalProfitAtom = atom(1000);
const baseEmployeePayAtom = atom(10);
const baseIncomeAtom = atom(1);

export { totalProfitAtom, baseEmployeePayAtom, baseIncomeAtom};

/*export const economySelectors = {
    // Maintance cost for room. TODO Revisit and gradually increase with each room added
    increaseProfit: (value:number) => value
};*/