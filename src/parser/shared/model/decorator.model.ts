export interface NgParselFieldDecorator {
  decorator: string;
  name: string;
  type?: string | 'inferred';
  required?: boolean;
  initializer?: string;
  initialValue?: string | null;
  field: string;
}

export interface NgParselDecoratorProperties {
  selector?: string;
  standalone?: boolean;
  template?: string;
  templateUrl?: string;
  styles?: string;
  styleUrls?: string[];
  animations?: any[];
  encapsulation?: string;
  changeDetection?: string;
  name?: string;
  pure?: boolean;
}
