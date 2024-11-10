import { GameRound } from 'src/stores';

export interface GameHistoryStorageProps {
  score: number;
  accuracy: number;
  avgReactionTime: number;
  rounds: GameRound[];
  totalTime: number;
  createdAt: string;
}
