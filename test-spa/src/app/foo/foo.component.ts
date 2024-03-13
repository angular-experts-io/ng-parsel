import { Component, EventEmitter, input, Input, Output } from '@angular/core';

@Component({
  selector: 'foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.styles.scss'],
})
export class FooComponent {
  @Input() test: string | undefined;
  @Input() set myValue(value: string) {
    console.log(value);
  }

  name = input<string>('Paul Atreides');

  @Output() fooChanged = new EventEmitter();
  foo: string | undefined;
}
