/* tslint:disable */
export interface ApiException {
  statusCode?: number;
  message?: string;
  status?: string;
  error?: string;
  errors?: {};
  timestamp?: string;
  path?: string;
}
