import { Container, Graphics } from "@pixi/react";
import { useCallback } from "react";
import { Graphics as pixiGraphics } from "pixi.js";
import { Room } from "./Room";

export function Building(){

    const bW = 500;
    const bH = 600;
    
    const bX = 0;
    const bY = 0;
    
    const rWPadding = 0.025;
    const rHPercent = 0.4;

    const rW = bW - (bW * rWPadding * 2);

    const rH = bH * rHPercent;
    const rX = bX + (bW * rWPadding);
    const rY = (bY + bH) - rH;
    
    const drawBuilding = useCallback((g: pixiGraphics) => {
        g.clear();
        g.beginFill(0xffffff);
        g.drawRect(bX, bY, bW, bH);
        g.endFill();
    },[])

    return(
        <Container>
            <Container x={500} y={100} >
                <Graphics 
                    draw={drawBuilding}
                />
                <Room rW={rW} rH={rH} rX={rX} rY={rY} />
            </Container>
        </Container>
    )
}