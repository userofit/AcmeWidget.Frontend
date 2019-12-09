import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { SignupComponent } from './signup.component';
import { UserSignupService } from '../services/user-signup.service';
import { FormHelperService } from '../services/form-helper.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../Models/User';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientModule, RouterTestingModule ],
      declarations: [ SignupComponent ],
      providers: [ FormHelperService, UserSignupService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return correct async data', fakeAsync(() => {    
    const userService = fixture.debugElement.injector.get(UserSignupService);
    const mockUser = new Array<User>(); 
    mockUser.push(new User({
        UserId: -1111,
        FirstName: 'John',
        LastName: 'Smith',
        Email: 'fake@acme.com'
    }));
    spyOn(userService, 'getSignedupUsers').and.returnValue(
      Observable.create((observer: Observer<Array<User>>) => {
        observer.next(mockUser);
        return observer;
      })
    );
    let fname = '';
    userService.getSignedupUsers(null).subscribe(data=>
    {
      fname = data[0]['FirstName'];
    });
    tick();      
    expect(fname).toEqual('John');
  }));
});
