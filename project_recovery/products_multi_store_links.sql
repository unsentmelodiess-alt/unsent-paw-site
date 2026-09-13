-- Add optional marketplace links to one product record.
-- Safe to run once; IF NOT EXISTS keeps it repeatable.
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS etsy_url text,
  ADD COLUMN IF NOT EXISTS gumroad_url text;

COMMENT ON COLUMN public.products.etsy_url IS 'Direct Etsy listing URL for this product.';
COMMENT ON COLUMN public.products.gumroad_url IS 'Direct Gumroad product URL for this product.';
