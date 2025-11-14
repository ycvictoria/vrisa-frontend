"use client";

import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext<any>(null);

export function SessionProvider({ children }: any) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const res = await fetch("/api/mock/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    }
    loadUser();
  }, []);

  return (
    <SessionContext.Provider value={user}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
