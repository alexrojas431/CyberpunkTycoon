//https://gameanalytics.com/blog/idle-game-mathematics/

/* 
Overall Goal:

- Only money mechanic
    - Buy rooms
    - Make Revenue mechanic/math
    - Based when customer enters room
    - Room Maintenance/rent
    - Certain money threshold is the win condition



- State (Things to keep track of)
    - Num of "Generators" (Rooms)
    - Seperate Room State
        - Upgrade Room Level ("Multiplier")
        - Room Cost
        - CustomerInRoom (Boolean)
        - NumOfEmployeesInRoom (Count)
        - Room Maintance
            - TotalProfit -= (For Each Room Sum -> (Room Base Maintance * Upgrade Room Level))
            - Will subtract every second
        - Time to Complete Task
            - TaskCompletionTime = (BaseTime) - (BaseTime*.25 * (NumOfEmployees - 1)) 
            - Will cut down Task Time by 25% if two employees in room. Otherwise, use BaseTime
        - Task Complete (Boolean)
            - Must add Room Production then turn this boolean false
    - Room Production Rate
        - TotalProfit += Base Income * (Certain Generator Basic Income * Room Multiplier)
        - Will add if a customer has completed room
    - Revenue Per Second
        - TODO
    - Employee Pay
        - TotalProfit -= (Employee * BaseEmployeePay)
    - ProfitGoal

- Will need to make scenerios with seperate values (for all above) 
  and generate spreadsheets to see if values are balanced
*/

import {useState} from 'react';

const room = {
 upgradeLevel: 1,
 cost: 100,
 baseIncome: 10,
 customerPresent: false,
 numOfEmployees: 0,
 baseMaintanceModifier: 100,
 baseTimeTaskCompletion: 2, //seconds
 taskComplete: false,
 getRoomMaintance: function() {
    return this.baseMaintanceModifier * this.cost;
 },
 getTaskCompletionTime: function() {
    return this.baseTimeTaskCompletion - (this.baseTimeTaskCompletion*.25 * (this.numOfEmployees - 1));
 },
 getRoomIncome: function(baseIncome:number) {
    return baseIncome * (this.baseIncome * this.upgradeLevel)
 }
};

function MoneySystem() {

    const [totalProfit, setTotalProfit] = useState(3000);

    let baseIncome = 1;
    let totalEmployees = 0;
    let baseEmployeePay = 2;
    let winningProfitGoal = 1000000;

    function getTotalEmployeePlay(): number {
        return totalEmployees * baseEmployeePay;
    };

    /*function add(x: number, y: number): number {
        return x + y;
    }*/

    return (
      <div>
        {/*add(1, 2)*/}
      </div>
    );
}
  
export default MoneySystem;  