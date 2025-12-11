export function useUser() {
  return {
    user: {
      iduser: 4, // <-- cambia por el ID real del investigador
      email: "test@example.com",
      role: "researcher",
    },
    loading: false,
  };
}
