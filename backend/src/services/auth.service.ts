import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { userRepository } from "../repositories/user.repository.js";

interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

interface LoginDto {
  email: string;
  password: string;
}

class AuthService {
  async register(data: RegisterDto) {
    const exists = await userRepository.existsByEmail(data.email);

    if (exists) {
      throw new ApiError(
        StatusCodes.CONFLICT,
        "User already exists"
      );
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await userRepository.create({
      ...data,
      password: hashedPassword,
    });

    const token = generateToken(user._id.toString());

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async login(data: LoginDto) {
    const user = await userRepository.findByEmail(data.email);

    if (!user) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        "Invalid credentials"
      );
    }

    const validPassword = await comparePassword(
      data.password,
      user.password
    );

    if (!validPassword) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        "Invalid credentials"
      );
    }

    const token = generateToken(user._id.toString());

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async getProfile(userId: string) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        "User not found"
      );
    }

    return user;
  }
}

export const authService = new AuthService();