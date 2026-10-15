import ProductsFallback from "@/app/(public)/products/ProductsFallback";
import ProductCard from "@/components/store/ProductCard";
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
      <div className="content-wrapper">
        {products.length == 0 ? (
          <ProductsFallback />
        ) : (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
              <span className="text-muted-foreground mt-4">
                {pagination.totalCount} products available
              </span>
            </div>
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
