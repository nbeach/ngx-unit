import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Type} from "@angular/core";
import {concat, defaultTo} from 'lodash';
import {selectComponent, selectComponents} from "./dom";
import {mockComponent} from "./mock-component";

export class ComponentTestContext<T> {
    constructor(private _fixture: ComponentFixture<T>) {}

    public element = (selector: string): Element | null => this._fixture.nativeElement.querySelector(selector);
    public elements = (selector: string): NodeListOf<Element> => this._fixture.nativeElement.querySelectorAll(selector);
    public child = <T>(selectorOrType: string | Type<T>): T => selectComponent(selectorOrType, this._fixture);
    public children = <T>(selectorOrType: string | Type<T>): T[] => selectComponents(selectorOrType, this._fixture);
    public detectChanges = () : void => this._fixture.detectChanges();

    get subject(): T {
        return this._fixture.componentInstance
    }

    get subjectElement(): Element {
        return this._fixture.nativeElement;
    }

    get fixture(): ComponentFixture<T> {
        return this._fixture;
    }

}

export interface TestConfig<T> {
    subject: Type<T>
    mock?: Type<any>[];
    use?: Type<any>[];
    methodMockFactory?: () => any;
}

export function testComponent<T>(config: TestConfig<T>): ComponentTestContext<T> {
    const realComponents = defaultTo(config.use, []);
    const mockComponents = defaultTo(config.mock, [])
        .map(type => mockComponent(type, config.methodMockFactory));

    TestBed.configureTestingModule({
        declarations: concat(config.subject, mockComponents, realComponents),
    });
    const fixture = TestBed.createComponent(config.subject);
    fixture.detectChanges();

    return new ComponentTestContext(fixture);
}

