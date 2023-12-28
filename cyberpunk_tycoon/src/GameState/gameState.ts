export type GameStage = "startScreen" 

export interface GameState {
  stage: GameStage
  player: PlayerInfo[]
}

export type PlayerInfo = {
  money: number
}