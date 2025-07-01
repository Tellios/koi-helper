import { Module } from '@main-process/ioc';
import { DiseaseService } from './DiseaseService';
import { FileService } from './FileService';
import { FishService } from './FishService';
import { ImageService } from './ImageService';
import { MeasurementService } from './MeasurementService';
import { ConnectionService, TransactionService } from './orm';
import { PondService } from './PondService';
import { SettingsService } from './SettingsService';
import { TreatmentService } from './TreatmentService';
import { VarietyService } from './VarietyService';

@Module({
  name: 'storage',
  services: [
    ConnectionService,
    TransactionService,
    PondService,
    MeasurementService,
    TreatmentService,
    DiseaseService,
    VarietyService,
    FileService,
    FishService,
    ImageService,
    SettingsService,
  ],
})
export class StorageModule {}
