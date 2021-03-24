import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Character } from '../interfaces/character';
import { KillStat } from '../interfaces/killstat';
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

  getCharacter(playerId: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/api/player/${playerId}/character-stats`);
  }

  //Get a list of killstat of the player.
  getKillStat(playerId: number): Observable<KillStat[]> {
    return this.http.get<KillStat[]>(`${this.baseUrl}/api/player/${playerId}/kill-stat`);
  }

  getLeaderboard(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/api/player/leaderboard`);
  }

  updateExp(characterId: number, exp: number): Observable<Character> {
    return this.http.put<Character>(`${this.baseUrl}/api/character/update-exp/${characterId}/${exp}`, 'hi');
  }
}
