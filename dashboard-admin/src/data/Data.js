// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilUserSquare,
  UilUsdSquare,
  UilMoneyWithdrawal
} from "@iconscout/react-unicons";

// Sidebar Data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
  },
  {
    icon: UilClipboardAlt,
    heading: "Pedidos",
  },
  {
    icon: UilUsersAlt,
    heading: "Clientes"
  },
  {
    icon: UilPackage,
    heading: "Produtos",
  },
  {
    icon: UilUserSquare,
    heading: "Usuários",
  },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Vendas",
    color: {
      backGround: "linear-gradient(#6096ba 0%, #a3cef1 100%)",
      boxShadow: "#274c77 0px 10px 20px 0px",
    },
    barValue: 70,
    value: "25,970",
    png: UilUsdSquare,
    series: [
      {
        name: "Vendas",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Receitas",
    color: {
      backGround: "linear-gradient(rgb(84, 101, 255) 0%, rgb(155, 177, 255) 100%)",
      boxShadow: "#274c77 0px 10px 20px 0px",
    },
    barValue: 80,
    value: "14,270",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Receitas",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  }
];
