export async function fetchUserSession() {
  try {
    const res = await fetch("/api/mock/auth/me");
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}