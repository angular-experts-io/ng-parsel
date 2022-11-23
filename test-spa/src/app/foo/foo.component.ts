import {Component, Input} from "@angular/core";

@Component({
  selector: 'foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.styles.scss']
})
export class FooComponent {
  @Input() test: string | undefined;
  foo: string | undefined;
}
