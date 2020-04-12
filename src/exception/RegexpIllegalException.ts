export class RegexpIllegalException extends Error {

  public constructor(regexp: string, index: number) {
    super(`Invalid regular expression: ${regexp}, Index: ${index}`);
  }
}