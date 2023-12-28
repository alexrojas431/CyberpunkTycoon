import { Container, Graphics } from "@pixi/react";
import { useCallback } from "react";
import { Graphics as pixiGraphics } from "pixi.js";

export function Building(){

    const bW = 500;
    const bH = 600;
    
    const bX = 0;
    const bY = 0;
    
    const rW = 100;
    const rH = 60;

    const rX = bX + (bW * 0.05);
    const rY = (bY + bH) - rH;
    
    const drawBuilding = useCallback((g: pixiGraphics) => {
        g.clear();
        g.beginFill(0xffffff);
        g.drawRect(bX, bY, bW, bH);
        g.endFill();
    },[])

    const drawRoom = useCallback((g: pixiGraphics) => {
        g.clear();
        g.beginFill(0x6600ff);
        g.drawRect(rX, rY, rW, rH);
        g.endFill();
    },[])

    return(
        <Container>
            <Container x={500} y={100} >
                <Graphics 
                    draw={drawBuilding}
                />
                <Container>
                    <Graphics 
                        draw={drawRoom}
                    />
                </Container>
            </Container>
        </Container>
    )
}