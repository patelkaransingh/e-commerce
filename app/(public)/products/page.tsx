import { getProducts } from "@/lib/getProducts";

type TProps = {
  searchParams: Promise<Record<string, string | undefined>>;
};
async function ProductsPage({ searchParams }: TProps) {
  const params = await searchParams;
  const { products, pagination, filters } = await getProducts(params);

  console.log(products);
  return (
    <div>
      <div className="content-wrapper"></div>
    </div>
  );
}

export default ProductsPage;
