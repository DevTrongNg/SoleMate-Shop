import React from "react";
import ClientHeader from "./client/header";
import ClientFooter from "./client/footer";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <main>
      <ClientHeader />
      <div>
        <div>
          <Outlet />
        </div>
      </div>
      <ClientFooter />
    </main>
  );
};

export default ClientLayout;
