import { Component, inject } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../model/user.interface';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-user-form-edit',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-form-edit.component.html'
})
export class UserFormEditComponent {
  private userService: UserService = inject(UserService);
  private readonly fb: FormBuilder = inject(FormBuilder);

  constructor(private router: ActivatedRoute) {
    this.router.params.subscribe(params => {
      this.userService.findById(1).pipe(
        tap(user => this.loadForm(user)),
        catchError(err => of(err))
      ).subscribe({
        error: (err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.error.message,
          });
        }
      });
    });

  }

  userForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    age: [1, [Validators.required, Validators.min(1)]],
  });

  loadForm(user: User) {
    this.userForm.controls.name.setValue(user.name);
    this.userForm.controls.lastname.setValue(user.lastname);
    this.userForm.controls.age.setValue(user.age);
  }



  onSubmit() {
    /*const user: User = {
      name: this.userForm.controls.name.value,
      lastname: this.userForm.controls.lastname.value,
      age: this.userForm.controls.age.value,
    };

    this.userService.updateUser(user).subscribe({
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
          text: "Something went wrong! " + err,
        });
      }
    })*/
  }

}
