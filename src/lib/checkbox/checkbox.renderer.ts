import {
  AfterViewInit,
  ElementRef,
  Injectable,
  OnInit,
  Renderer2,
} from '@angular/core';

const svgNamespace: string = 'http://www.w3.org/2000/svg';

@Injectable()
export class MdcCheckboxRenderer implements AfterViewInit, OnInit {
  private background!: HTMLElement;
  private get control(): HTMLInputElement {
    return this.controlRef.nativeElement;
  }
  private parent!: HTMLElement;
  private wrapper!: HTMLElement;

  constructor(
    private readonly controlRef: ElementRef<HTMLInputElement>,
    private readonly renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.wrapper = this.createWrapper();
    this.background = this.createBackground();
  }

  ngAfterViewInit(): void {
    this.parent = this.renderer.parentNode(this.control);
    this.addControlClass();
    this.wrapControl();
    this.insertBackgroundAfterControl();
  }

  private addControlClass(): void {
    this.renderer.addClass(this.control, 'mdc-checkbox__native-control');
  }

  private appendControlToWrapper(): void {
    this.renderer.appendChild(this.wrapper, this.control);
  }

  private createBackground(): HTMLElement {
    const background: HTMLElement = this.renderer.createElement('div');
    this.renderer.addClass(background, 'mdc-checkbox__background');

    this.renderer.appendChild(background, this.createCheckMark());
    this.renderer.appendChild(background, this.createMixedMark());

    return background;
  }

  private createCheckMark(): SVGSVGElement {
    const checkMarkBox: SVGSVGElement = this.createSvgElement('svg');
    this.renderer.addClass(checkMarkBox, 'mdc-checkbox__checkmark');
    this.renderer.setAttribute(checkMarkBox, 'viewBox', '0 0 24 24');

    const checkMark: SVGPathElement = this.createSvgElement('path');
    this.renderer.addClass(checkMark, 'mdc-checkbox__checkmark-path');
    this.renderer.setAttribute(checkMark, 'fill', 'none');
    this.renderer.setAttribute(checkMark, 'stroke', 'white');
    this.renderer.setAttribute(
      checkMark,
      'd',
      'M1.73,12.91 8.1,19.28 22.79,4.59');

    this.renderer.appendChild(checkMarkBox, checkMark);

    return checkMarkBox;
  }

  private createMixedMark(): HTMLElement {
    const mixedMark: HTMLElement = this.renderer.createElement('div');
    this.renderer.addClass(mixedMark, 'mdc-checkbox__mixedmark');

    return mixedMark;
  }

  private createSvgElement<T extends SVGElement = SVGElement>(
    name: string,
  ): T {
    return this.renderer.createElement(name, svgNamespace);
  }

  private createWrapper(): HTMLElement {
    const wrapper: HTMLElement = this.renderer.createElement('div');
    this.renderer.addClass(wrapper, 'mdc-checkbox');

    return wrapper;
  }

  private insertBackgroundAfterControl(): void {
    this.renderer.appendChild(this.wrapper, this.background);
  }

  private insertWrapperBeforeControl(): void {
    this.renderer.insertBefore(this.parent, this.wrapper, this.control);
  }

  private removeControlFromParent(): void {
    this.renderer.removeChild(this.parent, this.control);
  }

  private wrapControl(): void {
    this.insertWrapperBeforeControl();
    this.removeControlFromParent();
    this.appendControlToWrapper();
  }
}
