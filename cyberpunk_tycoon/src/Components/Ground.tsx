import { Container, Graphics } from "@pixi/react";
import { useCallback } from "react";
import { Graphics as pixiGraphics } from "pixi.js";

export function Ground(){
    const draw = useCallback((g: pixiGraphics) => {
        g.clear();
        g.beginFill(0x009933);
        g.drawRect(0, 0, window.innerWidth, 200);
        g.endFill();
    },[])

    return(
        <Container>
            <Container x={0} y={700} >
                <Graphics 
                    draw={draw}
                />
            </Container>
        </Container>
    )
}