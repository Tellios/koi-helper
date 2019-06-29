import { Id } from "app/storage";
import { ITreatmentComment } from "./ITreatmentComment";
import { PersistedModel } from "./IPersistedModel";

export interface ITreatmentBase {
  reference: Id;
  diseaseId: Id;
  ended: Date;
  finished: boolean;
  comments: ITreatmentComment[];
}

export type ITreatment = PersistedModel<ITreatmentBase>;
