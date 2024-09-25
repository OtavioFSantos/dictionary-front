import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getWords(page: number, search: string): Observable<any> {
    const apiUrl: string = "http://localhost/dictionary-back/entries/entries.php";

    return this.http.get<any>(`${apiUrl}?page=${page}&search=${search}`);
  }

  getHistory(page: number): Observable<any> {
    const apiUrl: string = "http://localhost/dictionary-back/user/history.php";
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${apiUrl}?page=${page}`, { headers });
  }

  getFavorites(page: number): Observable<any> {
    const apiUrl: string = "http://localhost/dictionary-back/user/favorites.php";
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${apiUrl}?page=${page}`, { headers });
  }

  getWordInfo(word: string): Observable<any> {
    const apiUrl: string = "http://localhost/dictionary-back/entries/entry.php";
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${apiUrl}?word=${word}`, { headers });
  }

  favoriteWord(word: string): Observable<any> {
    const apiUrl: string = "http://localhost/dictionary-back/entries/favorite.php";
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${apiUrl}?word=${word}`, { headers });
  }

  unfavoriteWord(word: string): Observable<any> {
    const apiUrl: string = "http://localhost/dictionary-back/entries/unfavorite.php";
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete<any>(`${apiUrl}?word=${word}`, { headers });
  }
}
