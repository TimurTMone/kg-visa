export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      applications: {
        Row: {
          id: string;
          user_id: string;
          ref_id: string;
          status: string;
          first_name: string;
          last_name: string;
          date_of_birth: string;
          gender: string;
          nationality: string;
          email: string;
          phone: string;
          passport_number: string;
          passport_issue_date: string;
          passport_expiry_date: string;
          passport_issuing_country: string;
          entry_date: string;
          exit_date: string;
          purpose: string;
          accommodation: string;
          visa_type: string;
          photo_url: string | null;
          passport_scan_url: string | null;
          invitation_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          ref_id?: string;
          status?: string;
          first_name: string;
          last_name: string;
          date_of_birth: string;
          gender: string;
          nationality: string;
          email: string;
          phone: string;
          passport_number: string;
          passport_issue_date: string;
          passport_expiry_date: string;
          passport_issuing_country: string;
          entry_date: string;
          exit_date: string;
          purpose: string;
          accommodation: string;
          visa_type: string;
          photo_url?: string | null;
          passport_scan_url?: string | null;
          invitation_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["applications"]["Insert"]>;
      };
      transfers: {
        Row: {
          id: string;
          user_id: string;
          tracking_id: string;
          visa_number: string;
          old_passport: string;
          new_passport: string;
          new_passport_expiry: string;
          email: string;
          reason: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          tracking_id?: string;
          visa_number: string;
          old_passport: string;
          new_passport: string;
          new_passport_expiry: string;
          email: string;
          reason: string;
          status?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["transfers"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
