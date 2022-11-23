import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.styles.scss']
})
export class FooComponent {
  @Input() test: string | undefined;
  @Output() fooChanged = new EventEmitter();
  foo: string | undefined;
}
