import { Translate } from '@google-cloud/translate';

export class TranslationService {
  public projectId: string = 'translate-231922';
  public translate: Translate;

  public constructor() {
    this.translate = new Translate({
      projectId: this.projectId,
    });
  }

  public detectLanguageOfText(textToDetect : string) {
    this.translate.detect(textToDetect, (err, results) => {
      if (!err) {
        if(Array.isArray(results)) {
          return results[0];
        }
        return results;
      }
    })
  }
}