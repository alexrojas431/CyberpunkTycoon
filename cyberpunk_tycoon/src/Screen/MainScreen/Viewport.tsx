import React from "react";
import * as PIXI from "pixi.js";
import { Viewport as PixiViewport } from "pixi-viewport";
import { PixiComponent, useApp } from "@pixi/react";
/*
export interface ViewportProps {
  width: number;
  height: number;
  children?: React.ReactNode;
}

export interface PixiComponentViewportProps extends ViewportProps {
  app: PIXI.Application;
}

const PixiComponentViewport = PixiComponent("Viewport", {
  create: (props: PixiComponentViewportProps) => {
    const viewport = new PixiViewport({
        screenWidth: props.width,
        screenHeight: props.height,
        worldWidth: props.width * 2,
        worldHeight: props.height * 2,
        ticker: props.app.ticker,
        events: props.app.renderer.events,
    });
    viewport.drag().pinch().wheel().clamp();

    return viewport;
  }
});

const Viewport = (props: ViewportProps) => {
  const app = useApp();
  return <PixiComponentViewport app={app} {...props} />;
};

export default Viewport;
*/
interface Props{
    readonly width: number;
    readonly height: number;
    readonly children?: React.ReactNode;
}

interface PixiComponentViewportProps extends Props{
    readonly app: PIXI.Application;
}

export function Viewport(p: Props) {
    const PixiComponentViewport = PixiComponent("Viewport", {
        create: (p: PixiComponentViewportProps) => {
                const events = new PIXI.EventSystem(p.app.renderer);
                events.domElement = p.app.renderer.view as any;
                const viewport: any = new PixiViewport({
                    screenWidth: p.width,
                    screenHeight: p.height,
                    worldWidth: p.width * 2,
                    worldHeight: p.height * 2,
                    ticker: p.app.ticker,
                    events: events
            });
            viewport.drag().pinch().wheel().clamp();
            return viewport;
        }
    })
    const app = useApp();
    return <PixiComponentViewport app={app} {...p}/>
}

/*
export default PixiComponent("Viewport", {
    create: (props) => {
      const viewport:any = new PixiViewport({
        screenWidth: props.width,
        screenHeight: props.height,
        worldWidth: props.width * 2,
        worldHeight: props.height * 2,
        ticker: props.app.ticker,
        events: props.app.renderer.events,
      });
      
      viewport.on("drag-start", () => console.log("drag-start"));
      viewport.on("drag-end", () => console.log("drag-end"));
  
      viewport
        .drag()
        .pinch()
        .wheel()
        .decelerate();
  
      //viewport.scaled = 30;
      return viewport;
    }
  });
*/  