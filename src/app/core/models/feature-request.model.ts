import { FeatureRequestTranslation } from "./feature-request-translation.model";

export interface FeatureRequest {
  id?: number;
  description: string;
  rating: number;
  developed: boolean;
  approved: boolean;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  translations: { [key: string]: FeatureRequestTranslation };
}
