import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  canActivate(): boolean {
    console.log("User Type", this.authService.getType());
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(["auth"]);
      return false;
    }
    return true;
  }
}
