import { Component, Input, ElementRef, ViewChild } from '@angular/core';

import { Subject, Observable, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent {
  @Input() label: string;
  @Input() typeaheadOptions: Array<string>;

  @ViewChild("input", { static: false }) input: ElementRef<HTMLInputElement>;

  private _destroy$ = new Subject();

  addEvent = (element: HTMLInputElement | HTMLDivElement, event) => {
     fromEvent(element, event)
        .pipe(
          takeUntil(this._destroy$)
        ).subscribe(e => console.log(`Input event ::: ${e.type}`));
  }

  ngAfterViewInit() {
     this.addEvent(this.input.nativeElement,'focus');
  }

  ngOnDestroy(){
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }

}