import { NgModule } from '@angular/core';
import { AngularFireModule, FirebaseOptions } from '@angular/fire';
import { AngularFireAnalyticsModule, APP_NAME, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireStorageModule } from '@angular/fire/storage';

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
