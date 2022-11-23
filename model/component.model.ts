
export interface AngularComponent {
    name: string;
    selector: string;
    standalone: boolean;
    inputs: any[];
    outputs: any[];
    implementation: string;
    template: string;
    styles: string;
}
