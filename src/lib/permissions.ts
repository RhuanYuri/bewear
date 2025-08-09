import { createAccessControl } from "better-auth/plugins/access";
import { adminAc,defaultStatements } from "better-auth/plugins/admin/access";
 
/**
 * make sure to use `as const` so typescript can infer the type correctly
 */
const statement = { 
  ...defaultStatements, 
    product: ['create', 'list', 'delete', 'update'],
    productVariant:  ['create', 'list', 'delete', 'update'],
    user:  ['create', 'list', 'set-role', 'ban', 'impersonate', 'delete', 'set-password', 'update'],
    category:  ['create', 'list', 'delete', 'update'],
} as const; 
 
export const ac = createAccessControl(statement); 

export const admin = ac.newRole({
    product: ['create', 'list', 'delete', 'update'],
    productVariant: ['create', 'list', 'delete', 'update'],
    category: ['create', 'list', 'delete', 'update'],
    ...adminAc.statements, 
});


export const coordenador = ac.newRole({
  product: ['create', 'list', 'delete', 'update'],
  productVariant: ['create', 'list', 'delete', 'update'],
  category: ['create', 'list', 'delete', 'update'],
  user:  ['create', 'list', 'delete', 'set-password', 'update'],
})

export const gerente = ac.newRole({
  product: ['create', 'list', 'delete', 'update'],
  productVariant: ['create', 'list', 'delete', 'update'],
  category: ['create', 'list', 'delete', 'update'],
  user:  ['create', 'list', 'delete', 'set-password', 'update'],
})

export const lojista = ac.newRole({
  product: ['list', 'update'],
  productVariant: ['list', 'update'],
  category: ['list', 'update'],
  user:  ['list', 'set-password'],
})

export const user = ac.newRole({
  product: ['list'],
  productVariant: ['list'],
  category: ['list'],
  user: ['update', 'set-password'],
});