import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });
  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="px-5">
          <picture>
            {/* Fonte para telas médias (md) ou maiores (min-width: 768px).
              O navegador usará esta imagem se a condição for verdadeira.
            */}
            <source media="(min-width: 768px)" srcSet="/md-banner-01.png" />
            
            {/* A imagem padrão (para telas pequenas) e fallback.
              As props do componente Image são aplicadas a qualquer fonte que o navegador escolher.
            */}
            <Image
              src="/banner-01.png" // Imagem para mobile e fallback
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto w-full"
            />
          </picture>
        </div>

        <ProductList products={products} title="Mais vendidos" />

        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5">
          <Image
            src="/banner-02.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <ProductList products={newlyCreatedProducts} title="Novos produtos" />
        <Footer />
      </div>
    </>
  );
};

export default Home;
