import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin as adminPlugin } from "better-auth/plugins"

import { db } from "@/db";
import * as schema from "@/db/schema";
import { ac, admin, coordenador, gerente, lojista,user } from "@/lib/permissions"

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
        adminPlugin({
            adminUserIds: ['NQ0P5mWrUDoOqqSNxOsMEuj5TGNbFWmR'],
            ac ,
            roles: {
                admin,
                user,
                coordenador,
                gerente,
                lojista
            }
        }),
    ],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  user: {
    modelName: "userTable",
  },
  session: {
    modelName: "sessionTable",
  },
  account: {
    modelName: "accountTable",
  },
  verification: {
    modelName: "verificationTable",
  },
});
