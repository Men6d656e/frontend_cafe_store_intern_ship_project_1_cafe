import { API_BASE_URL } from "@/constants/api";


const fetchUserRole = async (): Promise<string | null> => {
  const headersInit: HeadersInit = {
    "content-type": "application/json",
  };

  try {
    const res = await fetch(`${API_BASE_URL}/auth/my-role`, {
      method: "GET",
      headers: headersInit,
      credentials: "include",
    });
    if (!res.ok) {
      console.log("Fail to fetch the role");
      return null;
    }
    const response = await res.json();
    console.log(`Api response`, response);
    return response.role;
  } catch (error) {
    console.log("Error to fetch user role:", error);
    return null;
  }
};
export { fetchUserRole };
