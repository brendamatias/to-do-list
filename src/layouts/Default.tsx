import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <main className="h-screen sm:px-20 px-[30px] py-[70px] sm:py-20">
      <div className="h-full max-w-7xl mx-auto w-full flex flex-col">
        <Outlet />
      </div>
    </main>
  );
};

export { DefaultLayout };
