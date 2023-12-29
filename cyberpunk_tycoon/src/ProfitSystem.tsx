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

import { useAtom } from "jotai";
import { roomsListAtom, roomSelectors } from "./GameState/Room";
import { Room } from './interface/Room';

function MoneySystem() {

    /*const [totalProfit, setTotalProfit] = useState(3000);

    let baseIncome = 1;
    let totalEmployees = 0;
    let baseEmployeePay = 2;
    let winningProfitGoal = 1000000;

    function getTotalEmployeePlay(): number {
        return totalEmployees * baseEmployeePay;
    };*/

    const [roomsList, setRoomsList] = useAtom(roomsListAtom);

    const addRoom = (newRoom: Room) => {
        setRoomsList((prevList: any) => [...prevList, newRoom]);
    };

    /*useEffect(() => {
        const newRoom: Room = {
          upgradeLevel: 2,
          cost: 150,
          baseIncome: 15,
          customerPresent: false,
          numOfEmployees: 1,
          baseMaintanceModifier: 120,
          baseTimeTaskCompletion: 3,
          taskComplete: false,
        };
    
        addRoom(newRoom);
        console.log("Hello")
      }, []);*/
    
    return (
        <div>
            {roomsList.map((room, index) => {
                const roomMaintance = roomSelectors.getRoomMaintance(index)(room);
                const taskCompletionTime = roomSelectors.getTaskCompletionTime(index)(room);
                const getRoomIncome = roomSelectors.getRoomIncome(index)(room, 1);

                return (
                    <div key={index}>
                        <p>Room {index}</p>
                        <p>Room Upgrade Level: {room.upgradeLevel}</p>
                        <p>Room Cost: {room.cost}</p>
                        <p>Room Base Income: {room.baseIncome}</p>
                        <p>Room Customer Present: {room.customerPresent.toString()}</p>
                        <p>Room Num Employee: {room.numOfEmployees}</p>
                        <p>Room Base Maintiance Modifier: {room.baseMaintanceModifier}</p>
                        <p>Room Base Time Task Completion: {room.baseTimeTaskCompletion}</p>
                        <p>Room Task Complete: {room.taskComplete}</p>
                        <p>Room Maintenance: {roomMaintance}</p>
                        <p>Task Completion Time: {taskCompletionTime}</p>
                        <p>Room Income: {getRoomIncome}</p>
                        <br></br>
                    </div>
                );
            })}
            <button onClick={() => addRoom({
                        upgradeLevel: 2,
                        cost: 150,
                        baseIncome: 15,
                        customerPresent: false,
                        numOfEmployees: 1,
                        baseMaintanceModifier: 120,
                        baseTimeTaskCompletion: 3,
                        taskComplete: false,
                        })}>Add Room</button>
        </div>
    );
}
  
export default MoneySystem;  