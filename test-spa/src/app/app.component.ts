import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'test-spa';

  /**
   * Handler for the counterChanged event from the FeatureComponent
   * @param value - The new counter value
   */
  onCounterChanged(value: number): void {
    console.log('Counter changed:', value);
  }

  /**
   * Handler for the actionPerformed event from the FeatureComponent
   * @param action - The name of the action performed
   */
  onActionPerformed(action: string): void {
    console.log('Action performed:', action);
  }
}
