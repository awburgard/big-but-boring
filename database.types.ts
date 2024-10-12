export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      historical_maxes: {
        Row: {
          created_at: string | null
          estimated_1rm: number
          id: string
          lift_name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          estimated_1rm: number
          id?: string
          lift_name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          estimated_1rm?: number
          id?: string
          lift_name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "historical_maxes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      lifts: {
        Row: {
          created_at: string | null
          id: string
          lift_name: string
          program_id: string | null
          training_max: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          lift_name: string
          program_id?: string | null
          training_max: number
        }
        Update: {
          created_at?: string | null
          id?: string
          lift_name?: string
          program_id?: string | null
          training_max?: number
        }
        Relationships: [
          {
            foreignKeyName: "lifts_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "active_program_status_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lifts_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lifts_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "user_programs_view"
            referencedColumns: ["id"]
          },
        ]
      }
      program_completion_log: {
        Row: {
          completed_at: string | null
          id: string
          program_id: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          id?: string
          program_id?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          id?: string
          program_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "program_completion_log_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "active_program_status_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_completion_log_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_completion_log_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "user_programs_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_completion_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          current_week: number | null
          id: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          current_week?: number | null
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          current_week?: number | null
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "programs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      workouts: {
        Row: {
          completed: boolean | null
          created_at: string | null
          day: number
          id: string
          lift_id: string | null
          notes: string | null
          percentage: number
          program_id: string | null
          reps: number
          set_number: number
          user_id: string | null
          week: number
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          day: number
          id?: string
          lift_id?: string | null
          notes?: string | null
          percentage: number
          program_id?: string | null
          reps: number
          set_number: number
          user_id?: string | null
          week: number
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          day?: number
          id?: string
          lift_id?: string | null
          notes?: string | null
          percentage?: number
          program_id?: string | null
          reps?: number
          set_number?: number
          user_id?: string | null
          week?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workouts_lift_id_fkey"
            columns: ["lift_id"]
            isOneToOne: false
            referencedRelation: "lifts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workouts_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "active_program_status_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workouts_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workouts_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "user_programs_view"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      active_program_status_view: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string | null
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string | null
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string | null
          status?: string | null
        }
        Relationships: []
      }
      historical_maxes_trend_view: {
        Row: {
          created_at: string | null
          estimated_1rm: number | null
          lift_name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          estimated_1rm?: number | null
          lift_name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          estimated_1rm?: number | null
          lift_name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "historical_maxes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_programs_view: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string | null
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string | null
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string | null
          status?: string | null
        }
        Relationships: []
      }
      weekly_workout_summary: {
        Row: {
          completed: boolean | null
          day_number: number | null
          lift_name: string | null
          percentage: number | null
          program_id: string | null
          reps: number | null
          week_number: number | null
          workout_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workouts_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workouts_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "active_program_status_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workouts_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "user_programs_view"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_workouts_view: {
        Row: {
          completed: boolean | null
          created_at: string | null
          day: number | null
          id: string | null
          lift_id: string | null
          lift_name: string | null
          notes: string | null
          percentage: number | null
          program_id: string | null
          reps: number | null
          set_number: number | null
          week: number | null
        }
        Relationships: [
          {
            foreignKeyName: "workouts_lift_id_fkey"
            columns: ["lift_id"]
            isOneToOne: false
            referencedRelation: "lifts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workouts_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workouts_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "active_program_status_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workouts_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "user_programs_view"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      cancel_program: {
        Args: {
          _program_id: string
        }
        Returns: undefined
      }
      complete_program_if_all_workouts_done: {
        Args: {
          _program_id: string
        }
        Returns: undefined
      }
      create_new_program: {
        Args: {
          _user_id: string
          _lifts: Json
        }
        Returns: string
      }
      mark_workout_complete: {
        Args: {
          _workout_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
