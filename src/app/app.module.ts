import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import {SecurityModule} from './security/security.module';
import {MessageComponent} from './message/message/message.component';
import {CheckLoginComponent} from './message/message/check-login/check-login.component';
import {HomeComponent} from './module/layout/home/home.component';
import {HeaderComponent} from './module/layout/header/header.component';
import {FooterComponent} from './module/layout/footer/footer.component';
import {NewsModule} from './module/news/news.module';
import {RouterModule} from '@angular/router';
import {environment} from '../environments/environment';
import {CommonModule} from '@angular/common';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {EmployeeModule} from './module/employee/employee.module';

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        CheckLoginComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatDialogModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        FormsModule,
        NgxPaginationModule,
        SecurityModule,
        EmployeeModule,
        NewsModule,
        RouterModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        CommonModule,
    ],
    providers: [],
    exports: [
        MessageComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
