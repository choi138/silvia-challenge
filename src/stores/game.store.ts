import { ImageSourcePropType } from 'react-native';

import { create } from 'zustand';

import { CarrotPNG, ChessPNG, FeatherPNG, GamesPNG, PizzaPNG, UmbrellaPNG } from 'src/assets';
import { shuffleArray } from 'src/utils/suffle';

export class GameImage {
  src: ImageSourcePropType;
  id: number;

  constructor(props: { src: ImageSourcePropType; id: number }) {
    this.src = props.src;
    this.id = props.id;
  }

  static createImage(): GameImage {
    return imagePresets[Math.floor(Math.random() * (imagePresets.length - 1))];
  }

  static createImages(count: number): GameImage[] {
    return shuffleArray([...imagePresets]).slice(0, count);
  }
}

const imagePresets: GameImage[] = [
  new GameImage({ src: UmbrellaPNG, id: 1 }),
  new GameImage({ src: CarrotPNG, id: 2 }),
  new GameImage({ src: ChessPNG, id: 3 }),
  new GameImage({ src: FeatherPNG, id: 4 }),
  new GameImage({ src: PizzaPNG, id: 5 }),
  new GameImage({ src: GamesPNG, id: 6 }),
];

export const gameStageCount = 6;
export const gameRoundCount = 7;

export class GameStage {
  answerIndex: number;
  userChoiceIndex?: number;
  reactionTime?: number;

  constructor(props: { answerIndex: number; userChoiceIndex?: number; reactionTime?: number }) {
    this.answerIndex = props.answerIndex;
    this.userChoiceIndex = props.userChoiceIndex;
    this.reactionTime = props.reactionTime;
  }

  static createStage(props: { answerIndex?: number } = {}): GameStage {
    return new GameStage({
      answerIndex:
        props.answerIndex ?? imagePresets[Math.floor(Math.random() * (imagePresets.length - 1))].id,
    });
  }
}

export class GameRound {
  images: GameImage[];
  stages: GameStage[];
  currentStageIndex: number;

  /**
   * 다음 스테이지로 이동
   * @returns 다음 스테이지로 이동 가능 여부
   */
  nextStage(): boolean {
    if (this.currentStageIndex < gameStageCount - 1) {
      this.currentStageIndex += 1;
      return true;
    }

    return false;
  }

  /** 현재 스테이지 */
  get currentStage(): GameStage {
    return this.stages[this.currentStageIndex];
  }

  /** 현재 이미지 */
  get currentImage(): GameImage {
    return this.images[this.currentStage.answerIndex];
  }

  /** 평균 정확도 */
  get accuracy(): number {
    return (
      this.stages.filter((stage) => stage.answerIndex === stage.userChoiceIndex).length /
      gameStageCount
    );
  }

  /** 총 소요 시간 */
  get totalTime(): number {
    return this.stages.reduce((acc, stage) => acc + (stage.reactionTime || 0), 0);
  }

  /** 평균 반응 시간 */
  get avgReactionTime(): number {
    return this.totalTime / gameStageCount;
  }

  /** 게임 점수 */
  get score(): number {
    // 정확도 65%, 반응시간 35%로 가중치를 두어 계산, 반응속도는 1.5초 이상 8초 이하로 제한
    const MIN_REACTION_TIME = 1.5;
    const MAX_REACTION_TIME = 8;

    return (
      this.accuracy * 0.65 +
      ((MAX_REACTION_TIME -
        Math.min(MAX_REACTION_TIME, Math.max(0, this.avgReactionTime - MIN_REACTION_TIME))) /
        MAX_REACTION_TIME) *
        0.35
    );
  }

  constructor(props: { images: GameImage[]; stages: GameStage[]; currentStageIndex: number }) {
    if (props.images.length !== gameStageCount) {
      throw new Error(`게임 이미지는 ${gameStageCount}개여야 합니다.`);
    }

    if (props.stages.length !== gameStageCount) {
      throw new Error(`게임 스테이지는 ${gameStageCount}개여야 합니다.`);
    }

    this.images = props.images;
    this.stages = props.stages;
    this.currentStageIndex = props.currentStageIndex;
  }

