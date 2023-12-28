import { atom } from "jotai"
import { GameState, PlayerInfo } from "./GameState"
export type GameStage = "startScreen" | "mainGameplay"

class State{
    
    private ready: boolean;
    private game: GameState;
   
    constructor(){
        this.ready = false;
        this.game = {stage:"startScreen", player:[]}
    }

    //gets
    public getReady(): boolean{
        return this.ready;
    }

    public getGame(): GameState{
        return this.game;
    }
    
    public getStage(): string{
        return this.game.stage;
    }

    public getPlayer(): PlayerInfo[]{
        return this.game.player;
    }

    //sets
    public setReady(){
        return this.ready;
    }

    public setGame(){
        return this.game;
    }
    
    public setStage(){
        return this.game.stage;
    }

    public setPlayer(){
        return this.game.player;
    }
}

export const $state = atom(new State());
/*
export const $state = atom<{
  ready: boolean
  game: GameState
}>({
  ready: false,
  game: {
    stage: "startScreen",
    player: [],
  },
})

export const $ready = atom((get) => get($state).ready)

export const $game = atom((get) => get($state).game)

export const $stage = atom((get) => get($game).stage)

export const $player = atom((get) => get($game).player)
*/