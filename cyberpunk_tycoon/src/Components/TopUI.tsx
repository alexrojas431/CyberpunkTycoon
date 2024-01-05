import "./TopUI.css";
import { totalProfitAtom } from "./../GameState/Economy";
import { useAtom } from "jotai";
import { totalEmployees as totalEmployeesAtom } from "../GameState/Company";
import { roomsListAtom } from "../GameState/Room";
import { useEffect, useRef } from "react";
import { roomSelectors } from "./../GameState/Room"

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
        let totalEmployeesInRooms = roomSelectors.getTotalEmployeesInRooms(roomList);
        console.log(totalEmployees);
        console.log(roomList.length*2);
        // totalEmployees < roomList.length*2
        if(totalEmployees < roomList.length*2 && roomList.length!=0) {
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
        <span className = "topUI">
            this is topui
            <div className= "topStick">
                This is Topstick
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
            </div>
        </span>
    )
}

/*
export function TopUI(){
    const draw = useCallback((g:gg) => {
        g.clear();
        g.beginFill(0xffffff);
        g.drawRect(0, 0, 500, 100);
        g.endFill();
    },[])

    return(
        <Container>
            <Container x={14} y={3} >
                <Graphics 
                    draw={draw}
                />
                <Sprite
                    image={image}
                    x={0}
                    y={0}
                    anchor={{ x: 0, y: 0 }}
                />
                <Text text="TopUI" anchor={{ x: 0, y: 0}} />
            </Container>

            <Container width={100} height={50}></Container>
            <Container width={100} height={50}></Container>
            <Container width={100} height={50}></Container>

        </Container>
    )
}
*/