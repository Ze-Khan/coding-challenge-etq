import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      username: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      skillsets: new FormControl(''),
      hobbies: new FormControl(''),
    });
  }

  onSubmit(): void {
    for (const key of Object.keys(this.addForm.value)) {
      const element = this.addForm.value[key];
      if (key === 'skillsets' || key === 'hobbies') {
        this.addForm.value[key] = element.length ? element.split(',') : [];
      }
    }

    this.userService.createUser(this.addForm.value).subscribe(
      () => {
        this.router.navigate(['users']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['users']);
      }
    );
  }
}
