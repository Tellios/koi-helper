import { PersistedModel } from "./IPersistedModel";

export interface ITreatmentCommentBase {
  comment: string;
  category: string;
}

export type ITreatmentComment = PersistedModel<ITreatmentCommentBase>;
