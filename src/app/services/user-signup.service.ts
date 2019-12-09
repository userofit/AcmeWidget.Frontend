import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Signup } from '../Models/Signup';

@Injectable()
export class UserSignupService {
  baseApiUrl = environment.apiEndpointBaseUrl;
  constructor(private http: HttpClient, private router: Router) { 
  }

  public createSignup(endpoint: string, signup: Signup): void {
    this.http.post(this.baseApiUrl + endpoint, signup).subscribe(
        response => {
          this.router.navigate(['UserList']);
        },
        error => {
          console.log(error);
          //navigate to the same page to show fake users if error
          this.router.navigate(['UserList']);
        }
    );
  }

  public getSignedupUsers(endpoint: string): Observable<object> {
    return this.http.get(this.baseApiUrl + endpoint);
  }
}
