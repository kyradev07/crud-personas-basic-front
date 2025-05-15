import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../model/user.interface';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

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

  private readonly idUser: string;

  readonly isCreate: boolean;

  userForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    age: [1, [Validators.required, Validators.min(1)]],
  });

  constructor(private router: ActivatedRoute) {
    this.idUser = this.router.snapshot.paramMap.get('id') ?? '';
    this.isCreate = !this.idUser;

    if (!this.isCreate) {
      this.findUserById();
    }
  }


  private findUserById(): void {
    this.userService.findById(+this.idUser).pipe(
      tap(user => this.loadFormData(user)),
      catchError(err => of(err))
    ).subscribe({
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.error.message,
        });
      }
    });
  }

  private loadFormData(user: User) {
    this.userForm.get('name')?.setValue(user.name);
    this.userForm.get('lastname')?.setValue(user.lastname);
    this.userForm.get('age')?.setValue(user.age);
  }


  onSubmit() {
    const user: User = {
      name: this.userForm.controls.name.value,
      lastname: this.userForm.controls.lastname.value,
      age: this.userForm.controls.age.value,
    };

    if (this.isCreate) {
      this.userService.addUser(user).subscribe({
        next: (user: User) => {
          Swal.fire({
            title: "Add!",
            text: `Usuario ${user.name} creado exitosamente.`,
            icon: "success"
          });
        },
        error: (err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.error.message,
          });
        }
      });
    } else {
      this.userService.updateUser(+this.idUser, user).subscribe({
        next: (user: User) => {
          Swal.fire({
            title: "Add!",
            text: `Usuario con ID ${user.id} actualizado exitosamente.`,
            icon: "success"
          });
        },
        error: (err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.error.message,
          });
        }
      });
    }
    this.userForm.reset();
  }

}
