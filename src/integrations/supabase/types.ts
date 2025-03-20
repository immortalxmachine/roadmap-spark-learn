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
      gamification: {
        Row: {
          badges: Json | null
          created_at: string | null
          id: string
          last_activity: string | null
          level: number | null
          longest_streak: number | null
          points: number | null
          streaks: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          badges?: Json | null
          created_at?: string | null
          id: string
          last_activity?: string | null
          level?: number | null
          longest_streak?: number | null
          points?: number | null
          streaks?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          badges?: Json | null
          created_at?: string | null
          id?: string
          last_activity?: string | null
          level?: number | null
          longest_streak?: number | null
          points?: number | null
          streaks?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      mock_tests: {
        Row: {
          created_at: string | null
          description: string | null
          difficulty: string | null
          id: string
          question_count: number | null
          subject: string | null
          time_limit_minutes: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          id: string
          question_count?: number | null
          subject?: string | null
          time_limit_minutes?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          id?: string
          question_count?: number | null
          subject?: string | null
          time_limit_minutes?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          username?: string
        }
        Relationships: []
      }
      sessions: {
        Row: {
          communication_mode: string | null
          created_at: string | null
          date: string | null
          feedback: string | null
          id: string
          notes: string | null
          student_name: string | null
          subject: string | null
          topic: string | null
          tutor_id: string | null
          updated_at: string | null
        }
        Insert: {
          communication_mode?: string | null
          created_at?: string | null
          date?: string | null
          feedback?: string | null
          id: string
          notes?: string | null
          student_name?: string | null
          subject?: string | null
          topic?: string | null
          tutor_id?: string | null
          updated_at?: string | null
        }
        Update: {
          communication_mode?: string | null
          created_at?: string | null
          date?: string | null
          feedback?: string | null
          id?: string
          notes?: string | null
          student_name?: string | null
          subject?: string | null
          topic?: string | null
          tutor_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      study_materials: {
        Row: {
          description: string | null
          difficulty: string | null
          id: string
          thumbnail_url: string | null
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          description?: string | null
          difficulty?: string | null
          id: string
          thumbnail_url?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          description?: string | null
          difficulty?: string | null
          id?: string
          thumbnail_url?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      study_roadmaps: {
        Row: {
          description: string | null
          difficulty: string | null
          estimated_duration: string | null
          id: string
          steps: Json | null
          topic: string | null
          updated_at: string | null
        }
        Insert: {
          description?: string | null
          difficulty?: string | null
          estimated_duration?: string | null
          id: string
          steps?: Json | null
          topic?: string | null
          updated_at?: string | null
        }
        Update: {
          description?: string | null
          difficulty?: string | null
          estimated_duration?: string | null
          id?: string
          steps?: Json | null
          topic?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      test_questions: {
        Row: {
          correct_answer: string
          created_at: string | null
          explanation: string | null
          id: string
          question: string
          subject: string | null
          test_id: string | null
          updated_at: string | null
        }
        Insert: {
          correct_answer: string
          created_at?: string | null
          explanation?: string | null
          id: string
          question: string
          subject?: string | null
          test_id?: string | null
          updated_at?: string | null
        }
        Update: {
          correct_answer?: string
          created_at?: string | null
          explanation?: string | null
          id?: string
          question?: string
          subject?: string | null
          test_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      test_results: {
        Row: {
          correct_answers: number | null
          date: string | null
          id: string
          incorrect_answers: number | null
          score: number | null
          strengths: string | null
          test_id: string | null
          time_taken_seconds: number | null
          total_questions: number | null
          user_id: string | null
          weaknesses: string | null
        }
        Insert: {
          correct_answers?: number | null
          date?: string | null
          id: string
          incorrect_answers?: number | null
          score?: number | null
          strengths?: string | null
          test_id?: string | null
          time_taken_seconds?: number | null
          total_questions?: number | null
          user_id?: string | null
          weaknesses?: string | null
        }
        Update: {
          correct_answers?: number | null
          date?: string | null
          id?: string
          incorrect_answers?: number | null
          score?: number | null
          strengths?: string | null
          test_id?: string | null
          time_taken_seconds?: number | null
          total_questions?: number | null
          user_id?: string | null
          weaknesses?: string | null
        }
        Relationships: []
      }
      tutor_sessions: {
        Row: {
          created_at: string | null
          duration: string
          feedback: string | null
          id: string
          mode: string
          start_time: string
          status: string
          subject: string
          tutor_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          duration: string
          feedback?: string | null
          id: string
          mode: string
          start_time: string
          status: string
          subject: string
          tutor_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          duration?: string
          feedback?: string | null
          id?: string
          mode?: string
          start_time?: string
          status?: string
          subject?: string
          tutor_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tutor_sessions_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors"
            referencedColumns: ["id"]
          },
        ]
      }
      tutors: {
        Row: {
          active_session: boolean | null
          avatar: string | null
          badges: Json | null
          communication_modes: Json | null
          created_at: string | null
          expertise: string | null
          id: string
          name: string
          rating: number | null
          specialty: string | null
          updated_at: string | null
        }
        Insert: {
          active_session?: boolean | null
          avatar?: string | null
          badges?: Json | null
          communication_modes?: Json | null
          created_at?: string | null
          expertise?: string | null
          id: string
          name: string
          rating?: number | null
          specialty?: string | null
          updated_at?: string | null
        }
        Update: {
          active_session?: boolean | null
          avatar?: string | null
          badges?: Json | null
          communication_modes?: Json | null
          created_at?: string | null
          expertise?: string | null
          id?: string
          name?: string
          rating?: number | null
          specialty?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roadmap_progress: {
        Row: {
          completed_steps: Json | null
          created_at: string | null
          current_step: number | null
          id: string
          last_updated_at: string | null
          roadmap_id: string | null
          user_id: string | null
        }
        Insert: {
          completed_steps?: Json | null
          created_at?: string | null
          current_step?: number | null
          id: string
          last_updated_at?: string | null
          roadmap_id?: string | null
          user_id?: string | null
        }
        Update: {
          completed_steps?: Json | null
          created_at?: string | null
          current_step?: number | null
          id?: string
          last_updated_at?: string | null
          roadmap_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          created_at: string | null
          font_size: string | null
          high_contrast: boolean | null
          id: string
          notification_preferences: Json | null
          text_to_speech: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          font_size?: string | null
          high_contrast?: boolean | null
          id: string
          notification_preferences?: Json | null
          text_to_speech?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          font_size?: string | null
          high_contrast?: boolean | null
          id?: string
          notification_preferences?: Json | null
          text_to_speech?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
