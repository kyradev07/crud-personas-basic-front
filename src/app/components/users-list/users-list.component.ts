import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {

  users: User[] = [];

  constructor(private readonly userService: UserService, private readonly router: Router) {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userService.findAll().subscribe({
      next: (users: User[]) => this.users = users,
      error: (err) => Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.error.message,
      })
    });
  }

  deleteUser(id: number | undefined) {
    Swal.fire({
      title: "¿Está seguro de eliminar este usuario?",
      text: "¡No puedes revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(id).subscribe({
          next: () => {
            Swal.fire({
              title: "¡Eliminado!",
              text: `Usuario con ID ${id} ha sido eliminado exitosamente.`,
              icon: "success"
            });
            this.loadUsers();
          },
          error: (err) => Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.error.message,
          })
        });
      }
    });
  }

  editUser(id: number | undefined) {
    this.router.navigate(['edit-user', id]).then();
  }
}
