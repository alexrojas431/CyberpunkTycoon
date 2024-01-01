import { Container, Graphics } from "@pixi/react";
import { useCallback } from "react";
import { Graphics as pixiGraphics } from "pixi.js";
import { Room as roomInterface } from "../interface/Room";

interface Props{
    readonly data: roomInterface;
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

    function test(){
        console.log("Room ID from Room Component: " + p.data.id)
    }

    return(
        <Container eventMode="static" cursor="pointer" onclick={test}>
            <Graphics draw={drawRoom}/>
        </Container>
    )
}