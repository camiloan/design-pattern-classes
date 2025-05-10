import { COLORS } from '../helpers/colors';
/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

class CodeEditorState {
    readonly content: string;
    readonly cursorPosition: number;
    readonly unsaveChanges: boolean;

    constructor(content: string, cursorPosition: number, unsavedChanges: boolean) {
        this.content = content;
        this.cursorPosition = cursorPosition;
        this.unsaveChanges = unsavedChanges
    }

    displayState() {
        console.log('\n%cEstado del editor', COLORS.green)
        console.log(`
            Contenido: ${this.content}
            Cursor Pos: ${this.cursorPosition}
            Unsaved changes: ${this.unsaveChanges}
            `)
    }

    copyWith({ content, cursorPosition, unsaveChanges }: Partial<CodeEditorState>): CodeEditorState {

        return new CodeEditorState(
            content ?? this.content,
            cursorPosition ?? this.cursorPosition,
            unsaveChanges ?? this.unsaveChanges)
    }
}


class CodeEditorHistory {
    private history: CodeEditorState[] = []
    private currentIndex = -1

    save(state: CodeEditorState): void {

        if (this.currentIndex < this.history.length - 1) {
            this.history = this.history.splice(0, this.currentIndex + 1)
        }
        this.history.push(state)
        this.currentIndex++

    }

    redo(): CodeEditorState | null {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++
            return this.history[this.currentIndex]
        }
        return null
    }

    undo(): CodeEditorState | null {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            return this.history[this.currentIndex]
        }
        return null
    }
}


function main() {
    const history = new CodeEditorHistory();
    console.log('%cEstado inicial', COLORS.blue)
    let editorState = new CodeEditorState(
        "console.log('Hola Mundo')",
        2,
        false
    )
    history.save(editorState)
    editorState.displayState();


    console.log('%cDespués del primero cambio', COLORS.blue)
    editorState = editorState.copyWith({
        content: "console.log('Hola Mundo') \nconsole.log('Nueva línea')",
        cursorPosition: 3,
        unsaveChanges: true
    })
    history.save(editorState)
    editorState.displayState();

    console.log('%cDespués de mover el cursor', COLORS.blue)
    editorState = editorState.copyWith({
        cursorPosition: 5,
    })
    history.save(editorState)
    editorState.displayState();

    console.log('%cDespués de Undo', COLORS.red)
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    editorState = history.undo()!;
    editorState.displayState();

    
    console.log('%cDespués de Redo', COLORS.orange)
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    editorState = history.redo()!;
    editorState.displayState();



}

main()