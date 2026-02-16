import HolyLoader from "holy-loader";
import React, { Suspense } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<HolyLoader />}>
      <section className="center py-5 mt-15 min-h-[calc(100vh - 645.23px)]">
        {children}
      </section>
    </Suspense>
  );
};

export default AuthLayout;
