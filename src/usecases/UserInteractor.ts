import axios from 'axios';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import { UserUseCase } from '../usecases/UserUsecase';

export class UserInteractor implements UserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async findOrCreateByGithubId(
    githubId: number,
    githubUsername: string,
    codeforcesUsername?: string
  ): Promise<User> {
    let user = await this.userRepository.findByGithubId(githubId);

    if (!user) {
      user = new User(githubId, githubUsername, codeforcesUsername);
      user = await this.userRepository.create(user);
    }

    return user;
  }

  async findByGithubId(githubId: number): Promise<User | undefined> {
    const user = await this.userRepository.findByGithubId(githubId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateCodeforcesUsername(
    githubId: number,
    codeforcesUsername?: string
  ): Promise<User> {
    const user = await this.userRepository.findByGithubId(githubId);

    if (!user) {
      throw new Error('User not found');
    }

    user.codeforcesUsername = codeforcesUsername;
    return await this.userRepository.update(user);
  }

  async exchangeCodeForAccessToken(code: string): Promise<string> {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    return response.data.access_token;
  }

  createJWT(githubId: number, githubUsername: string): string {
    const token = jwt.sign(
      {
        githubId: githubId,
        githubUsername: githubUsername,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '30d',
      }
    );
    return token;
  }

  async getGithubUser(accessToken: string): Promise<{
    id: number;
    login: string;
  }> {
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    await this.findOrCreateByGithubId(response.data.id, response.data.login);

    return {
      id: response.data.id,
      login: response.data.login,
    };
  }
}
