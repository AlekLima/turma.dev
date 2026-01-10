import UserInfo from "../../components/custom/UserInfo";
import Timeline from "../../components/custom/Timeline";
import "./styles.css"
import { contentData, userData } from "@/background-data";
import { BackgroundProvider } from "../../contexts/BackgroundContext";
import ContentView from "@/components/custom/ContentView";

export default function BackgroundPage() {
  const backgroundYears = Array.from(new Set(contentData.map(item => item.year)));

  return (
    <main className="user-page-grid grid my-auto min-h-screen">
      <UserInfo {...userData}/>
      <BackgroundProvider initialYear={backgroundYears.length > 0 ? backgroundYears[0] : null}>
        <Timeline years={backgroundYears} />
        <ContentView />
      </BackgroundProvider>
    </main>
  );
}
