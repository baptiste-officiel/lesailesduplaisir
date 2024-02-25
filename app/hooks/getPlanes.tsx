export const getPlanes = async(cache: RequestCache) => {
    try {
      const response = await fetch(`${process.env.URL}/api/planes`, {cache: cache})
    .then((res) => res.json())

    return response;
    } catch (error) {
      console.log("🚀 ~ getPlanes ~ error:", error)
    }
}