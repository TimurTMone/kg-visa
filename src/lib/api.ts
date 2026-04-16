const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

export function setToken(token: string) {
  localStorage.setItem("access_token", token);
  // Also set as cookie for middleware auth check
  document.cookie = `access_token=${token}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
}

export function clearToken() {
  localStorage.removeItem("access_token");
  document.cookie = "access_token=; path=/; max-age=0";
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Don't set Content-Type for FormData (browser sets it with boundary)
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(err.detail || err.error || `Error ${res.status}`);
  }

  return res.json();
}

// Auth
export const api = {
  auth: {
    register(email: string, password: string) {
      return request<{ access_token: string }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
    },
    login(email: string, password: string) {
      return request<{ access_token: string }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
    },
    me() {
      return request<{ id: number; email: string }>("/api/auth/me");
    },
  },

  applications: {
    create(data: Record<string, unknown>) {
      return request<{ id: number; refId: string; status: string; createdAt: string }>(
        "/api/applications/",
        { method: "POST", body: JSON.stringify(data) }
      );
    },
    list() {
      return request<Array<Record<string, unknown>>>("/api/applications/");
    },
    status(refId: string, email: string) {
      return request<Record<string, unknown>>(
        `/api/applications/status?id=${encodeURIComponent(refId)}&email=${encodeURIComponent(email)}`
      );
    },
    continue_(refId: string, email: string) {
      return request<Record<string, unknown>>(
        `/api/applications/continue?id=${encodeURIComponent(refId)}&email=${encodeURIComponent(email)}`
      );
    },
  },

  transfers: {
    create(data: Record<string, unknown>) {
      return request<{ id: number; trackingId: string; status: string; createdAt: string }>(
        "/api/transfers/",
        { method: "POST", body: JSON.stringify(data) }
      );
    },
  },

  upload: {
    async file(file: File, type: string): Promise<string> {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);
      const result = await request<{ url: string }>("/api/upload/", {
        method: "POST",
        body: formData,
      });
      return result.url;
    },
  },
};
