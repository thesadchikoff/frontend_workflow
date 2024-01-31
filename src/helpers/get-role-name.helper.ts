type Role = "user" | "admin";

export const getRoleName = (role: Role) => {
  switch (role) {
    case "user":
      return {
        roleName: "Пользователь",
        color: "#2509CF",
      };
    case "admin":
      return {
        roleName: "Администратор",
        color: "#2509CF",
      };
    default:
      return {
        roleName: "Без роли",
        color: "#2509CF",
      };
  }
};
