import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  user: User;
  editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (isNaN(id)) {
      this.router.navigate(['users']);
      return;
    }
    this.userService.getUserById(id).subscribe(
      (data) => {
        if (data) {
          this.user = data;
          console.log(data);
        } else {
          this.router.navigate(['users']);
        }
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['users']);
      }
    );
    this.editForm = this.formBuilder.group({
      username: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      skillsets: new FormControl(''),
      hobbies: new FormControl(''),
    });
  }

  onSubmit(): void {
    console.log(this.editForm.value);
    const changedValues: Partial<User> = {};
    for (const key of Object.keys(this.editForm.value)) {
      let element = this.editForm.value[key];
      if (key === 'skillsets' || key === 'hobbies') {
        element = element.length ? element.split(',') : [];
      }
      if (this.editForm.get(key).dirty) {
        changedValues[key] = element;
      }
    }
    if (Object.keys(changedValues).length) {
      this.userService.updateUser(this.user.id, changedValues).subscribe(
        () => {
          this.router.navigate(['users']);
        },
        (err) => {
          console.log(err);
          alert(err.message);
          this.router.navigate(['users']);
        }
      );
    } else {
      this.router.navigate(['users']);
    }
  }
}
