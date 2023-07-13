import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {

  constructor(private firestore: Firestore,
    private logger: LogService) { }

  async get(flag: string): Promise<boolean> {
    try {
      const docRef = doc(this.firestore, 'feature-flags', flag);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        return snapshot.data()['prod'] as boolean;
      }

      return false;
    } catch (err: any) {
      this.logger.logError(err.toString());
      return false;
    }
  }

  async captchaHabilitado(): Promise<boolean> {
    return await this.get('habilitar-captcha');
  }
}
