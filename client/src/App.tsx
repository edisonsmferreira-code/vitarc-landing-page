/*
Design reminder — Luxury Emergency Noir:
O aplicativo deve carregar em tema escuro para preservar a atmosfera vinho/noir, o contraste premium e os efeitos de emergência luminosa da LP Vitarc.
*/

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Rcp from "./pages/Rcp";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/rcp"} component={Rcp} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