  static createRound(): GameRound {
    const images = GameImage.createImages(gameStageCount);

    // 각기 다른 이미지를 사용하여 스테이지를 생성
    const imageIndexes = images.map((_, index) => index);
    const stages: GameStage[] = [];

    while (imageIndexes.length) {
      const answerIndex = imageIndexes.splice(
        Math.floor(Math.random() * (imageIndexes.length - 1)),
        1,
      )[0];
      stages.push(GameStage.createStage({ answerIndex }));
    }

    return new GameRound({
      images: images,
      stages: stages,
      currentStageIndex: 0,
    });
  }
}

export class GameStore {
  rounds: GameRound[];
  currentRoundIndex: number;

  /** 현재 라운드 */
  get currentRound(): GameRound {
    return this.rounds[this.currentRoundIndex];
  }

  /** 현재 스테이지 */
  get currentStage(): GameStage {
    return this.currentRound.currentStage;
  }

  /** 평균 정확도 */
  get accuracy(): number {
    return this.rounds.reduce((acc, round) => acc + round.accuracy, 0) / gameRoundCount;
  }

  /** 총 소요 시간 */
  get totalTime(): number {
    return this.rounds.reduce((acc, round) => acc + round.totalTime, 0);
  }

  /** 평균 소요 시간 */
  get avgTime(): number {
    return this.totalTime / gameRoundCount;
  }

  /** 평균 반응 시간 */
  get avgReactionTime(): number {
    return this.rounds.reduce((acc, round) => acc + round.avgReactionTime, 0) / gameRoundCount;
  }

  /** 게임 점수 */
  get score(): number {
    return this.rounds.reduce((acc, round) => acc + round.score, 0) / gameRoundCount;
  }

  /**
   * 다음 라운드로 이동
   * @returns 다음 라운드로 이동 가능 여부
   */
  nextRound(): boolean {
    if (this.currentRoundIndex < gameRoundCount - 1) {
      this.currentRoundIndex += 1;
      return true;
    }

    return false;
  }

  /**
   * 다음 스테이지로 이동, 라운드가 끝나면 다음 라운드로 이동
   * @returns 다음 스테이지로 이동 가능 여부
   */
  nextStage(): boolean {
    if (this.currentRound.nextStage()) {
      return true;
    }

    return this.nextRound();
  }

  constructor(props: { rounds: GameRound[]; currentRoundIndex: number }) {
    if (props.rounds.length !== gameRoundCount) {
      throw new Error(`게임 라운드는 ${gameRoundCount}개여야 합니다.`);
    }

    this.rounds = props.rounds;
    this.currentRoundIndex = props.currentRoundIndex;
  }

  static createGame(): GameStore {
    return new GameStore({
      rounds: Array.from({ length: gameRoundCount }, () => GameRound.createRound()),
      currentRoundIndex: 0,
    });
  }
}

export interface CurrentGameStore {
  game?: GameStore;
  newGame: () => void;
  resetGame: () => void;
  updateGame: (game: GameStore) => void;
}

/** 게임 스토어 */
export const useGameStore = create<CurrentGameStore>((set) => ({
  game: undefined,
  newGame: () => set({ game: GameStore.createGame() }),
  resetGame: () => set({ game: undefined }),
  updateGame: (game) => set({ game }),
}));

export interface GameHistoryStore {
  histories: GameStore[];
  addHistory: (game: GameStore) => void;
  resetHistory: () => void;
}

/** 게임 히스토리 스토어 */
export const useGameHistoryStore = create<GameHistoryStore>((set) => ({
  histories: [],
  addHistory: (game) => set((state) => ({ histories: [...state.histories, game] })),
  resetHistory: () => set({ histories: [] }),
}));