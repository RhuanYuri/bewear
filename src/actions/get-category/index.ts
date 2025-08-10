"use server"

import { db } from "@/db"

export const getCategory = async () => {
  const result = db.query.categoryTable.findMany()
  return result

}