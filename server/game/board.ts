export class Board {
  private static board: Board
  public players: Record<string, string> = {
    p1: '',
    p2: '',
    p3: '',
    p4: '',
    lj: '',
  }

  private constructor() {

  }

  public static get() {
    if (!this.board) {
      this.board = new Board()
    }

    return this.board
  }
}
