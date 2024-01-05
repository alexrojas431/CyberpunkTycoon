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

interface Props{
    readonly pX: number;
    readonly pY: number;
    readonly pW: number;
    readonly pH: number;
}

export function People(p:Props){

    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    const moveRight = (x: number) => x+1;
    const moveLeft = (x: number) => x-1;
    const moveUp = (y: number) => y+1;
    const moveDown = (y: number) => y-1;
    
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

    /*useTick(delta =>{
        if(roomList.length < 1 || roomList == undefined){
            setX(moveLeft(x));
            //console.log("From the People Component: " + "No Room");
        }
        else if(roomList[1] !== undefined){
            //console.log("From the People Component: " + "Room 2 is available");
            //setX(moveToRoom(x, roomList[1].x));
            const speed = 6;
            //setX((x + speed * delta + 400) % (window.innerWidth + 800) - 400);
            moveToRoom(x,y,roomList[1].x, roomList[1].y);
        }
        else{
            setX(moveRight(x));
            //console.log("From the People Component: " + "Room's available");
        }
    });*/

    return (
        <Sprite
            image="https://pixijs.io/pixi-react/img/bunny.png"
            x={p.pX}
            y={p.pY}
            scale={2}
            width={p.pW}
            height={p.pH}
        />
    );
};