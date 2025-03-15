import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAdmin } from '../../models/admin/admin.interface';

@Component({
  selector: 'app-admin-register',
  standalone: false,
  templateUrl: './admin-register.component.html',
  styleUrl: './admin-register.component.scss'
})
export class AdminRegisterComponent implements OnInit {
  @Output() registerAdmin = new EventEmitter<IAdmin>();
  registerForm: FormGroup;
  message: string | null = null; // ✅ Display messages
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
      this.initializeForm();
  }

  private initializeForm() {
    this.registerForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      isSuperAdmin: [false],
    });
  }

  /**
   * Submit the registration form
   */
  onSubmit() {
    if (this.registerForm.valid) {
      this.registerAdmin.emit(this.registerForm.value);
      this.registerForm.reset(); // ✅ Clear form after success
      this.message = `✅ Registration successful!`;
    } else {
      this.message = '❌ Please fill in all required fields.';
    }
  }
}
