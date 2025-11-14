import { SessionProvider } from "@/context/SessionContext";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, backgroundColor: "white" }}>
        <SessionProvider>
          <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "white" }}>
            {/* Sidebar siempre a la izquierda */}
            <Sidebar />

            {/* Contenido principal a la derecha */}
            <main style={{ flex: 1, padding: "20px" }}>
              {children}
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
