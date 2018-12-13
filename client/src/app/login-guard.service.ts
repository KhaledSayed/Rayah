import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class LoginGuardService implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["dashboard", "default"]);
      return false;
    }
    return true;
  }
}
