import { Container, Sprite } from "@pixi/react";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { RoomInterface } from "../Interface/RoomInterface";
import { totalProfitAtom } from "../GameState/EconomyState";
import { roomSelectors } from "../GameState/RoomState";
import { People } from "./People";
import room from "../Assets/room.png"

interface Props{
    readonly roomObject: RoomInterface;
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
    const employeeSpriteHeight = 120;
    const employeeSpriteWidth = 85;
    const employeeSpriteXCoor = p.rX+employeeSpriteWidth/2;
    const employeeSpriteYCoor = p.rY+p.rH-employeeSpriteHeight;
    const [sprites, setSprites] = useState<any[]>([]);

    useEffect(() => {
        const roomProfitInterval = setInterval(() => {
            // If one or more employees are in the room
            if(p.roomObject.numOfEmployees > 0) {
                let roomProfit = 0;
                roomProfit += roomSelectors.getRoomIncome(p.roomObject.id)(p.roomObject,1);
                setTotalProfit(profit => profit + roomProfit);
            }
        }, roomRevenueTimer.current);

        return () => {
            clearInterval(roomProfitInterval);
        }
    }, []);

    useEffect(() => {
        const roomRentInterval = setInterval(() => {
            let roomRent = 0;
            roomRent += roomSelectors.getRoomMaintance(p.roomObject.id)(p.roomObject);
            setTotalProfit(profit => profit - roomRent);
        }, roomRentTimer.current);

        return () => {
            clearInterval(roomRentInterval);
        }
    }, []);

    function giveRoomID(){
        console.log("Room ID from Room Component: " + p.roomObject.id)
    }

    useEffect(() => {
        let sprites: any[] = [];
        for(let positionI = 0; positionI < p.roomObject.numOfEmployees; positionI++) {
            sprites = [
                ...sprites, 
                <People 
                    key={"spite"+positionI}
                    pX={employeeSpriteXCoor + (60 * positionI)} 
                    pY={employeeSpriteYCoor - 30} 
                    pW={employeeSpriteWidth} 
                    pH={employeeSpriteHeight}
                    roomX={p.rX}
                    roomW={p.rW}
                />
            ]
        }
        //return sprites;
        setSprites(sprites)
    }, [p.roomObject.numOfEmployees]);

    // Use Room List Atom and set global X and Y using graphic1 here

    return(
        <Container
            eventMode="static"
            cursor="pointer"
            onclick={giveRoomID}
        >
            <Sprite
                image={room}
                x={p.rX}
                y={p.rY}
                width={p.rW}
                height={p.rH}
            />
            { sprites }
        </Container>
    )
}