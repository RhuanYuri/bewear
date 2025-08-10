"use client";

import { House, LogInIcon, LogOutIcon, LucideProps, MenuIcon, ShoppingBag, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getCategory } from "@/actions/get-category";
import { categoryTable } from "@/db/schema";
import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Cart } from "./cart";

type OptionMenu = {
  icon:  React.ComponentType<LucideProps>;
  text: string;
  link: string;
};

const optionsMenu: OptionMenu[] = [
  {
    icon: House,
    text: "Início",
    link: "/"
  },
  {
    icon: Truck,
    text: "Pedidos",
    link: "/pedido"
  },
  {
    icon: ShoppingBag,
    text: "Carrinho",
    link: "cart"
  }
]

export const Header = () => {
  const [categories, setCategories] = useState<typeof categoryTable.$inferSelect[] | null>(null)
  const { data: session } = authClient.useSession();
  const authorized = session?.user
  const headleCategory = async () => {
    const result = await getCategory()
    setCategories(result)
  }
  useEffect(() => {
    headleCategory()
  }, [])
  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/">
        <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
      </Link>

      <div className="flex items-center gap-3">
        <Cart />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="rounded-l-2xl">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="px-5">
              {authorized ? (
                <>
                  <div className="flex justify-between space-y-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={session?.user?.image as string | undefined}
                        />
                        <AvatarFallback>
                          {session?.user?.name?.split(" ")?.[0]?.[0]}
                          {session?.user?.name?.split(" ")?.[1]?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold">{session?.user?.name}</h3>
                        <span className="text-muted-foreground block text-xs">
                          {session?.user?.email}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => authClient.signOut()}
                    >
                      <LogOutIcon />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-semibold">Olá. Faça seu login!</h2>
                  <Button size="icon" asChild className="px-6 py-3 rounded-full flex flex-1">
                    <Link href="/authentication">
                      Login 
                      <LogInIcon />
                    </Link>
                  </Button>
                </div>
              )}
              <Separator className="mr-4 mt-4" />
              
            </div>
            <div className="p-5 space-y-10">
              <ul>
                {
                  optionsMenu.map((option: OptionMenu) => (
                    ((option.text === "Pedidos" && authorized) || (option.text !== "Pedidos")) && (
                      <li key={option.text} className="flex flex-row gap-3 mb-3">
                        <option.icon />
                        <Link href={option.link}>{option.text}</Link>
                      </li>
                    )
                  ))
                }
              </ul>
              <Separator className="mr-4 my-4" />
              <ul>
                {
                Array.isArray(categories) && categories.length > 0 ? (
                  categories.map((category: typeof categoryTable.$inferSelect) => (
                    <li key={category.id} className="flex flex-row gap-3 mb-3">
                      <Link key={category.slug} href={category.slug}>
                        {category.name}
                      </Link>

                    </li>
                  ))
                ) : (
                  'Nenhuma categoria encontrada'
                )
              }
              </ul>
              
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
