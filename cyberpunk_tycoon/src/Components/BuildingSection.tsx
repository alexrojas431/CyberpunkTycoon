import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { useCallback, useState } from "react";
import * as PIXI from "pixi.js";
import { Graphics as pixiGraphics } from "pixi.js";
import { useAtom } from "jotai";
import { Room } from "./Room";
import { roomIDCounterAtom, roomsListAtom as roomListAtom, roomSelectors } from "../GameState/RoomState";
import { buildingListAtom } from "../GameState/BuildingState";
import building from "../Assets/building.png"
import { totalProfitAtom } from "../GameState/EconomyState";

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
    readonly bRoomId: number;
    readonly tRoomId: number;
}

export function BuildingSection(p: Props){

    // This atom holds information needed for Room component
    const [roomList, setRoomList] = useAtom(roomListAtom);
    const [buildingList, setBuildingList] = useAtom(buildingListAtom);
    const [roomIDCounter, setRoomIDCounter] = useAtom(roomIDCounterAtom);
    const [topRoomExists, setTopRoomExists] = useState<boolean>(false);
    const [bottomRoomExists, setBottomRoomExists] = useState<boolean>(false);
    const [totalProfit, setTotalProfit] = useAtom(totalProfitAtom);

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
        setTotalProfit(() => totalProfit - 250)
        setRoomList((prevList: any) => [...prevList, newRoom]);
    };

    const rButtonW = 120;
    const rButtonH = 90;

    const rButton = useCallback((g:pixiGraphics) => {
        g.clear();
        g.beginFill(0x8c3b0c);
        g.drawRoundedRect(p.bX, p.bY, rButtonW, rButtonH, 20);
        g.endFill();
    },[p.bX, p.bY])

    const updateBuildingRoomID = (buildingID: number, roomID: number) => {
        let newBuildingList = buildingList.map(b =>{
            if(b.id === buildingID){
                if(b.bottomRoomID === -10){
                    b = {...b, bottomRoomID: roomID};
                }
                else if(b.topRoomID === -10){
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

            if(roomSelectors.getTotalEmployeesInRooms(roomList) === 0) {
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
                baseMaintanceModifier: 60,
                baseTimeTaskCompletion: 3,
                taskComplete: false,
            });
        }
    };

    return(
        <Container sortableChildren={true}>
            <Container
                x={p.bX}
                y={p.bY}
                eventMode="static"
                cursor="pointer"
                onclick={giveBuildingID}
            >
                <Sprite
                    tint={"0x364E50"}
                    image={building}
                    x={buildingXCoordinate}
                    y={buildingYCoordinate}
                    width={buildingWidth}
                    height={buildingHeight}
                />
                {p.bRoomId !== -10 ?
                    <Room
                        key={roomList[p.bRoomId].id}
                        roomObject={roomList[p.bRoomId] as any}
                        rW={roomWidth}
                        rX={roomList[p.bRoomId].x}
                        rH={roomHeight}
                        rY={roomList[p.bRoomId].y}
                    />
                    : <></>
                }
                {p.tRoomId !== -10 ?
                    <Room
                        key={roomList[p.tRoomId].id}
                        roomObject={roomList[p.tRoomId] as any}
                        rW={roomWidth}
                        rX={roomList[p.tRoomId].x}
                        rH={roomHeight}
                        rY={roomList[p.tRoomId].y}
                    />
                    : <></>
                }
            </Container>
            <Text text={"Create\nRoom"}
                x={p.bX}
                y={p.bY}
                zIndex={1}
                style={new PIXI.TextStyle({fontSize: 36, fill: 'white', fontWeight: 'bold' })}
            />
            <Graphics
                draw={rButton}
                eventMode="static"
                cursor="pointer"
                onclick={makeRoomInBuilding}
                hitArea={new PIXI.Rectangle(p.bX, p.bY, rButtonW, rButtonH)}
            />
        </Container>
    )
}