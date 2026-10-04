import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import JournalArticle from "@/pages/JournalArticle";
import Stories from "@/pages/Stories";
import StoryArticle from "@/pages/StoryArticle";
import InfoPage from "@/pages/InfoPage";
import Admin from "@/pages/Admin";
import Shop from "@/pages/Shop";
import StartHere from "@/pages/StartHere";
import { useEffect } from "react";
import { useLocation } from "wouter";


function Router() {
  const [location] = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash) {
        document.getElementById(decodeURIComponent(hash))?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location]);

  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/journal"} component={Journal} />
      <Route path={"/journal/:slug"} component={JournalArticle} />
      <Route path={"/stories"} component={Stories} />
      <Route path={"/stories/:slug"} component={StoryArticle} />
      <Route path={"/about"} component={InfoPage} />
      <Route path={"/terms"} component={InfoPage} />
      <Route path={"/privacy"} component={InfoPage} />
      <Route path={"/contact"} component={InfoPage} />
      <Route path={"/shop"} component={Shop} />
      <Route path={"/start-here"} component={StartHere} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
