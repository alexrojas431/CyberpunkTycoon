import { Stage, Sprite, useApp } from "@pixi/react";
import * as PIXI from "pixi.js";
import { Ground } from "./Ground";
import { Building } from "../../Components/Building";
import { TopUI } from "./TopUI"
import "./CSS/MainScreen.css";
import { Viewport } from "./Viewport";
import { People } from "../../Components/People";

/**
 * MainScreen.tsx
 * 
 * Canvas that the player will be interacting with for the majority of their playtime
 * Houses most UI Elements/Components
 * Also handles dynamic making of the Building Component
 *  
*/
/*
interface Draggable extends PIXI.DisplayObject{
    data: PIXI.FederatedEvent | null;
    dragging: boolean;
}
*/

export function MainScreen(){
/*
    const onDragStart = (e: PIXI.FederatedEvent) => {
        const sprite = e.currentTarget as Draggable;
        sprite.alpha = 0.5;
        sprite.data = e;
        sprite.dragging = true;
    }

    const onDragMove = (e: PIXI.FederatedEvent) => {
        const sprite = e.currentTarget as Draggable;
        sprite.data = e;
        if(sprite.dragging){
            const newPosition = sprite.getGlobalPosition(sprite.parent.position);
            sprite.x = newPosition.x;
            sprite.y = newPosition.y
        }
    }

    const onDragEnd = (e: PIXI.FederatedEvent) => {
        const sprite = e.currentTarget as Draggable;
        sprite.alpha = 1;
        sprite.dragging = false;
        sprite.data = null;
    }
*/

    const stageWidth = 2000;
    const stageHeight = 1500;

    return (
        <div>
            <TopUI/> 
            <Stage 
                width={stageWidth}
                height={stageHeight}
                options={{backgroundColor:0xff6699,backgroundAlpha: 1}}
            >
                <Building/>
                <Ground width={stageWidth}/>
            </Stage>
        </div>
    );
};