import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  users: User[];

  constructor(private router: Router, private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getAllUsers(1, 50).subscribe((data) => {
      this.users = data;
    });
  }

  promptConfirmationDelete(user: User): void {
    const confirmed = confirm(
      `Are you sure you would like to delete user with username ${user.username}`
    );
    if (confirmed) {
      this.deleteUserById(user.id);
    }
  }

  deleteUserById(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== id);
    });
  }

  editUser(id: number): void {
    this.router.navigate([`edit-user/${id}`]);
  }

  addUser(): void {
    this.router.navigate([`add-user`]);
  }
}
