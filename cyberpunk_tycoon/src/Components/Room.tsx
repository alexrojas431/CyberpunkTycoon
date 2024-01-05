import { Container, Graphics } from "@pixi/react";
import { useEffect, useRef, useCallback} from "react";
import { Graphics as pixiGraphics } from "pixi.js";
import { Room as roomInterface } from "../interface/Room";
import { totalProfitAtom } from "./../GameState/Economy";
import { useAtom } from "jotai";
import { roomSelectors } from "./../GameState/Room";

interface Props{
    readonly roomObject: roomInterface;
    readonly rW: number;
    readonly rH: number;
    readonly rX: number;
    readonly rY: number;
}

export function Room(p: Props){

    const [totalProfit, setTotalProfit] = useAtom(totalProfitAtom);
    const second = 1000;
    const roomRevenueTimer = useRef(p.roomObject.baseTimeTaskCompletion*second);
    const roomRentTimer = useRef(15*second);

    const drawRoom = useCallback((g:pixiGraphics) => {
        g.clear();
        g.beginFill(0x6600ff);
        g.drawRect(p.rX, p.rY, p.rW, p.rH);
        g.endFill();
    },[]);

    useEffect(() => {
        const roomProfitInterval = setInterval(() => {
            if(p.roomObject.numOfEmployees > 0) { // If one or more employees are in the room
                console.log("Adding Profit from Rooms!");
                let roomProfit = 0;
                roomProfit += roomSelectors.getRoomIncome(p.roomObject.id)(p.roomObject,1);
                console.log("Adding " + roomProfit + " to Profit from Rooms!");
                setTotalProfit(profit => profit + roomProfit);
            }
        }, roomRevenueTimer.current);

        return () => {
            clearInterval(roomProfitInterval);
        }
    }, []);

    useEffect(() => {
        const roomRentInterval = setInterval(() => {
            console.log("Removing Profit for Room rent!");
            let roomRent = 0;
            roomRent += roomSelectors.getRoomMaintance(p.roomObject.id)(p.roomObject);
            console.log("Removing " + roomRent + " from Profit because of room rent!");
            setTotalProfit(profit => profit - roomRent);
        }, roomRentTimer.current);

        return () => {
            clearInterval(roomRentInterval);
        }
    }, []);

    function giveRoomID(){
        console.log("Room ID from Room Component: " + p.roomObject.id)
    }

    return(
        <Container eventMode="static" cursor="pointer" onclick={giveRoomID}>
            <Graphics draw={drawRoom}/>
        </Container>
    )
}