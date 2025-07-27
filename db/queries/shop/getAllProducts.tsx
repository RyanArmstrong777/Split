import { ShopProduct } from "@/constants/types";

export async function getAllProducts(db: any): Promise<ShopProduct[]> {
    const rows = await db.getAllAsync(`SELECT * FROM shop_products`);
    return rows as ShopProduct[];
}