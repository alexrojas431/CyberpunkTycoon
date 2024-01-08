import { Container, Graphics } from "@pixi/react";
import { useCallback } from "react";
import { Graphics as pixiGraphics } from "pixi.js";

interface Props{
    readonly width: number;
}

export function Ground(p: Props){
    const draw = useCallback((g: pixiGraphics) => {
        g.clear();
        g.beginFill(0x009933);
        g.drawRect(0, 0, p.width, 200);
        g.endFill();
    },[])

    return(
        <Container x={0} y={1300} >
            <Graphics 
                draw={draw}
            />
        </Container>
    )
}