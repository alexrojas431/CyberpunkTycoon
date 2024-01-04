import { Container, Graphics } from "@pixi/react";
import { useCallback } from "react";
import { Graphics as pixiGraphics } from "pixi.js";
import { Room as roomInterface } from "../interface/Room";

interface Props{
    readonly roomObject: roomInterface;
    readonly rW: number;
    readonly rH: number;
    readonly rX: number;
    readonly rY: number;
}

export function Room(p: Props){

    const drawRoom = useCallback((g: pixiGraphics) => {
        g.clear();
        g.beginFill(0x6600ff);
        g.drawRect(p.rX, p.rY, p.rW, p.rH);
        g.endFill();
    },[])

    function giveRoomID(){
        console.log("Room ID from Room Component: " + p.roomObject.id)
    }

    return(
        <Container eventMode="static" cursor="pointer" onclick={giveRoomID}>
            <Graphics draw={drawRoom}/>
        </Container>
    )
}