import { Container, Graphics,Text } from "@pixi/react";
import { useCallback } from "react";
import { Graphics as pixiGraphics } from "pixi.js";
import { Room } from "./Room";
import * as PIXI from "pixi.js";

import { useAtom } from "jotai";
import { roomsListAtom, roomSelectors } from "../GameState/Room";
import { Room as roomInterface } from '../interface/Room';

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

    const makeButton = useCallback((g: pixiGraphics) => {
        g.clear();
        g.beginFill(0x8c3b0c);
        g.drawRect(0, 200, 100, 100);
        g.endFill();
    },[])
/*
    function renderRoom(this: typeof Room){
        <Room rW={rW} rH={rH} rX={rX} rY={rY} />
    }
    */
/*                <button onClick={() => addRoom({
                    upgradeLevel: 2,
                    cost: 150,
                    baseIncome: 15,
                    customerPresent: false,
                    numOfEmployees: 1,
                    baseMaintanceModifier: 120,
                    baseTimeTaskCompletion: 3,
                    taskComplete: false,
                    })}>Add Room
                </button>
*/
    const updateBuilding = useCallback((g: pixiGraphics) => {
        g.clear();
    },[])

    const makeRoomInBuilding = (e:any) => {
        console.log("Hello");
    };
    const [roomsList, setRoomsList] = useAtom(roomsListAtom);

    const addRoom = (newRoom: roomInterface) => {
        setRoomsList((prevList: any) => [...prevList, newRoom]);
    };

    //const text = roomsList[2].cost;

    return(
        <Container>
            <Container x={500} y={100}>
                <Graphics
                    draw={drawBuilding}
                    eventMode="static" //Makes it interactable
                    cursor="pointer" // Adds a hand on windows machine only
                    //onclick={test}
                    interactive={true}
                    //pointerdown={() => {console.log("HI")}}
                    //pointermove={() => {console.log("HI")}}
                    //mousedown={() => {console.log("HI")}}
                    //mousemove={() => {console.log("HI")}}
                    //mouseover={() => {console.log("HI")}}
                    //mouseout={() => {console.log("HI")}}
                    //onclick={() => {console.log("HI")}}
                    //hitArea={new PIXI.Rectangle(0,0, 100, 100)}
                />
                <Room rW={rW} rX={rX}rH={rH}rY={rY}/>
            </Container>
            <Graphics
                    draw={makeButton}
                    eventMode="static" //Makes it interactable
                    cursor="pointer" // Adds a hand on windows machine only
                    onclick={makeRoomInBuilding}
                    //interactive={true}
                    //pointerdown={() => {console.log("HI")}}
                    //pointermove={() => {console.log("HI")}}
                    //mousedown={() => {console.log("HI")}}
                    //mousemove={() => {console.log("HI")}}
                    //mouseover={() => {console.log("HI")}}
                    //mouseout={() => {console.log("HI")}}
                    //onclick={() => {console.log("HI")}}
                    hitArea={new PIXI.Rectangle(0, 200, 100, 100)}
                />
        </Container>
    )
}