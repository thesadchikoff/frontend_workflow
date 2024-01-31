import { PropsWithChildren } from "react";

import "./Layout.scss";
import { Header } from "./header/Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={"flex flex-col w-full h-full"}>
      <Header />
      <main className={"w-full flex-1 px-10 py-5"}>{children}</main>
    </div>
  );
};

export default Layout;
