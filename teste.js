import { User } from "./src/domain/models/user.js";
import { UserRepository } from "./src/domain/repositories/userRepository.js";


let pessoa = new User('1', 'ricardo', '123456')
let repo = new UserRepository()

await repo.save(pessoa)
