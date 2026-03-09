/**
 * Supabase database type definitions for Launchpad.today.
 *
 * Generated manually to match the schema in supabase/migrations/001_initial_schema.sql.
 * Regenerate with `npx supabase gen types typescript` once the project is live.
 */

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
      products: {
        Row: {
          id: string;
          name: string;
          tagline: string;
          description: string;
          url: string;
          category: string;
          submitted_by: string;
          submitted_at: string;
          logo_emoji: string;
          ai_score: number;
          ai_verdict: string;
          ai_breakdown: {
            innovation: number;
            execution: number;
            potential: number;
            timing: number;
          };
          community_votes: number;
          comment_count: number;
          is_winner: "day" | "week" | "month" | null;
        };
        Insert: {
          id?: string;
          name: string;
          tagline: string;
          description: string;
          url: string;
          category: string;
          submitted_by: string;
          submitted_at?: string;
          logo_emoji: string;
          ai_score: number;
          ai_verdict: string;
          ai_breakdown: {
            innovation: number;
            execution: number;
            potential: number;
            timing: number;
          };
          community_votes?: number;
          comment_count?: number;
          is_winner?: "day" | "week" | "month" | null;
        };
        Update: {
          id?: string;
          name?: string;
          tagline?: string;
          description?: string;
          url?: string;
          category?: string;
          submitted_by?: string;
          submitted_at?: string;
          logo_emoji?: string;
          ai_score?: number;
          ai_verdict?: string;
          ai_breakdown?: {
            innovation: number;
            execution: number;
            potential: number;
            timing: number;
          };
          community_votes?: number;
          comment_count?: number;
          is_winner?: "day" | "week" | "month" | null;
        };
        Relationships: [];
      };
      votes: {
        Row: {
          id: string;
          product_id: string;
          voter_fingerprint: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          voter_fingerprint: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          voter_fingerprint?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "votes_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      comments: {
        Row: {
          id: string;
          product_id: string;
          author: string;
          text: string;
          is_maker: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          author: string;
          text: string;
          is_maker?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          author?: string;
          text?: string;
          is_maker?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comments_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      emails: {
        Row: {
          id: string;
          email: string;
          subscribed_at: string;
          active: boolean;
        };
        Insert: {
          id?: string;
          email: string;
          subscribed_at?: string;
          active?: boolean;
        };
        Update: {
          id?: string;
          email?: string;
          subscribed_at?: string;
          active?: boolean;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
