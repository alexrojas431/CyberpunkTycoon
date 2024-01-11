import { Container, Sprite } from "@pixi/react";
import ground from "./../../Assets/ground2.png";

interface Props{
    readonly width: number;
}

export function Ground(p: Props){

    return(
        <Container x={0} y={1300} >
            <Sprite image={ground} width={p.width}/>
        </Container>
    )
}