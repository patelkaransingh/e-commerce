import ProductsFallback from "@/app/(public)/products/ProductsFallback";
import FilterSidebar from "@/components/store/FilterSidebar";
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
      <div className="gradient-grid-bg min-h-screen w-full">
        <div className="content-wrapper">
          {/* page title an desc  
                  below div css depend on element <aside> parent <div> 
                  basically marging here is width(<aside>) + gap(<div>)
              */}
          <div className="mb-8 md:ml-53 lg:ml-68">
            <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
            <span className="text-muted-foreground mt-4">
              {pagination.totalCount} products available
            </span>
          </div>

          {/* filter + Products */}
          <div className="flex flex-col md:flex-row gap-4">
            <aside className="md:w-49 lg:w-64 shrink-0">
              <FilterSidebar filters={filters} />
            </aside>

            {/* priducts */}
            {products.length == 0 ? (
              <div className="mx-auto w-full">
                <ProductsFallback />
              </div>
            ) : (
              <div>
                <div className="product-grid">
                  {products.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
