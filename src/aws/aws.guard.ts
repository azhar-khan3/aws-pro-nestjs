import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiAndSecretKeyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const { apikey, secretkey } = request.headers;
        if (secretkey == process.env.secretKey && apikey == process.env.apiKey) {
            return apikey && secretkey;
        } else {
            throw new UnauthorizedException();
        }
    }
}