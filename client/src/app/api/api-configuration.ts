/* tslint:disable */
import { Injectable } from "@angular/core";

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: "root"
})
export class ApiConfiguration {
  rootUrl: string = "http://142.93.207.35:8080/api";
}
