import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(username: string, password: string): Promise<User>;
    validateUser(username: string, password: string): Promise<User | null>;
    login(username: string, password: string): Promise<{
        access_token: string;
    }>;
}
