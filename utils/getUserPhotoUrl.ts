import { supabase } from "../lib/supabase/supabase";

export default function (uri?: string) {
  const defaultUri = `https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081`;

  if (!uri) return defaultUri;

  return supabase.storage.from('users-photos').getPublicUrl(uri).data.publicUrl || defaultUri;
}