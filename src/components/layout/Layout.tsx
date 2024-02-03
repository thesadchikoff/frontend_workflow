import { PropsWithChildren } from "react";
import "./Layout.scss";
import { Header } from "./header/Header";
import Sidebar from "./sidebar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={"flex flex-col w-full max-h-screen"}>
      <Header />
      <main className={"w-full flex-1 flex"}>
        <Sidebar />
        <section className="flex-1 px-10 h-[calc(100vh-60px)] py-10 overflow-y-auto">
          {children}
        </section>
      </main>
    </div>
  );
};

export default Layout;
