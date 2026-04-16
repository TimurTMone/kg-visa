export type VisaType = "tourist" | "tourist90" | "business" | "group" | "transit";

export type VisaPurpose = "tourism" | "business" | "transit" | "groupTourism";

export type Gender = "male" | "female";

export type ApplicationStatus =
  | "submitted"
  | "review"
  | "approved"
  | "issued"
  | "rejected";

export type EligibilityType = "visa-free" | "e-visa" | "embassy";

export interface VisaTypeInfo {
  id: VisaType;
  fee: number;
  maxDays: number;
  purposes: VisaPurpose[];
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  nationality: string;
  email: string;
  phone: string;
}

export interface PassportInfo {
  number: string;
  issueDate: string;
  expiryDate: string;
  issuingCountry: string;
}

export interface TravelInfo {
  entryDate: string;
  exitDate: string;
  purpose: VisaPurpose;
  accommodation: string;
  visaType: VisaType;
}

export interface DocumentsInfo {
  photo: File | null;
  passportScan: File | null;
  invitation: File | null;
}

export interface VisaApplication {
  personal: PersonalInfo;
  passport: PassportInfo;
  travel: TravelInfo;
  documents: DocumentsInfo;
}

export interface CountryEligibility {
  code: string;
  name: string;
  type: EligibilityType;
  days?: number;
}
