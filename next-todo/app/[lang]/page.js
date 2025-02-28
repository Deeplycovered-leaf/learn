import { getLocale } from "@/utils/getLocale"

export default async function Page({ params }) {
  const { lang } = await params
  const dict = await getLocale(lang) // en
  return <button>{dict.products.cart}</button> // Add to Cart
}
