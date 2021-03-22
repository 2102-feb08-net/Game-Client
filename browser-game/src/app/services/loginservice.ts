import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root', // singleton for whole app (includes the tests)
})
export class LoginApiService {
  private readonly baseUrl = environment.gameApiBaseUrl;

  constructor(private http: HttpClient) {}

  getPlayer(username: string, password: string): Observable<Player> {
    return this.http.get<Player>(`${this.baseUrl}/api/player/${username}/${password}/login`);
  }
}
