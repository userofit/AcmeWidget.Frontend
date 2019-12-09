import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserListComponent } from './user-list.component';
import { UserSignupService } from 'src/app/services/user-signup.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/Models/User';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterTestingModule ],
      declarations: [ UserListComponent ],
      providers: [ UserSignupService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display interested users names', () => {    
    component.userList = new Array<User>();
    component.userList.push(new User({
      UserId: -1111,
      FirstName: 'John',
      LastName: 'Smith',
      Email: 'fake@acme.com'
    }));
    fixture.detectChanges();
    const userAsyncElement = fixture.debugElement.nativeElement;
    const userName = userAsyncElement.querySelector('p');
    expect(userName.textContent).toBe(' John Smith, fake@acme.com ');
  });
});
