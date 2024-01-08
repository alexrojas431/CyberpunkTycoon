import { Container, Graphics, Sprite } from "@pixi/react";
import { useState, useEffect, useRef, useCallback} from "react";
import { Graphics as pixiGraphics } from "pixi.js";
import { Room as roomInterface } from "../interface/Room";
import { totalProfitAtom } from "./../GameState/Economy";
import { useAtom } from "jotai";
import { roomSelectors } from "./../GameState/Room";
import { People } from "./People";
import { roomsListAtom } from "../GameState/Room";
import room from "./room.png"

interface Props{
    readonly roomObject: roomInterface;
    readonly rW: number;
    readonly rH: number;
    readonly rX: number;
    readonly rY: number;
}

export function Room(p:Props){

    const [totalProfit, setTotalProfit] = useAtom(totalProfitAtom);
    //const [spritePosition, setSprintPosition] = [false, false, false, false, false, false];
    const second = 1000;
    const roomRevenueTimer = useRef(p.roomObject.baseTimeTaskCompletion*second);
    const roomRentTimer = useRef(15*second);
    //const [roomList, setRoomList] = useAtom(roomsListAtom);

    const employeeSpriteHeight = 120;
    const employeeSpriteWidth = 85;
    const employeeSpriteXCoor = p.rX+employeeSpriteWidth/2;
    const employeeSpriteYCoor = p.rY+p.rH-employeeSpriteHeight;

    useEffect(() => {
        const roomProfitInterval = setInterval(() => {
            if(p.roomObject.numOfEmployees > 0) { // If one or more employees are in the room
                //console.log("Adding Profit from Rooms!");
                let roomProfit = 0;
                roomProfit += roomSelectors.getRoomIncome(p.roomObject.id)(p.roomObject,1);
                //console.log("Adding " + roomProfit + " to Profit from Rooms!");
                setTotalProfit(profit => profit + roomProfit);
            }
        }, roomRevenueTimer.current);

        return () => {
            clearInterval(roomProfitInterval);
        }
    }, []);

    useEffect(() => {
        const roomRentInterval = setInterval(() => {
            //console.log("Removing Profit for Room rent!");
            let roomRent = 0;
            roomRent += roomSelectors.getRoomMaintance(p.roomObject.id)(p.roomObject);
            //console.log("Removing " + roomRent + " from Profit because of room rent!");
            setTotalProfit(profit => profit - roomRent);
        }, roomRentTimer.current);

        return () => {
            clearInterval(roomRentInterval);
        }
    }, []);

    function giveRoomID(){
        console.log("Room ID from Room Component: " + p.roomObject.id)
    }

    const renderSprites = () => {
        let sprites: any[] = [];
        //let spritePostion = [false, false, false, false, false, false]
        for(let positionI = 0; positionI < p.roomObject.numOfEmployees; positionI++) {
            sprites = [
                ...sprites, 
                <People 
                    key={"spite"+positionI}
                    pX={employeeSpriteXCoor + (60 * positionI)} 
                    pY={employeeSpriteYCoor - 30} 
                    pW={employeeSpriteWidth} 
                    pH={employeeSpriteHeight}
                />
            ]
            //spritePostion[positionI] = true;
        }
        return sprites;
    }

    // Use Room List Atom and set global X and Y using graphic1 here

    return(
        <Container eventMode="static" cursor="pointer" onclick={giveRoomID}>
            <Sprite image={room} x={p.rX} y={p.rY} width={p.rW} height={p.rH}/>
            { renderSprites() }
        </Container>
    )
}