"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var angular_1 = require("@ionic/angular");
var authentication_page_1 = require("./authentication.page");
describe('AuthenticationPage', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [authentication_page_1.AuthenticationPage],
            imports: [angular_1.IonicModule.forRoot()]
        }).compileComponents();
        fixture = testing_1.TestBed.createComponent(authentication_page_1.AuthenticationPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=authentication.page.spec.js.map