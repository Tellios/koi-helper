import { Module } from "../ioc";
import { QueryService } from "./QueryService";
import { SqliteDatabaseService } from "./SqliteDatabaseService";

@Module({
  services: [QueryService, SqliteDatabaseService]
})
export class StorageModule {}
