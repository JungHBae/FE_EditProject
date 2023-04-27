import { BrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { AnimatedRoutes } from "./AnimatedRoutes";

export const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
