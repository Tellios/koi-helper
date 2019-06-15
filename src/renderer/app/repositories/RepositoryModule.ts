import { Module } from "../ioc/Module";
import { PondRepository } from "./PondRepository";

@Module({
  services: [PondRepository]
})
export class RepositoryModule {}
