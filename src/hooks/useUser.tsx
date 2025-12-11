export function useUser() {
  return {
    user: {
      iduser: 20, // <-- cambia por el ID real del investigador
      email: "test@example.com",
      role: "researcher",
    },
    loading: false,
  };
}
