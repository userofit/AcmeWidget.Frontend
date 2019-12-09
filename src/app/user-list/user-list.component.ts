import { Component, OnInit } from '@angular/core';
import { UserSignupService } from 'src/app/services/user-signup.service';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userList: Array<User>;
  constructor(private signupService: UserSignupService) { }

  ngOnInit() {    
    this.signupService.getSignedupUsers('Signup/GetUserList').subscribe(
      response => {
        this.userList = new Array<User>();
        Object.values(response).forEach(o => {
          this.userList.push(new User({
            UserId: o['userId'],
            FirstName: o['firstName'],
            LastName: o['lastName'],
            Email: o['email']
          }));
        });
      },
      error => {
        console.log(error);
        this.userList = new Array<User>();
        this.userList.push(new User({
          UserId: -1111,
          FirstName: 'Fake',
          LastName: 'Name',
          Email: 'fake@acme.com'
        }));
        this.userList.push(new User({
          UserId: -222,
          FirstName: 'Fake',
          LastName: 'Name2',
          Email: 'fake2@acme.com'
        }))
      }
    );
  }

}
