import { toast } from "sonner";
import { z } from "zod";

export const PlaneScheme = z.object({
  id: z.number(),
  name: z.string(),
  img: z.string(),
  seats: z.string().optional(),
  vmax: z.string().optional(),
  weight: z.string().optional(),
})

const PlanesScheme = z.array(PlaneScheme);

type PlaneType = z.infer<typeof PlaneScheme>;

export const getPlanes = async(cache: RequestCache) => {
    try {
      const res = await fetch(`${process.env.URL}/api/planes`, {cache: cache})

      if (!res.ok) {
        throw new Error(`${res.status}, ${res.statusText}`);
      }
      const data = await res.json();
      const verifiedData = PlanesScheme.parse(data);
      return verifiedData;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error: ${error.message}`);
        } else {
          throw new Error('An unexpected error occurred');
        }
      }
}