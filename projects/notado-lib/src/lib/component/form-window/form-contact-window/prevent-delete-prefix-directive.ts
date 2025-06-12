import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[preventDeletePrefix]'
})
export class PreventDeletePrefixDirective {
  private readonly prefix = '(+';

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: InputEvent): void {
    const input = this.el.nativeElement;
    if (!input.value.startsWith(this.prefix)) {
      input.value = this.prefix + input.value.replace(this.prefix, '');
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const input = this.el.nativeElement;
    const caretPosition = input.selectionStart;

    // Prevent deletion of the prefix
    if (
      caretPosition <= this.prefix.length &&
      (event.key === 'Backspace' || event.key === 'Delete')
    ) {
      event.preventDefault();
    }
  }
}
