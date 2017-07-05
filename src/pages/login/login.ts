import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    showNoModifyName: boolean = false

    constructor(public navCtrl: NavController, public navParams: NavParams) {

        if (navParams.get('type') === 'employer') {
            this.showNoModifyName = true
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

}
