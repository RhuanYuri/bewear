import { adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react

import { ac, admin, coordenador, gerente, lojista,user } from "@/lib/permissions"

export const authClient = createAuthClient({
  plugins: [
        adminClient({
            ac,
            roles: {
                admin,
                user,
                coordenador,
                gerente,
                lojista
            }
        })
    ]
});
