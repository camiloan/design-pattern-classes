import { COLORS } from '../helpers/colors.ts';
/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

interface Observer {
    notify(videoTitle: string): void
}

class YouTubeChannel {
    private subscribers: Observer[] = []
    private name: string;

    constructor(name: string) {
        this.name = name
    }

    subscribe(observer: Observer): void {
        this.subscribers.push(observer);
        console.log(`Nuevo suscriptor al canal %c${this.name}`, COLORS.green);
    }

    unsubscribe(observer: Observer): void {
        this.subscribers = this.subscribers.filter(sub => sub !== observer)
        console.log(`Un suscriptor se ha dado de baja %c${this.name}`, COLORS.blue);
    }

    uploadVideo(videoTitle: string): void {
        console.log(`Canal ${this.name} ha subido un nuevo video %c${videoTitle}`, COLORS.purple)
        for (const subscriber of this.subscribers) {
            subscriber.notify(videoTitle)
        }
    }

}

class Subscriber implements Observer {
    private name: string;

    constructor(name: string) {
        this.name = name
    }
    notify(videoTitle: string): void {
        console.log(`${this.name} ha sido notificado: %cNuevo video ${videoTitle}`, COLORS.yellow)
    }

}
function main() {
    const channel = new YouTubeChannel('Cocinando con Camilo')
    const mellisa = new Subscriber('Mellisa')
    const cesar = new Subscriber('Cesar')
    const emilio = new Subscriber('Emilio')
    channel.subscribe(mellisa)
    channel.subscribe(cesar)

    channel.uploadVideo('Receta de Tamales de Angular')
    channel.subscribe(emilio)

    channel.uploadVideo('Receta de React al Pastor')
    channel.unsubscribe(cesar)
    channel.uploadVideo('Receta de Vue de choclo')
    channel.unsubscribe(emilio)
    channel.uploadVideo('Parrillada de Node JS')
    channel.unsubscribe(mellisa)
    channel.uploadVideo('Docker a la plancha')


}
main()

