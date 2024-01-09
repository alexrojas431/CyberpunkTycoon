import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { totalProfitAtom } from "../../GameState/EconomyState";
import { totalEmployees as totalEmployeesAtom } from "../../GameState/CompanyState";
import { roomsListAtom } from "../../GameState/RoomState";
import "./CSS/TopUI.css";

export function TopUI(){

    const [totalProfit, setTotalProfit] = useAtom(totalProfitAtom);
    const [totalEmployees, setTotalEmployees] = useAtom(totalEmployeesAtom);
    const [roomList, setRoomList] = useAtom(roomsListAtom)
    const second = 1000;
    const employeePayTimer = useRef(30*second); // Will make 30 seconds

    useEffect(() => {
        const employeePayInterval = setInterval(() => {
            console.log("Removing Profit for Employees!");
            let employeePay = totalEmployees * 100;
            console.log("Removing " + employeePay + " from Profit for employees!");
            setTotalProfit(profit => profit - employeePay);
        }, employeePayTimer.current);

        return () => clearInterval(employeePayInterval);
    }, [totalEmployees]);

    const addEmployee = () => {
        if(totalEmployees < roomList.length*2 && roomList.length !== 0){
            setTotalEmployees(totalEmployees + 1);
            let roomListCopy = roomList;
            let index = roomListCopy.findIndex(room => room.numOfEmployees < 2);
            roomListCopy[index].numOfEmployees++;
            setRoomList([
                ...roomListCopy
            ]);
        } else {
            console.log("Not enough rooms to add employee!");
        }
    };

    return(
        <span className= "topStick">
            <span className="moneyCounter">
                Profit: {totalProfit}
            </span>
            <span className="moneyRate">
                Money Rate
            </span>
            <span className="satisf">
                Customer Satisfaction
            </span>
            <span className="morale">
                Worker Morale
            </span>
            <div>
                Total Employees: {totalEmployees}
                <button onClick={() => {addEmployee()}}>Add Employee</button>
            </div>
            </span>
    )
}