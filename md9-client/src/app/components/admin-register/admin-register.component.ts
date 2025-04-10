import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAdmin } from '../../models/admin/admin.interface';
import { mobileValidator } from '../../validators/mobile-validator/mobile-validator';

@Component({
  selector: 'app-admin-register',
  standalone: false,
  templateUrl: './admin-register.component.html',
  styleUrl: './admin-register.component.scss',
})
export class AdminRegisterComponent implements OnInit, OnChanges {
  @Input() admin: IAdmin = null;
  @Input() isEditMode: boolean = false;
  @Input() message: string | null = null; // ✅ Display messages
  @Output() registerAdmin = new EventEmitter<IAdmin>();
  registerForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
      this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['admin'] && this.admin) {
        this.initializeForm();
      }
  }

  private initializeForm() {
    this.registerForm = this.fb.group({
      id: [{value: this.admin?.adminId ?? '', disabled: this.isEditMode}],
      name: [this.admin?.name ?? '', Validators.required],
      username: [{value: this.admin?.username ?? '', disabled: this.isEditMode}, Validators.required],
      password: [this.isEditMode ? '' : '', this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', this.isEditMode ? [] : [Validators.required]],
      email: [this.admin?.email ?? '', [Validators.required, Validators.email]],
      mobile: [this.admin?.mobile ?? '', [Validators.required, mobileValidator()]],
      isSuperAdmin: [this.admin?.isSuperAdmin ?? false],
    }, { validators: this.matchPasswords });
  }

  /**
   * ✅ Match password and confirm password
   */
  private matchPasswords(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  /**
   * Submit the registration form
   */
  onSubmit() {
    if (this.registerForm.valid) {
      const { confirmPassword, ...formData } = this.registerForm.getRawValue(); 
      this.registerAdmin.emit(formData);
      this.registerForm.reset(); // ✅ Clear form after success
    } else {
      this.message = '❌ Please fill in all required fields.';
    }
  }

  /**
   * ✅ Mobile error message
   */
  getMobileErrorMessage(): string {
    const mobileControl = this.registerForm.get('mobile');
  
    if (mobileControl.hasError('required')) {
      return '❌ Mobile number is required.';
    }
    if (mobileControl.hasError('invalidMobile')) {
      return '❌ Invalid mobile number. Must start with Israeli provider and be 10 digits.';
    }
    return '';
  } 

  /**
   * ✅ Password error message
   */
  getPasswordErrorMessage(): string {
    const passwordControl = this.registerForm.get('password');
    if (passwordControl.hasError('required')) {
      return '❌ Password is required.';
    }
    if (passwordControl.hasError('minlength')) {
      return '❌ Password must be at least 6 characters.';
    }
    if (this.registerForm.hasError('passwordsMismatch')) {
      return '❌ Password and Confirm Password must match.';
    }
    return '';
  }

  /**
   * ✅ Email error message
   */
  getEmailErrorMessage(): string {
    const emailControl = this.registerForm.get('email');
    if (emailControl.hasError('required')) {
      return '❌ Email is required.';
    }
    if (emailControl.hasError('email')) {
      return '❌ Please enter a valid email address.';
    }
    return '';
  }
}
