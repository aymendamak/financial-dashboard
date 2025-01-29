import SideBar from "./components/SideBar/SideBar";
import TopBar from "./components/TopBar/top-bar";
import DashboardPage from "./pages/Dashboard/page";

function App() {
  return (
    <div className="text-stone-950 bg-stone-100 grid gap-4 p-4 grid-cols-[220px,_1fr]">
      <SideBar />
      <div className="bg-white rounded-lg pb-4 shadow h-[200vh]">
        <TopBar />
        <DashboardPage />
      </div>
    </div>
  );
}

export default App;
