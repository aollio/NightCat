import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {PublishOrderItemComponent} from "./published-order-item/published-order-item";
import {DesignerItemMax} from "./designer-item-max/designer-item";
import {IonicModule} from "ionic-angular";

@NgModule({
    imports: [IonicModule],

    declarations: [
        PublishOrderItemComponent,
        DesignerItemMax
    ],
    entryComponents: [
        DesignerItemMax
    ],

    exports: [
        PublishOrderItemComponent,
        DesignerItemMax
    ]
})

export class ComponentModule {
}