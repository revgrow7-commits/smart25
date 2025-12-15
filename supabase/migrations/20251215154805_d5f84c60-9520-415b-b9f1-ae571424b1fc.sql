-- Create policy for public upload to product-images bucket
CREATE POLICY "Anyone can upload to product-images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'product-images');

-- Create policy for public update to product-images bucket
CREATE POLICY "Anyone can update product-images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'product-images');

-- Create policy for public delete from product-images bucket
CREATE POLICY "Anyone can delete from product-images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'product-images');