import {Component} from '@angular/core';

import {AboutPage} from '../../common/about/about';
import {NavController, Platform} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";

@Component({
    templateUrl: 'tabs.html'
})
export class EmployerTabsPage {

    home: any;
    helpchoose: any;
    publishorder: any;
    project: any;
    me: any;


    constructor(public navCtrl: NavController, public platform: Platform,
                public statusBar: StatusBar, public splashScreen: SplashScreen) {
    }


}
