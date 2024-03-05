import { toast } from "sonner";
import { z } from "zod";

const PlaneScheme = z.object({
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

      if (res.ok) {
        const data = await res.json();
        const verifiedData = PlanesScheme.parse(data);
        return verifiedData;
      } else {
        if (res.status === 404) throw new Error('404, Not found');
        if (res.status === 500) throw new Error('500, internal server error');
        // For any other server error
        throw new Error(`${res.status}`);
      }
  
    } catch (error) {
      Error(`${error}`)
    } 
}