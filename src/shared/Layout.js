import { Header } from "../component/Header";

export const Layout = ({ children }) => {
  return (
    <div className="global-layout">
      <Header />
      {children}
    </div>
  );
};
