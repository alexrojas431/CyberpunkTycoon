import { Container, Graphics, PixiComponent, applyDefaultProps } from "@pixi/react";
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
        <Container>
                    <Graphics 
                        draw={drawRoom}
                    />
        </Container>
    )
}

/*
const drawRoom = useCallback((g: pixiGraphics) => {
    g.clear();
    g.beginFill(0x6600ff);
    g.drawRect(rX, rY, rW, rH);
    g.endFill();
},[])
export default PixiComponent("Room", {
    create:({props}) => {
        return new Container(Graphics(drawRoom));
    },
    applyProps: (instance, oldProps, newProps) => {
        const {props, ...oldP} = oldProps;
        const {props, ...newP} = newProps;
        
        applyDefaultProps(instance, oldP, newP);
        
    }
})
*/