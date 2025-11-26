-- Create table for favorite prompts
CREATE TABLE public.favorite_prompts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  prompt TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.favorite_prompts ENABLE ROW LEVEL SECURITY;

-- Users can view their own favorite prompts
CREATE POLICY "Users can view their own favorite prompts"
ON public.favorite_prompts
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own favorite prompts
CREATE POLICY "Users can insert their own favorite prompts"
ON public.favorite_prompts
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own favorite prompts
CREATE POLICY "Users can update their own favorite prompts"
ON public.favorite_prompts
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own favorite prompts
CREATE POLICY "Users can delete their own favorite prompts"
ON public.favorite_prompts
FOR DELETE
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_favorite_prompts_updated_at
BEFORE UPDATE ON public.favorite_prompts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();