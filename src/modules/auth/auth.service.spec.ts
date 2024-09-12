import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/user.service';
import { Helper } from '../../shared/utils';
import { BadRequestException } from '@nestjs/common';

const mockUsersService = {
  findByEmail: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return a JWT token if credentials are valid', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        password: await Helper.hash('test123'),
      };
      mockUsersService.findByEmail.mockResolvedValue(user);

      mockJwtService.sign.mockReturnValue('mockToken');

      const result = await service.validateUser('test@example.com', 'test123');
      expect(result.token).toBeDefined();
    });

    it('should throw error if password does not match', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        password: await Helper.hash('test123'),
      };
      mockUsersService.findByEmail.mockResolvedValue(user);

      await expect(
        service.validateUser('test@example.com', 'wrongpassword'),
      ).rejects.toThrow(BadRequestException);

      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
    });
  });

  describe('validateBiometric', () => {
    it('should return a JWT token if biometric key matches', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        biometricKey: await Helper.hash('sampleKey'),
      };
      mockUsersService.findByEmail.mockResolvedValue(user);

      mockJwtService.sign.mockReturnValue('mockToken');

      const result = await service.validateBiometric(
        'test@example.com',
        'sampleKey',
      );
      // console.log(result);
      expect(result.token).toBeDefined();
    });

    it('should throw error if biometric key does not match', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        biometricKey: await Helper.hash('sampleKey'),
      };
      mockUsersService.findByEmail.mockResolvedValue(user);

      await expect(
        service.validateBiometric('test@example.com', 'wrongKey'),
      ).rejects.toThrow(BadRequestException);

      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
    });
  });
});
