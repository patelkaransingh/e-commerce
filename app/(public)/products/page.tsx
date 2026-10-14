import { getProducts } from "@/lib/getProducts";

type TProps = {
  searchParams: Promise<Record<string, string | undefined>>;
};
async function ProductsPage({ searchParams }: TProps) {
  const params = await searchParams;
  const { products, pagination, filters } = await getProducts(params);

  return <div className="min-h-screen bg-gray-900">ProductsPage</div>;
}

export default ProductsPage;
