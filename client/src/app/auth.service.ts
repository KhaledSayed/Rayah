import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private readonly jwtHelper: JwtHelperService) {}
  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  public logout() {
    localStorage.removeItem("token");
  }

  public getToken(): string {
    return localStorage.getItem("token");
  }

  public setType(type) {
    localStorage.setItem("type", type);
  }

  public getType(): string {
    return localStorage.getItem("type").toString();
  }

  public getName(): string {
    return localStorage.getItem("name").toString();
  }
}
