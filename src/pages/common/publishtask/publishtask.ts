import {Component} from "@angular/core";
import {SharedService} from "../../../service/share.service";
import {AlertController, NavController} from "ionic-angular";
import {Util} from "../../../service/util";
import {ProjectsService} from "../../../service/ajax/projects.service";


declare let initializeFontSize: any;

@Component({
    selector: "page-pulishtask",
    templateUrl: 'publishtask.html'
})
export class PublishTaskPage {

    maincolor: string;
    designer: boolean;

    constructor(public util: Util,
                public shared: SharedService,
                public navCtrl: NavController,
                private projectServ: ProjectsService,
                public alertCtrl: AlertController) {
        this.maincolor = shared.getPrimaryColor();
        this.designer = shared.currentModuleIsDesigner;
    }


    //start 订单发布

    private day = 24 * 60 * 60 * 1000;
    private year = 12 * 30 * this.day;

    private currentTime = new Date();
    // private currentTime = new ;
    private due_min = new Date(this.currentTime.getMilliseconds() + this.day);
    private due_max = new Date(this.currentTime.getMilliseconds() + this.year);


    private project = {
        type: 0,
        title: null,
        content: null,
        budget: null,
        due_time: this.currentTime.toISOString(),
        area: null,
        area_count: 1,
        depth: null,
        period: null,
        start_time: this.currentTime.toISOString(),
        end_time: this.currentTime.toISOString(),
    };

    private isInt(num) {
        return parseInt(num) == num;
    }

    //todo 发布项目参数格式要求 需要仔细调整
    projectIsRegular() {
        let project = this.project;

        if (project.type == 0) return '请选择项目类型';

        if (!project.title || project.title.trim() == "") return '请填写项目标题';
        else if (project.title.length > 100) return '项目标题最多100字';

        if (!project.content || project.content.trim() == "") return '请填写项目内容';
        else if (project.content.length > 100) return '项目内容最多200字';

        if (!project.budget) return '请填写项目预算';
        else if (project.budget < 0) return '项目预算不能为负数';
        else if (!this.isInt(project.budget)) return "项目预算应为整数"

        if (project.due_time == this.currentTime.toISOString()) return '请选择抢单截止时间';

        if (!project.area) return '请填写设计面积';
        else if (project.area < 1) return '请填写设计面积';

        if (!this.isInt(project.area_count)) return '设计面积个数应为整数';

        if (project.depth === null) return '请填写设计深度';

        if (!project.period) return '请填写项目工时';
        else if (project.period < 1) return '请填写项目工时';


        //todo time
        if (project.start_time == this.currentTime.toISOString()) return '请选择开始时间';
        if (project.end_time == this.currentTime.toISOString()) return '请选择结束时间';

        if (project.due_time >= project.start_time) return '开始时间应大于截至时间';
        else if (project.start_time >= project.end_time) return '结束时间应大于开始时间';

        console.log("project", project);

        return true;
    }


    publish() {
        let regularResult = this.projectIsRegular();

        if (regularResult !== true) {  //格式不正确
            this.util.toast(regularResult);
            return;
        }

        let alertConfirm = this.alertCtrl.create({
            title: "是否确认发布",
            buttons: [
                {
                    text: '取消',
                },
                {
                    text: '确认',
                    handler: () => {
                        this.publishTask();
                    }
                }
            ]
        });
        alertConfirm.present();
    }

    publishTask() {
        let loading = this.util.createLoading("", {});
        loading.present();

        this.projectServ.publishProj(this.project)
            .then(project => {
                let alert = this.alertCtrl.create({
                    title: "发布成功！",
                    buttons: [
                        {
                            text: 'Ok',
                            handler: () => {
                                loading.dismiss();
                                this.navCtrl.pop();
                            }
                        }
                    ]
                });
                alert.present();
            })
            .catch(error => {
                this.util.toast("发布失败！");
            });
    }

    //end 订单发布


    goBack() {
        if (this.isInputSome()) {
            let alert = this.alertCtrl.create({
                title: '提醒',
                message: "确定要退出吗？ 您的项目将不会保存",
                buttons: [
                    {
                        text: '取消',
                        handler: data => {
                        }
                    },
                    {
                        text: '确定',
                        handler: data => {
                            this.navCtrl.pop();
                        }
                    }
                ]
            });
            alert.present();
        } else {
            this.navCtrl.pop();
        }
    }

    //判断用户是否输入
    isInputSome() {
        let project = this.project;

        if (project.title && project.title.trim() != "") return true;
        if (project.content && project.content.trim() != "") return true;
        if (project.budget&& project.content.trim() != "") return true;
        if (project.area && project.area.trim() != "") return true;
        if (project.area_count != 1) return true;
        if (project.period && project.period.trim() != "") return true;

        return false;
    }
}