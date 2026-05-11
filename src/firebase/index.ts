
'use client';

/**
 * Barrel file for Firebase functionality.
 * Note: initializeFirebase is exported from ./init to avoid circular imports.
 */
export { initializeFirebase } from './init';
export * from './provider';
export * from './client-provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
