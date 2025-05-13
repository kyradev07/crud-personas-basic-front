import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../model/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

  private userService: UserService = inject(UserService);

  private readonly fb: FormBuilder = inject(FormBuilder);

  userForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    age: [1, [Validators.required, Validators.min(1)]],
  });

  onSubmit() {
    const user: User = {
      name: this.userForm.controls.name.value,
      lastname: this.userForm.controls.lastname.value,
      age: this.userForm.controls.age.value,
    };

    this.userService.addUser(user).subscribe({
      next: (user: User) => {
        Swal.fire({
          title: "Add!",
          text: `User ${user.name} added successfully.`,
          icon: "success"
        });
        this.userForm.reset();
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! " + err ,
        });
      }
    })
  }

}
