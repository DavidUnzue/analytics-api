import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

// check if request send right api token (hard coded in .env file)
const isAuthorized = req => {
  const apiToken = req.get('Api-Token'); // get custom 'Api-Token' header from request Headers
  const { API_HOST, API_TOKEN } = process.env;
  // request will only be authorized if apiToken and hostname are the same as defined in .env file
  if (
    apiToken &&
    apiToken.length > 0 &&
    apiToken === API_TOKEN &&
    req.hostname === API_HOST
  ) {
    return true;
  }
  return false;
};

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return isAuthorized(request);
  }
}
