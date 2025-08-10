import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export const GET = async (request: Request) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if(!session?.user){
    throw Error("Não autorizado")
  }
  if(!session.user?.role){
    throw Error("Tipo não identificado")
  }
  const data = await auth.api.userHasPermission({
    body: {
        userId: "session.user.id",
        role: "admin",
        permission: { "user": ["create"] } /* Must use this, or permissions */,
    },
  });
  if(!data?.success){
    throw Error("Sem permissão")
  }

  const newUser = await auth.api.createUser({
      body: {
          email: "user@example.com", // required
          password: "12345678", // required
          name: "James Smith", // required
          role: "user",
          data: { customField: "customValue" },
      },
  });

  return NextResponse.json({ newUser })



}