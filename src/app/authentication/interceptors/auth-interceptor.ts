import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  const token = localStorage.getItem('token');
  console.log("this is the token", token);
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  console.log("This is the request url" ,req.url);
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        console.log('401 Unauthorized - Logging out');
        localStorage.clear();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  
  );
};
