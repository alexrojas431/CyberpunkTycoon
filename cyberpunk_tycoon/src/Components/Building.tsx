import { Container, Graphics,Text } from "@pixi/react";
import { useCallback } from "react";
import { Graphics as pixiGraphics } from "pixi.js";
import { Room } from "./Room";

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
        //g.beginFill(0xffffff);
        g.drawRect(bX, bY, bW, bH);
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

function test(e:any){
    console.log(e);
}
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
                    eventMode="static"
                    cursor="pointer"
                    onclick={test}
                    pointerdown={test}
                />
                <Room rW={rW} rX={rX}rH={rH}rY={rY}/>
            </Container>
        </Container>
    )
}