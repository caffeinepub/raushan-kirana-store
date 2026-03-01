import { useQuery } from "@tanstack/react-query";
import type { Product } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProductsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function useGetStoreInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<{ name: string; address: string; timings: string }>({
    queryKey: ["storeInfo"],
    queryFn: async () => {
      if (!actor) {
        return {
          name: "Raushan Kirana Store",
          address: "Main Bazaar, Sector 12, Noida, UP - 201301",
          timings: "Subah 7 baje se Raat 10 baje tak (7 AM - 10 PM)",
        };
      }
      return actor.getStoreInfo();
    },
    enabled: !!actor && !isFetching,
  });
}
