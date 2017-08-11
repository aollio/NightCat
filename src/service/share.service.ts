import {Injectable} from "@angular/core";
import {User} from "../model/user";

import {KeynoteService} from "./keynote.service";
import {Events} from "ionic-angular";
import {Util} from "./util";

@Injectable()
export class SharedService {

    //是否为演示模式, 各个和网络连接有关的, 如果检测到为true, 则不进行网络传送, 使用测试数据进行演示
    KEYNOTE: boolean = false;

    //是否为开发模式, 开发模式在使用开发服务器.
    DEBUG: boolean = false;


    //是否为 设计师模块    对于一些公共页面, 执行对应的修改, 例如主题颜色的不相同
    private isDesignerModel: boolean;

    isDesModule() {
        return this.isDesignerModel;
    }

    setIsDesModule(isDesigner) {
        console.log("isDesigner", isDesigner);
        this.isDesignerModel = isDesigner;
    }

    //end 是否为 设计师模块


    //第一次使用
    private _isFirstUse = true;


    //用户角色的字符串
    ROLE_DESIGNER: string = 'designer';
    ROLE_EMPLOYER: string = 'employer';

    ROLE_SERVER_DESIGNER = 0;
    ROLE_SERVER_EMPLOYER = 1;


    constructor(private event: Events,
                private util: Util,
                private keynote: KeynoteService) {
        event.subscribe('backdoor', (user) => {
            console.log('receive \'backdoor\' event');
            this.keynote.initDefaultUser(true, this);
        })
    }

    //获取导航栏的颜色
    getPrimaryColor() {
        if (this.isDesModule()) {
            return 'des-primary';
        } else {
            return 'emp-primary';
        }
    }


    //当前登录用户
    private currentUser = {};

    getCurrentUser() {
        return this.currentUser;
    }

    setCurrentUser(user) {
        this.currentUser = user;
        if (user['role'] == 0) {
            this.setIsDesModule(true);
        } else {
            this.setIsDesModule(false);
        }
    }

    clearCurrentUser() {
        this.currentUser = {};
    }

    //end 当前登录用户


    // isDesigner() {
    //     return this.currentModuleIsDesigner;
    // }

    //用户是否登录
    isLogin() {
        let isLogin = !this.util.isEmptyObj(this.currentUser);
        // console.log('isLogin', isLogin);
        return isLogin;
    }

    // 判断用户是否第一次使用
    isFirstUse() {
        return this._isFirstUse;
    }

    setIsNotFirstUse() {
        this._isFirstUse = false;
    }
}


