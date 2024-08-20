import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  public counter = signal(0);
  public counter$ = new BehaviorSubject(0);
  public increment = new Subject<number>();

  public foo = true;

  private notVisible = 'blub';
}
