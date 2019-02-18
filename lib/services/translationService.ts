import { Translate } from '@google-cloud/translate';
import { text } from 'body-parser';

export class TranslationService {
  public projectId: string = 'translate-231922';
  public translate: Translate;

  public constructor() {
    this.translate = new Translate({
      projectId: this.projectId,
    });
  }

  public detectLanguageOfText = (textToDetect : string) => {
    return this.translate.detect(textToDetect)
      .then(results => {
        console.log(results);
          if(Array.isArray(results)) {
            return results[0];
          }
          return results;
      })
  }

  public translateWord = (textToTranslate: string, from: string, to: string) => {
    return this.translate.translate(textToTranslate, { from, to })
      .then(results => {
        if(results.length > 0) {
          return results[0];
        }
      })
  }
}