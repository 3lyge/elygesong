import { createClient } from '@supabase/supabase-js'

// Verificar se as variáveis de ambiente estão definidas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Criar cliente com validação
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null as any // Fallback para quando não estiver configurado

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          phone: string
          address: string
          subscription_plan: 'monthly' | 'annual' | 'lifetime' | null
          subscription_status: 'active' | 'inactive' | 'cancelled' | null
          subscription_end_date: string | null
          stripe_customer_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name: string
          last_name: string
          phone: string
          address: string
          subscription_plan?: 'monthly' | 'annual' | 'lifetime' | null
          subscription_status?: 'active' | 'inactive' | 'cancelled' | null
          subscription_end_date?: string | null
          stripe_customer_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          phone?: string
          address?: string
          subscription_plan?: 'monthly' | 'annual' | 'lifetime' | null
          subscription_status?: 'active' | 'inactive' | 'cancelled' | null
          subscription_end_date?: string | null
          stripe_customer_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
