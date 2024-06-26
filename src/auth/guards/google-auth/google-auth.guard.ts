import { Observable } from 'rxjs';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
@Injectable()
export class GoogleAuthGuard implements CanActivate {
  private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: '619580621696-evh90so3evttspdgna3go72qittoa8tn.apps.googleusercontent.com',
      });
      const payload = ticket.getPayload();
      request.user = payload; // Attach user info to request
      return true;
    } catch (error) {
      console.error('Error verifying token:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
