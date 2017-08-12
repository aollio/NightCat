import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {ModifyProfilePage} from "../modifyprofile/modifyprofile";
import {SharedService} from "../../../../service/share.service";
import {User} from "../../../../model/user";
import {CaseDetailPage} from "../casedetail/casedetail";
import {ChatPage} from "../../../im/chat/chat";
import {AlertController} from 'ionic-angular';
import {Util} from "../../../../service/util";


@Component({
    selector: 'page-designer-me-detail',
    templateUrl: 'medetail.html'
})
export class DesignerMeDetailPage {
    btnState: any = 1;
    user = {};
    maincolor;
    public isDesigner: boolean;

    cases: Array<{ title, desc, fav_count, comment_count, time }> = [
        {
            title: '案例标题', desc: 'It’s often necessary to create social cards within an application.',
            fav_count: 15, comment_count: 2, time: '11 min ago'
        },
        {
            title: '案例标题', desc: 'It’s often necessary to create social cards within an application.',
            fav_count: 15, comment_count: 2, time: '11 min ago'
        },
        {
            title: '案例标题', desc: 'It’s often necessary to create social cards within an application.',
            fav_count: 15, comment_count: 2, time: '11 min ago'
        },
    ];

    constructor(public navCtrl: NavController,
                public shared: SharedService,
                public alertCtrl: AlertController,
                public navParams: NavParams,
                private util: Util) {
        // this.isDesigner = shared.isDesigner;
        this.user = navParams.get('designer');
        // this.user = navParams.get('designer') || shared.getCurrentUser();
        this.maincolor = this.shared.getPrimaryColor();
    }


    openCaseDetail() {
        this.navCtrl.push(CaseDetailPage)
    }

    modify() {
        this.navCtrl.push(ModifyProfilePage);
    }

    case() {
        this.btnState = 1;
    }

    honor() {
        this.btnState = 2;
    }

    experice() {
        this.btnState = 3;
    }

    openChat(user) {
        if (this.shared.isLogin()) {
            this.navCtrl.push(ChatPage, {account: user.accid, to: user})
        } else {
            this.util.presentLoginPage(this.navCtrl);
        }
    }

    //todo
    showHelp() {
        let alert = this.alertCtrl.create({
            title: '星级',
            subTitle: '星级越高, 设计师的综合评价就越高哦',
            buttons: ['OK']
        });
        alert.present();
    }

}