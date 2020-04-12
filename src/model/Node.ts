export interface Node {

  getExpression(): string;

  random(): string;

  test(): boolean;

  init(): void;

  isInitialized(): boolean;
}