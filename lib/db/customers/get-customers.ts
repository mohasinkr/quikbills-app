import { Customer } from "@/schema/types";
import { createClient } from "@/utils/supabase/server";

type CustomerColumns = keyof Customer;
type SelectColumns = CustomerColumns | "*" | CustomerColumns[];

export const fetchCustomers = async (columns: SelectColumns = "*") => {
  const supabase = await createClient();

  const selectColumns = Array.isArray(columns) ? columns.join(",") : columns;

  const { data, error } = await supabase
    .from("customers")
    .select(selectColumns as "*");

  if (error) {
    throw new Error(error.message);
  }

  return data as Customer[];
};
