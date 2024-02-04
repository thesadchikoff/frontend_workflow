import {
  CalendarCheck2,
  Home,
  NotebookText,
  ShoppingBasket,
  UsersRound,
} from "lucide-react";

export const navLinks = [
  {
    path: "/",
    title: "Главная",
    icon: Home,
    isAdmin: false,
  },
  {
    path: "/tasks",
    title: "Мои задачи",
    icon: CalendarCheck2,
    isAdmin: false,
  },
  {
    path: "/subdivision",
    title: "Моё подразделение",
    icon: UsersRound,
    isAdmin: false,
  },
  {
    path: "/shop",
    title: "Магазин",
    icon: ShoppingBasket,
    isAdmin: false,
  },
];

export const navLinksAdmin = [
  {
    path: "/",
    title: "Главная",
    icon: Home,
    isAdmin: false,
  },
  {
    path: "/tasks",
    title: "Мои задачи",
    icon: CalendarCheck2,
    isAdmin: false,
  },
  {
    path: "/subdivision",
    title: "Моё подразделение",
    icon: UsersRound,
    isAdmin: false,
  },
  {
    path: "/shop",
    title: "Магазин",
    icon: ShoppingBasket,
    isAdmin: false,
  },
  {
    path: "/invites",
    title: "Заявки",
    icon: NotebookText,
    isAdmin: true,
  },
];
