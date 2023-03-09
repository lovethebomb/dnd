export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      player_dates: {
        Row: {
          availability: Json | null
          created_at: string | null
          id: number
          player: string | null
          updated_at: string | null
        }
        Insert: {
          availability?: Json | null
          created_at?: string | null
          id?: number
          player?: string | null
          updated_at?: string | null
        }
        Update: {
          availability?: Json | null
          created_at?: string | null
          id?: number
          player?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
