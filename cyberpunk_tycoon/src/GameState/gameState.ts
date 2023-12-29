export type GameStage = "startScreen" | "mainGameplay"

export interface GameState {
  stage: GameStage
  player: PlayerInfo[]
}

export type PlayerInfo = {
  money: number
}