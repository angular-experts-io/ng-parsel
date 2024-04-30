import { Component, EventEmitter, input, Input, model, Output } from '@angular/core';

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
  firstname = input.required<string>();
  flag = input(true);
  address = input({
    street: 'my street',
  });

  anotherFlag = model(true);

  @Output() fooChanged = new EventEmitter();
  foo: string | undefined;
}
