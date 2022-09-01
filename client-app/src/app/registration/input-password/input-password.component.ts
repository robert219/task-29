import {
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true,
    },
    {
      provide: MatFormFieldControl,
      useExisting: InputPasswordComponent,
    },
  ],
})
export class InputPasswordComponent
  implements
    MatFormFieldControl<string>,
    ControlValueAccessor,
    OnInit,
    OnDestroy
{
  public static nextId = 0;

  @HostBinding() id = `app-password-input-${InputPasswordComponent.nextId++}`;

  public isPasswordVisible = false;

  public inputTypeMap = new Map<boolean, string>([
    [true, 'text'],
    [false, 'password'],
  ]);

  public iconMap = new Map<boolean, string>([
    [true, 'visibility'],
    [false, 'visibility_off'],
  ]);

  onChange: any = () => {};
  onTouch: any = () => {};
  setDescribedByIds = () => {};

  ngControl!: NgControl;

  focused = false;
  touched = false;

  stateChanges = new Subject<void>();

  errorState!: boolean;
  shouldLabelFloat!: boolean;
  controlType?: string | undefined;
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;

  public passwordText = '';

  @Input()
  get value(): string {
    return this.passwordText;
  }

  set value(text: string) {
    this.passwordText = text;
    this.stateChanges.next();
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder!: string;

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = req;
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value;
    this.stateChanges.next();
  }
  private _disabled = false;

  get empty() {
    return !this.passwordText;
  }

  @HostListener('focusin')
  onFocusIn() {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  @HostListener('focusout')
  onFocusOut() {
    this.touched = true;
    this.focused = false;
    this.onTouch();
    this.stateChanges.next();
  }

  constructor(
    private elementRef: ElementRef,
    @Inject(Injector) private injector: Injector
  ) {}

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this.elementRef.nativeElement.querySelector('input').focus();
    }
  }

  public valueChanged() {
    this.onChange(this.passwordText);
    this.onTouch();
    this.stateChanges.next();
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }
}
