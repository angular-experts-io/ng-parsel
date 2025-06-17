import { Component, computed, EventEmitter, input, Input, model, Output, signal } from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss'],
  standalone: true,
})
export class FeatureComponent {
  /**
   * Regular class field representing the component's title
   */
  public title: string = 'Feature Component';

  /**
   * Private counter value used for internal state management
   */
  private _counter = signal(0);

  /**
   * Public signal exposing the current counter value
   * @returns The current counter value
   */
  public counter = this._counter;

  /**
   * Computed signal that returns the doubled counter value
   * @returns The counter value multiplied by 2
   */
  public doubledCounter = computed(() => this._counter() * 2);

  /**
   * Traditional Input decorator for receiving a theme value
   */
  @Input() theme: 'light' | 'dark' = 'light';

  /**
   * Input setter that logs when the value changes
   * @param value - The new value to set
   */
  @Input() set logValue(value: string) {
    console.log('logValue changed:', value);
    this._logValue = value;
  }
  get logValue(): string {
    return this._logValue;
  }
  private _logValue: string = '';

  /**
   * Signal input for the component name with default value
   */
  name = input<string>('Feature');

  /**
   * Required signal input for the user ID
   */
  userId = input.required<string>();

  /**
   * Signal input for feature flags with default value
   */
  isEnabled = input(true);

  /**
   * Signal input for configuration object
   */
  config = input({
    showHeader: true,
    maxItems: 10,
  });

  /**
   * Two-way bindable model signal
   */
  checked = model(false);

  /**
   * Traditional Output decorator for emitting when the counter changes
   */
  @Output() counterChanged = new EventEmitter<number>();

  /**
   * Traditional Output decorator for emitting when an action is performed
   */
  @Output() actionPerformed = new EventEmitter<string>();

  /**
   * Increments the counter value and emits the new value
   */
  public increment(): void {
    this._counter.update((value) => value + 1);
    this.counterChanged.emit(this._counter());
  }

  /**
   * Decrements the counter value and emits the new value
   */
  public decrement(): void {
    this._counter.update((value) => value - 1);
    this.counterChanged.emit(this._counter());
  }

  /**
   * Resets the counter to zero and emits the new value
   */
  public reset(): void {
    this._counter.set(0);
    this.counterChanged.emit(0);
    this.actionPerformed.emit('reset');
  }

  /**
   * Performs a custom action and emits the action name
   * @param actionName - The name of the action being performed
   */
  public performAction(actionName: string): void {
    console.log(`Performing action: ${actionName}`);
    this.actionPerformed.emit(actionName);
  }
}
