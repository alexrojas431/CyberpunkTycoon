import { Container, Graphics, useApp } from "@pixi/react";
import { useCallback, useState } from "react";
import { Graphics as pixiGraphics } from "pixi.js";
import { Room } from "./Room";
import * as PIXI from "pixi.js";
import { useAtom } from "jotai";
import { roomIDCounterAtom, roomsListAtom as roomListAtom, roomSelectors } from "../GameState/Room";
import { Room as roomInterface } from '../interface/Room';
import { buildingListAtom } from "../GameState/BuildingState";
import { totalEmployees as totalEmployeesAtom } from "../GameState/Company";

/**
 * BuildingSection.tsx
 * 
 * Modular node for building graphics.
 * Also handles dynamic making of the Room component
 * 
*/

interface Props{
    readonly id: number;
    readonly bX: number;
    readonly bY: number;
}

export function BuildingSection(p: Props){

    // This atom holds information needed for Room component
    const [roomList, setRoomList] = useAtom(roomListAtom);
    const [buildingList, setBuildingList] = useAtom(buildingListAtom);
    const [roomIDCounter, setRoomIDCounter] = useAtom(roomIDCounterAtom);
    const [topRoomExists, setTopRoomExists] = useState<boolean>(false);
    const [bottomRoomExists, setBottomRoomExists] = useState<boolean>(false);
    const [totalEmployees, setTotalEmployees] = useAtom(totalEmployeesAtom);

    const buildingWidth = 500;
    const buildingHeight = 600;
    const buildingXCoordinate = 0;
    const buildingYCoordinate = 0;
    
    const roomWidthPaddingPercent = 0.025;
    const roomHeightPercent = 0.4;
    //600*.4
    const roomHeight = buildingHeight * roomHeightPercent;
    //500-(500*0.025*2)
    const roomWidth = buildingWidth - (buildingWidth * roomWidthPaddingPercent * 2);

    const buildingHeightPadding = ((buildingHeight - (roomHeight*2))/2)
    
    function giveBuildingID(){
        console.log("Building ID from Building Component: " + p.id)
    }

    const incrementId = (id: number) => id+1;

    const addRoom = (newRoom: any) => {
        setRoomList((prevList: any) => [...prevList, newRoom]);
    };

    const getTotalEmployeesInRooms = () => { // change with room selector function instead
        let totalEmployeesInRooms = 0;
        roomList.forEach(room => {
            totalEmployeesInRooms += room.numOfEmployees;
        });
        return totalEmployeesInRooms;
    }

    const rButton = useCallback((g:pixiGraphics) => {
        g.clear();
        g.beginFill(0x8c3b0c);
        g.drawRect(p.bX, p.bY, 20, 20);
        g.endFill();
    },[])
 
    const drawBuilding = useCallback((g: pixiGraphics) => {
        g.clear();
        g.beginFill(0xffffff);
        g.drawRect(buildingXCoordinate, buildingYCoordinate, buildingWidth, buildingHeight);
        g.endFill();
    },[])

    const updateBuildingRoomID = (buildingID: number, roomID: number) => {
        let newBuildingList = buildingList.map(b =>{
            if(b.id == buildingID){
                if(b.bottomRoomID == -10){
                    b = {...b, bottomRoomID: roomID};
                }
                else if(b.topRoomID == -10){
                    b = {...b, topRoomID: roomID};
                }
            }
            return b;
        });
        setBuildingList(newBuildingList);
    };

    function makeRoomInBuilding() {
        let roomXCoordinate = buildingXCoordinate + (buildingWidth * roomWidthPaddingPercent);
        let roomYCoordinate = (buildingYCoordinate + buildingHeight) - roomHeight;

        // Depending on which room exists, change coords vars and change exists state
        if (topRoomExists === false && bottomRoomExists === true) {
            //Building extends height but not width, x never changes
            let nextRoomYCoordinate = 0;
            // 200 - 180 - 180
            nextRoomYCoordinate = roomYCoordinate - buildingHeightPadding - roomHeight;
            roomYCoordinate = nextRoomYCoordinate
            setTopRoomExists(true)
        } else if (bottomRoomExists === false) {
            setBottomRoomExists(true)
        }

        // Add room dimensions to roomgraphicshapelist, and add room data to atom
        if(topRoomExists === false || bottomRoomExists === false) {
            // Add room data to atom
            const id = roomIDCounter;
            setRoomIDCounter(incrementId(roomIDCounter));
            updateBuildingRoomID(p.id, id);

            let numOfEmployees = 0;

            if(roomSelectors.getTotalEmployeesInRooms(roomList) == 0) {
                console.log("There are no employees in any room!")
                numOfEmployees = 2;
            }
            
            addRoom({
                id: id,
                x: roomXCoordinate,
                y: roomYCoordinate,
                upgradeLevel: 2,
                cost: 150,
                baseIncome: 15,
                customerPresent: false,
                numOfEmployees: numOfEmployees,
                baseMaintanceModifier: 120,
                baseTimeTaskCompletion: 3,
                taskComplete: false,
            });
            /*addRoom(
                <Room
                    key={0}
                    roomObject={room}
                    rW={roomWidth}
                    rX={roomXCoordinate}
                    rH={roomHeight}
                    rY={roomYCoordinate}
                />
            );*/
        }
    };
  
    const bottomID = buildingList[p.id].bottomRoomID;

    return(
        <Container>
            <Container x={p.bX} y={p.bY} eventMode="static" cursor="pointer" onclick={giveBuildingID} >
                <Graphics draw={drawBuilding}/>
                {roomList.slice(bottomID, bottomID+2).map((r: roomInterface, i: number) => {
                   /* console.log("----------\nRoomIDCounter at map: " + roomIDCounter)
                    console.log("buildinglistID at map: " + p.id);
                    console.log("roomlistID at map: " + r.id);
                    console.log("index at map: " + i);
                    console.log("bottomRoomID + index: "+ (buildingList[p.id].bottomRoomID+i));
                    console.log("topRoomID + index: "+ (bottomID+i));*/
                    return (
                        <Room
                            key={roomList[(bottomID+i)].id}
                            roomObject={roomList[(bottomID+i)]}
                            rW={roomWidth}
                            rX={r.x}
                            rH={roomHeight}
                            rY={r.y}
                        />
                    );
                })}
            </Container>
            <Graphics
                draw={rButton}
                eventMode="static"
                cursor="pointer"
                onclick={makeRoomInBuilding}
                hitArea={new PIXI.Rectangle(p.bX, p.bY, 50, 50)}
            />
        </Container>
    )
}