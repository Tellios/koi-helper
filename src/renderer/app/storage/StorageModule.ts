import { Module } from "../ioc";
import { ConnectionService, TransactionService } from "./orm";
import { PondService } from "./PondService";

@Module({
  services: [
    ConnectionService,
    TransactionService,
    PondService
  ]
})
export class StorageModule {}
