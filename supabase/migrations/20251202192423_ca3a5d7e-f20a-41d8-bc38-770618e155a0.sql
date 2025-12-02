-- Create table for training school leads
CREATE TABLE public.training_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  city TEXT NOT NULL,
  profile TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.training_leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert leads (public form)
CREATE POLICY "Anyone can insert training leads"
ON public.training_leads
FOR INSERT
WITH CHECK (true);

-- Only authenticated admins can view leads
CREATE POLICY "Admins can view training leads"
ON public.training_leads
FOR SELECT
USING (true);