-- Add foreign key constraints for conversations table
ALTER TABLE public.conversations
ADD CONSTRAINT conversations_creator_id_fkey 
FOREIGN KEY (creator_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.conversations
ADD CONSTRAINT conversations_brand_id_fkey 
FOREIGN KEY (brand_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Add foreign key constraint for messages sender
ALTER TABLE public.messages
ADD CONSTRAINT messages_sender_id_fkey 
FOREIGN KEY (sender_id) REFERENCES public.profiles(id) ON DELETE CASCADE;