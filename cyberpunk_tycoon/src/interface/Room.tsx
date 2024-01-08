export interface Room {
    //[x: string]: any;
    id: number;
    x: number;
    y: number;
    upgradeLevel: number;
    cost: number;
    baseIncome: number;
    customerPresent: boolean;
    numOfEmployees: number;
    baseMaintanceModifier: number;
    baseTimeTaskCompletion: number;
    taskComplete: boolean;
    //globalX: number;
    //globalY: number;
};