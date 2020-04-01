export class Memo {
    private id: string;
    private sourceWord: string;
    private translatedWord: string;

    constructor(id: string, sourceWord:string, translatedWord: string) {
        this.id = id;
        this.sourceWord = sourceWord;
        this.translatedWord = translatedWord;
    }

    public getId() : string {
        return this.id;
    }

    public getSourceWord() : string {
        return this.sourceWord;
    }

    public getTranslatedWord(): string {
        return this.translatedWord;
    }
}