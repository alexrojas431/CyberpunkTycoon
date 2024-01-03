import { Container, Graphics } from "@pixi/react";
import { useState, useEffect, useRef, useCallback} from "react";
import { Graphics as pixiGraphics } from "pixi.js";
import { Room as roomInterface } from "../interface/Room";
import { totalProfitAtom } from "./../GameState/Economy";
import { useAtom } from "jotai";
import { roomSelectors } from "./../GameState/Room";

interface Props{
    readonly roomInfo:roomInterface;
    readonly rW:number;
    readonly rH:number;
    readonly rX:number;
    readonly rY:number;
}

export function Room(props:Props){

    const [totalProfit, setTotalProfit] = useAtom(totalProfitAtom);
    const second = 1000;
    const roomRevenueTimer = useRef(props.roomInfo.baseTimeTaskCompletion*second);

    const drawRoom = useCallback((g:pixiGraphics) => {
        g.clear();
        g.beginFill(0x6600ff);
        g.drawRect(props.rX, props.rY, props.rW, props.rH);
        g.endFill();
    },[]);

    useEffect(() => {
        // TODO Weird issue where adding items to roomsList will reset the timer. 
        // I believe this is due to the mapping in the render. 
        // Note: Every Room component will have a independent timer running
        const roomInterval = setInterval(() => {
            if(props.roomInfo.numOfEmployees > 0) { // If an employee is in the room
                console.log("Adding Profit from Rooms!");
                let roomProfit = 0;
                roomProfit += roomSelectors.getRoomIncome(props.roomInfo.id)(props.roomInfo,1);
                console.log("Adding " + roomProfit + " to Profit from Rooms!");
                setTotalProfit(profit => profit + roomProfit);
            }
        }, roomRevenueTimer.current); // Timer will depend on the room task completion time. Add a prop

        return () => clearInterval(roomInterval);
    }, []);

    function test(){
        console.log("Room ID from Room Component: " + props.roomInfo.id)
    }

    return(
        <Container eventMode="static" cursor="pointer" onclick={test}>
            <Graphics draw={drawRoom}/>
        </Container>
    )
}