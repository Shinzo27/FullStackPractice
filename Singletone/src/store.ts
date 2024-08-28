interface Game {
    id: string;
    whitePlayerName: string;
    blackPlayetName: string;
    moves: string[];
}

export class GameManager {
    games: Game[] = [];
    private static instace: GameManager;
    private constructor() {
        this.games = []
    }

    static getInstace(){
        if(GameManager.instace) {
            return GameManager.instace
        }
        GameManager.instace = new GameManager()
        return GameManager.instace
    }

    addMove(gameId:string, move:string){
        console.log(`Adding move ${move} to game ${gameId}`);
        const game:any = this.games.find(gmae => game?.id === gameId)
        game?.moves.push(move)
    }

    addGame(gameId:string){
        const game = {
            id: gameId,
            whitePlayerName: "Alice",
            blackPlayetName: "Bob",
            moves: []
        }
        this.games.push(game)
    }

    log(){
        console.log(this.games);
    }

}

export const gameManager = GameManager.getInstace();
//export const gameManager = new GameManager()