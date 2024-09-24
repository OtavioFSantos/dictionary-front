import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  signIn(email: string, password: string): Observable<any> {
    const apiUrl: string = "http://localhost/auth/signin.php";

    const body = `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    return this.http.post<any>(apiUrl, body, { headers });
  }

  saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}
