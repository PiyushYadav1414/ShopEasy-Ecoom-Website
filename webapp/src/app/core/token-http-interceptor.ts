// HttpInterceptor is an Angular feature that allows you to modify HTTP requests or responses before they 
// are sent or received. TokenHttpInterceptor is a custom class that implements HttpInterceptor. You create
// this class to add functionality to HTTP requests, such as attaching an authentication token.
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// req: HttpRequest<any>req is the HTTP request object. It contains all the details about the request, such
// as: The URL being called ,The headers sent, The body of the request (if applicable).In the interceptor, 
// req is used to read or modify the original request.


// 3. What is next: HttpHandler?
// next is a handler that passes the modified or original request to the next part of Angular's HTTP processing 
// pipeline.If you don’t call next.handle(req), the request will stop and won’t reach the server.
// Example: If the interceptor adds a token to the request, calling next.handle(req) ensures the modified request is sent to the server.

// What is an Observable?
// Think of an Observable as a data stream that delivers events or data over time.In Angular, it’s a way
// to handle things like HTTP requests, where the result (response) may not come immediately.

// What is HttpEvent<any>?
// An HttpEvent represents something happening during an HTTP request, like: Sending the request,Getting 
// progress updates (e.g., for file uploads/downloads),Receiving the final response,Errors or failures.
// The <any> part just means the data in the response can be of any type.

// Why Observable<HttpEvent<any>>?
// When you make an HTTP request in Angular, you don’t get the result immediately (e.g., because the server
// may take some time to respond).Instead, Angular wraps the response in an Observable, so you can handle it when it arrives.

// Example of Observable<HttpEvent<any>>
// Let’s say your app makes a GET request to fetch user data from a server:
// (i). Without Observable:
// If the request is slow, your app would stop working until the server responds.
// (ii). With Observable:
// Angular keeps working and waits for the response.
// When the data arrives, the Observable notifies your app, and you can handle it.

// Why Observable?: Angular uses it to handle asynchronous responses without blocking the app.

@Injectable()
export class TokenHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); // Get token from localStorage

    if (token) {
      // Clone the request and add the token to the header
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: token // Add token to the header
        },
      });
    // Clone the request and add the token to the header
      return next.handle(clonedRequest);
    }

    // If no token, just pass the original request
    return next.handle(req);
  }
}

// *******IMPORTANT *******IMPORTANT *******IMPORTANT *******IMPORTANT *******IMPORTANT *******IMPORTANT
// **Imagine you're a user trying to access a restricted page on a website (e.g., your profile page). The website requires that you prove you're authorized by sending a token (which you received when you logged in).**

// ### How It Works in Simple Steps:

// 1. **Login**: 
//    - When you log in, the server gives you a token, like a "key" to access the protected parts of the website.

// 2. **Storing Token**: 
//    - Your browser stores this token in `localStorage`, so it can be used for future requests.

// 3. **Access Protected Page**: 
//    - When you try to access your profile page, the website sends a request to the server to fetch your profile data.

// 4. **Interceptor Adds Token**: 
//    - Before the request is sent, the interceptor checks if the token exists in `localStorage`. 
//    - If it does, the interceptor adds it to the request headers using `Authorization: Bearer <token>`.

// 5. **Request Sent to Server**: 
//    - The server checks if the token is valid. 
//    - If valid, it sends back your profile data. If the token is invalid or missing, the server denies access.

