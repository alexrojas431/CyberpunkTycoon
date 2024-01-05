import { Sprite, useTick } from "@pixi/react";
import { useState } from "react";
import { roomsListAtom } from "../GameState/Room";
import { useAtom } from "jotai";

/**
 * People.tsx
 * 
 * Handle Movement of people from nowhere to one room
 *  
*/

function keyboard(value:any) {
    const key = {
        value: value, 
        isDown: false, 
        isUp: true,
        release(){},
        downHandler(e:any){},
        press(){},
        upHandler(e:any){},
        unsubscribe(){}
    };
    //The `downHandler`
    key.downHandler = (event:any) => {
      if (event.key === key.value) {
        if (key.isUp && key.press) {
          key.press();
        }
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    };
  
    //The `upHandler`
    key.upHandler = (event) => {
      if (event.key === key.value) {
        if (key.isDown && key.release) {
          key.release();
        }
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    };
  
    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);
    
    window.addEventListener("keydown", downListener, false);
    window.addEventListener("keyup", upListener, false);
    
    // Detach event listeners
    key.unsubscribe = () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };
    
    return key;
  }

interface Props{
    readonly pX: number;
    readonly pY: number;
    readonly pW: number;
    readonly pH: number;
}

export function People(p:Props){

    const [x, setX] = useState(p.pX)
    const [y, setY] = useState(p.pY)

    const moveRight = (x: number) => x+10;
    const moveLeft = (x: number) => x-10;
    const moveUp = (y: number) => y-10;
    const moveDown = (y: number) => y+10;
    
    /*const moveToRoom = (sx: number, sy: number, x: number, y: number) =>{
        // Calculate direction towards player
        let toX = x - sx;
        let toY = y - sy;
        let toLength;
        //console.log("xcoord: " + x);
        //console.log("toX: " + toX);
        // Normalize
        toLength = Math.sqrt(toX * toX + toY * toY);
        toX = toX / toLength;
        toY = toY / toLength;

        // Move towards the room
        //setX(sx-=toX);
        if(sx>x){setX(sx-=toX);}
        setY(sy+=toY);
    };*/
  
    const [roomList] = useAtom(roomsListAtom);

    useTick(delta =>{
        keyboard("ArrowLeft").press = () => {
            setX(moveLeft(x));
        };
        keyboard("ArrowRight").press = () => {
            setX(moveRight(x));
        };
        keyboard("ArrowUp").press = () => {
            setY(moveUp(y));
        };
        keyboard("ArrowDown").press = () => {
            setY(moveDown(y));
        };
    });

    return (
        <Sprite
            image="https://pixijs.io/pixi-react/img/bunny.png"
            x={x}
            y={y}
            scale={2}
            width={p.pW}
            height={p.pH}
        />
    );
};