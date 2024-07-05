import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private subject = new Subject<any>();
  private keepAfterRouteChange = false;

 constructor(private router: Router ,private userService: ApiService) { }
 intercept(req: { clone: (arg0: { setHeaders: { Authorization: string; }; }) => any; }, next: { handle: (arg0: any) => any; }) {
  let tokenizeReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${this.userService.getToken()}`
    }
  });
  return next.handle(tokenizeReq);
}
}
