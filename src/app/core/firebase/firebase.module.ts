import { NgModule } from '@angular/core';
import { FirebaseOptions } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule, APP_NAME, ScreenTrackingService, UserTrackingService } from '@angular/fire/compat/analytics';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

const firebaseConfig: Readonly<FirebaseOptions> = {
  apiKey: "AIzaSyAFvNurg0IOZb61Q9oK53zlJwJjMTu76E0",
  authDomain: "lab-movil-2222.firebaseapp.com",
  projectId: "lab-movil-2222",
  storageBucket: "lab-movil-2222.appspot.com",
  messagingSenderId: "590170055799",
  appId: "1:590170055799:web:547c5eb940098c731b9272",
  measurementId: "G-42ZF6P609G"
} as const;

@NgModule({
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    AngularFireFunctionsModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    { provide: APP_NAME, useValue: 'DASHBOARD' }
  ],
  exports: [
    AngularFireModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    AngularFireFunctionsModule,
    AngularFireDatabaseModule,
  ]

})
export class FirebaseModule { }
