import User, { IUser } from "../models/user.model.js";

class UserRepository {
  async create(data: Partial<IUser>): Promise<IUser> {
    return await User.create(data);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email: email.trim().toLowerCase() });
  }

  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id).select("-password");
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await User.exists({ email: email.trim().toLowerCase() });
    return !!user;
  }
}

export const userRepository = new UserRepository();