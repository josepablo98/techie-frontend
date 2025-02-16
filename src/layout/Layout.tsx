import { Footer, Header } from "../components";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <main className="flex-grow overflow-auto">{children}</main>
      <Footer />
    </div>

  );
};
