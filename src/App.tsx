import { useState } from "react";
import SideBar from "./components/SideBar/SideBar";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <div className="text-stone-950 bg-stone-100 grid gap-4 p-4 grid-cols-[220px,_1fr]">
      <SideBar />
      <Dashboard />
    </div>
  );
}

export default App;
