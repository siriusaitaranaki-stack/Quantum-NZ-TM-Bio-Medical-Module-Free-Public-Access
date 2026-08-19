/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @SYSTEM: FIREBASE FIRESTORE & AUTHENTICATION CONFIGURATION
 * @PROJECT_ID: sirius-ai-lumana-4840
 * @DATABASE_ID: ai-studio-quantumnzmedical-55b64437-a0b8-490a-84ed-eada7d259c98
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001
 * ==============================================================================================
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfigJson from '../../firebase-applet-config.json';

export const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  projectId: firebaseConfigJson.projectId,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId,
  appId: firebaseConfigJson.appId,
  measurementId: firebaseConfigJson.measurementId
};

export const databaseId = firebaseConfigJson.firestoreDatabaseId || '(default)';

// Initialize Firebase App
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore with specific Database ID
export const db = getFirestore(app, databaseId);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Connectivity check test
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'system', 'connection_health'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('[Firebase] Offline or network error during connection test.');
      return false;
    }
    // Non-existent document or permission error still means server is reachable
    return true;
  }
}
