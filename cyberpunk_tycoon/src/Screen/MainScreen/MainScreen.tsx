import { Stage, Sprite, Text, Container } from "@pixi/react";
import { BottomUI } from "../../Components/BottomUI";
import { TopUI } from "../../Components/TopUI"
import "./MainScreen.css";
import { Building } from "../../Components/Building";
import { Ground } from "../../Components/Ground";
/*
export function MainScreen(){
    return(
        <div className="mainScreen">
            <TopUI/>
                This supposed to be the main gameplay space
            <BottomUI/>
        </div>
    )
}
*//*
export function MainScreen(){
    return(
        <Stage>
            <TopUI/>
                This supposed to be the main gameplay space
            <BottomUI/>
        </Stage>
    )
}
*/

export function MainScreen(){ 
  return (
    <div>
       <TopUI/> 
        <Stage 
            width={window.innerWidth}
            height={window.innerHeight}
            options={{backgroundColor:0xff6699,backgroundAlpha: 1}}
        >
            <Sprite
                image="https://pixijs.io/pixi-react/img/bunny.png"
                x={400}
                y={270}
                anchor={{ x: 0, y: 0 }}
            />
            <Text text="Hello World" anchor={{ x: -5, y: -1}} />
            <Building/>
            <Ground/>
        </Stage>
    </div>
  );
};
