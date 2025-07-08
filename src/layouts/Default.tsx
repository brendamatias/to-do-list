import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <main className="h-screen px-20 py-20">
      <div className="h-full max-w-7xl mx-auto w-full flex flex-col">
        <Outlet />
      </div>
    </main>
  );
};

export { DefaultLayout };
