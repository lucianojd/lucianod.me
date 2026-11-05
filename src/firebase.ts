import { readFileSync } from 'node:fs';
import admin from 'firebase-admin';
import { getApps, getApp } from 'firebase-admin/app';
import {
  initializeFirestore,
  Firestore,
  Timestamp,
} from 'firebase-admin/firestore';
import type { App } from 'firebase-admin';
import { FIREBASE } from '@src/constants';
import { NasaMedia } from './types/apod';

export class FirebaseGlobalError extends Error {
  constructor(
    message: string,
    public readonly originalError?: Error,
  ) {
    super(`firebase: ${message}`);
    this.name = 'FirebaseGlobalError';
  }
}

function FirebaseCredentialError(message: string): FirebaseGlobalError {
  return new FirebaseGlobalError(`Firebase credential error: ${message}`);
}

function FailedToWriteError(
  message: string,
  originalError?: Error,
): FirebaseGlobalError {
  return new FirebaseGlobalError(
    `Failed to write APOD data: ${message}`,
    originalError,
  );
}

function FailedToReadError(
  message: string,
  originalError?: Error,
): FirebaseGlobalError {
  return new FirebaseGlobalError(
    `Failed to read APOD data: ${message}`,
    originalError,
  );
}

export default class FirebaseGlobal {
  private static app: App;
  private static firestore: Firestore;

  static init() {
    const firebaseCredential = FIREBASE.credential;
    if (!firebaseCredential) {
      throw FirebaseCredentialError(
        'Firebase credential is not set in environment variables.',
      );
    }
    const credentialContents = readFileSync(firebaseCredential, 'utf8');
    FirebaseGlobal.app = !getApps().length
      ? admin.initializeApp({
          credential: admin.cert(JSON.parse(credentialContents)),
        })
      : getApp();
    FirebaseGlobal.firestore = initializeFirestore(
      FirebaseGlobal.app,
      {},
      'lucianod',
    );
  }

  static getFirestoreInstance() {
    if (!FirebaseGlobal.firestore) {
      FirebaseGlobal.init();
    }
    return FirebaseGlobal.firestore;
  }
}

const apodCollection = 'apod';

export async function writeApod(nasaMedia: NasaMedia) {
  try {
    const collectionRef =
      FirebaseGlobal.getFirestoreInstance().collection(apodCollection);

    const now = new Date();
    const offset = now.getTime() + 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const docItem = {
      ...nasaMedia,
      expireAt: Timestamp.fromDate(new Date(offset)),
      createdAt: Timestamp.fromDate(now),
    };

    collectionRef.doc(nasaMedia.date).set(docItem, { merge: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw FailedToWriteError(
        `Failed to write APOD data: ${error.message}`,
        error,
      );
    } else {
      throw FailedToWriteError('Failed to write APOD data: Unknown error');
    }
  }
}

export async function readApod(
  offset: number,
  count: number,
): Promise<NasaMedia[] | null> {
  try {
    const collectionRef =
      FirebaseGlobal.getFirestoreInstance().collection(apodCollection);

    const docSnapshots = await collectionRef
      .orderBy('date', 'desc')
      .offset(offset)
      .limit(count)
      .get();

    if (docSnapshots.empty) return null;

    return docSnapshots.docs.map((doc) => doc.data() as NasaMedia);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw FailedToReadError(
        `Failed to read APOD data: ${error.message}`,
        error,
      );
    } else {
      throw FailedToReadError('Failed to read APOD data: Unknown error');
    }
  }
}

export async function readApodByDate(
  date: string | string[],
): Promise<NasaMedia[] | null> {
  try {
    const collectionRef =
      FirebaseGlobal.getFirestoreInstance().collection(apodCollection);

    if (Array.isArray(date)) {
      const docSnapshots = await collectionRef.where('date', 'in', date).get();
      return docSnapshots.docs.map((doc) => doc.data() as NasaMedia);
    } else {
      const docSnapshot = await collectionRef.doc(date).get();

      if (!docSnapshot.exists) return null;

      return [docSnapshot.data() as NasaMedia];
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw FailedToReadError(
        `Failed to read APOD data: ${error.message}`,
        error,
      );
    } else {
      throw FailedToReadError('Failed to read APOD data: Unknown error');
    }
  }
}
