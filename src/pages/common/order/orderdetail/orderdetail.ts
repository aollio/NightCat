import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {SharedService} from "../../../../service/share.service";
import {AbsCommonPage} from "../../abs";
import {PayPage} from "../../../employer/pay/pay";
import {CommentOrderPage} from "../comment-order/comment-order";
import {ProjectsService} from "../../../../service/ajax/projects.service";
import {Util} from "../../../../service/util";
import {GrabOrderPage} from "../grab-order/grab-order";
import {OrderProcessPreSelectedPage} from "../orderprocess/order-process-pre-selectdes/order-process-pre-selectdes";
import {UsersService} from "../../../../service/ajax/users.service";

declare let initializeFontSize: any
/*
 * 订单详情
 * */

declare let window: any;

// @IonicPage()
@Component({
    selector: 'page-projectdetail',
    templateUrl: 'projectdetail.html',
})
export class ProjectDetailPage extends AbsCommonPage {


    project;

    creator = {};
    nickname = '';

    isDesigner: boolean;
    collectstate: any = 0;
    pay: any = PayPage;
    commentorder: any = CommentOrderPage;
    orderrocessPreSelectdesPage: any = OrderProcessPreSelectedPage;

    /**
     * 先暂时设为参数为order id，或者为order的对象。
     * 构造器判断一下，如果是order id，则显示加载符号，如果是order直接显示
     * */
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public share: SharedService,
                private projsServ: ProjectsService,
                private userServ: UsersService,
                private util: Util,
                private alertCtrl: AlertController) {
        super(share);
        this.project = navParams.get('project');
        this.isDesigner = share.currentModuleIsDesigner;
        this.util.updateObj(this.creator, this.userServ.getUserByUid(this.project.create_by))
        this.getProjectCreator(this.project).then(nickname => this.nickname = nickname)
    }

    ionViewDidEnter() {
        initializeFontSize()
    }


    open(page, option) {
        this.navCtrl.push(page, {})
    }

    /*
    * favorite one order
    * */
    collect() {
        this.collectstate = (++this.collectstate) % 2;
    }

    getTel() {

        let alert = this.alertCtrl.create({
            title: '联系电话',
            message: '18217699893',
            buttons: [
                {
                    text: '确认',
                    handler: () => {
                        window.location.href = "tel:" + 18217699893;
                        alert.dismiss()
                    }
                }
            ]
        });
        alert.present();

    }

    grabOrder() {
        this.util.createLoading('正在抢单中')
        this.projsServ.grabProj('this is project\'s id')
            .then(() => {
            })
            .catch(error => {
            })
    }

    formatTime1(create_time) {
        console.log(create_time);
        let date = new Date(create_time);
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        return year + '-' + month + '-' + day;
    }

    openGrabOrderPage(orderId) {
        this.navCtrl.push(GrabOrderPage, orderId);
    }


    async getProjectCreator(project) {
        let users = await this.userServ.allUser();
        for (let user of users) {
            if (project.create_by == user.uid) {
                return user.nickname;
            }
        }
    }


}
