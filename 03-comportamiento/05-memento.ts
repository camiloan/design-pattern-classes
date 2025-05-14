/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

import { COLORS } from "../helpers/colors.ts";


class GameMemento {

    private level: number;
    private health: number;
    private position: string;

    constructor(level: number, health: number, position: string) {
        this.level = level;
        this.health = health;
        this.position = position;
    }

    getLevel() {
        return this.level;
    }

    getHealth() {
        return this.health
    }

    getPosition() {
        return this.position
    }

}


class Game {

    private level = 1;
    private health = 100;
    private position = 'Inicio';

    constructor(level: number, health: number, position: string) {
        this.level = level;
        this.health = health;
        this.position = position;

        console.log(`Jugando en el nivel ${level}
            salud: ${this.health}
            posición: ${this.position}
            `)
    }

    save(): GameMemento {
        return new GameMemento(this.level, this.health, this.position)
    }

    play(level: number, health: number, position: string): void {
        this.level = level;
        this.health = health;
        this.position = position;

        console.log(`Jugando en el nivel ${this.level}
            salud: ${this.health}
            posición: ${this.position}
            `)
    }

    restore(memento: GameMemento): void {
        this.level = memento.getLevel()
        this.health = memento.getHealth()
        this.position = memento.getPosition()

        console.log(`%cProgreso restaurado
            %cRestauración en el nivel %c${this.level}
            salud: ${this.health}
            posición: ${this.position}
            `, COLORS.yellow, COLORS.blue, COLORS.white)

    }
}


class GameHistory {

    private mementos: GameMemento[] = []

    push(memento: GameMemento) {
        this.mementos.push(memento)
    }
    pop(): GameMemento | undefined {
        return this.mementos.pop()
    }
}


function main() {

    const game = new Game(1, 100, 'Inicio');
    const history = new GameHistory()
    history.push(game.save())
    // Jugador avanza en el juego

    game.play(2, 90, 'Bosque Encantado')
    history.push(game.save())

    game.play(3, 70, 'Cueva Oscura')
    history.push(game.save())

    game.play(4, 50, 'Castillo del Dragón')
    console.log('%c\nESTADO ACTUAL', COLORS.green)

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    game.restore(history.pop()!)
    console.log('%c\nDespués de restaurar el último estado', COLORS.green)

     // biome-ignore lint/style/noNonNullAssertion: <explanation>
     game.restore(history.pop()!)
     console.log('%c\nDespués de restaurar el último estado', COLORS.green)
 


}

main()