import { Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective implements OnDestroy {
  @Input() tooltip = ''; // The text for the tooltip to display
  @Input() delay? = 190; // Optional delay input, in ms

  private myPopup: any;
  private timer: any;

  constructor(private el: ElementRef) {}

  ngOnDestroy(): void {
    if (this.myPopup) {
      this.myPopup.remove();
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.timer = setTimeout(() => {
      let x = this.el.nativeElement.getBoundingClientRect().left + this.el.nativeElement.offsetWidth / 2; // Get the middle of the element
      let y = this.el.nativeElement.getBoundingClientRect().top + this.el.nativeElement.offsetHeight + 6; // Get the bottom of the element, plus a little extra
      this.createTooltipPopup(x, y);
    }, this.delay);
  }

  @HostListener('mousedown') dragstart() {
    console.log('Drag start');
    if (this.timer) clearTimeout(this.timer);
    if (this.myPopup) {
      this.myPopup.remove();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.timer) clearTimeout(this.timer);
    if (this.myPopup) {
      this.myPopup.remove();
    }
  }

  public mySuperMethod(): string {
    return 'This method is awesome';
  }

  private createTooltipPopup(x: number, y: number) {
    let popup = document.createElement('div');
    popup.innerHTML = this.tooltip;
    popup.setAttribute('class', 'tooltip-container');
    popup.style.top = y.toString() + 'px';
    popup.style.left = x.toString() + 'px';
    document.body.appendChild(popup);
    this.myPopup = popup;
  }
}
