// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rjmroqsqqtucrextphwh.supabase.co'; // Replace with your actual Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqbXJvcXNxcXR1Y3JleHRwaHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzODM5MzUsImV4cCI6MjA0NTk1OTkzNX0.w_aj56x-VSLHhOIBov25slS2kZksLQPjRNkE9DinCAc'; // Replace with your actual Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);