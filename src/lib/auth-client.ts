import { createAuthClient } from "better-auth/client"
import { adminClient } from "better-auth/client/plugins"

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
})