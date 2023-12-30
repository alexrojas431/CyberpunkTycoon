import { Container, Graphics } from "@pixi/react";
import { useCallback } from "react";
import { Graphics as pixiGraphics } from "pixi.js";

interface Props{
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

    return(
        <Container
        eventMode="static"
        cursor="pointer"
        >
                    <Graphics 
                        draw={drawRoom}
                    />
        </Container>
    )
}