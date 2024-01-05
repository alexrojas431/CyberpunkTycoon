import { Container, Graphics } from "@pixi/react";
import { useState, useEffect, useRef, useCallback} from "react";
import { Graphics as pixiGraphics } from "pixi.js";
import { Room as roomInterface } from "../interface/Room";
import { totalProfitAtom } from "./../GameState/Economy";
import { useAtom } from "jotai";
import { roomSelectors } from "./../GameState/Room";
import { People } from "./People";
import { roomsListAtom } from "../GameState/Room";

interface Props{
    readonly roomObject: roomInterface;
    readonly rW: number;
    readonly rH: number;
    readonly rX: number;
    readonly rY: number;
}

export function Room(p:Props){

    const [totalProfit, setTotalProfit] = useAtom(totalProfitAtom);
    const second = 1000;
    const roomRevenueTimer = useRef(p.roomObject.baseTimeTaskCompletion*second);
    const roomRentTimer = useRef(15*second);
    const [roomList, setRoomList] = useAtom(roomsListAtom);

    const employeeSpriteHeight = 85;
    const employeeSpriteWidth = 60;
    const employeeSpriteXCoor = p.rX+(p.rW/2)-employeeSpriteWidth;
    const employeeSpriteYCoor = p.rY+p.rH-employeeSpriteHeight;

    const drawRoom = useCallback((g:pixiGraphics) => {
        g.clear();
        g.beginFill(0x6600ff);
        console.log("Coordinates:", p.rX, p.rY, p.rW, p.rH)
        g.drawRect(p.rX, p.rY, p.rW, p.rH);
        g.endFill();
        //console.log(roomList);
        //let roomListCopy = roomList
        //let index = roomListCopy.findIndex(room => room.id === p.roomObject.id)
        //console.log(g)
        //roomListCopy[index] = {...roomListCopy[index], globalX: g.getGlobalPosition., globalY};
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

    // Use Room List Atom and set global X and Y using graphic1 here

    return(
        <Container eventMode="static" cursor="pointer" onclick={giveRoomID}>
            <Graphics draw={drawRoom}/>
            {/* Add People Sprites Here */}
            <People 
                pX={employeeSpriteXCoor} 
                pY={employeeSpriteYCoor} 
                pW={employeeSpriteWidth} 
                pH={employeeSpriteHeight}
            />
        </Container>
    )
}