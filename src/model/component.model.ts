export interface MitchellAngularFieldDecorator {
  decorator: string;
  name: string;
  type?: string;
  initializer ?: string;
  field: string;
}

export interface MitchellAngularComponent {
  name: string;
  selector: string;
  standalone: boolean;
  inputs: MitchellAngularFieldDecorator[];
  outputs: MitchellAngularFieldDecorator[];
  implementation: string;
  template: string;
  styles: string | string[];
}
