import { SessionProvider } from "@/context/SessionContext";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "white" }}>
        <Sidebar />

        <main style={{ flex: 1, padding: "20px" }}>
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
