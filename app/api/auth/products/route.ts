import { connectDB } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = request.nextUrl;

    const category = searchParams.get("category") || "";
    const search = searchParams.get("search") || "";
    const brand = searchParams.get("brand") || "";
    const featured = searchParams.get("featured") || "";
    const minPrice = searchParams.get("minPrice") || 0;
    const maxPrice = searchParams.get("maxPrice") || 0;
    const rating = searchParams.get("rating") || 0;

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);
    const sort = searchParams.get("sort") || "createdAt";

    const filter: Record<string, any> = {
      isActive: true,
    };

    if (category) {
      filter.category = category;
    }

    if (brand) {
      filter.brand = brand.toLowerCase();
    }

    if (featured) {
      filter.isFeatured = true;
    }

    if (Number(minPrice) > 0 || Number(maxPrice) > 0) {
      filter.price = {};
      if (Number(minPrice) > 0) {
        filter.price.$gte = Number(minPrice);
      }
      if (Number(maxPrice) > 0) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    if (Number(rating) > 0) {
      filter["ratings.average"] = { $gte: Number(rating) };
    }

    if (search) {
      filter.$text = {
        $search: search,
      };
    }
  } catch (error) {}
}
