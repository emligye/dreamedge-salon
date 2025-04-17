import { Switch, Route } from "wouter";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import Home from "@/pages/Home";
import Location from "@/pages/Location";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/location" component={Location} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F9FC]">
      <Header />
      <main className="flex-1 pt-16 pb-20">
        <Router />
      </main>
      <BottomNavigation />
    </div>
  );
}

export default App;
