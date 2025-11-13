import UserInfo from "../../components/custom/UserInfo";
import Timeline from "../../components/custom/Timeline";
import "./styles.css"
import ContentItem from "../../components/custom/ContentItem";
import { contentData, userData } from "@/background-data";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function BackgroundPage() {
  const backgroundYears = Array.from(new Set(contentData.map(item => item.year)));

  return (
    <main className="user-page-grid grid my-auto min-h-screen">
      <UserInfo {...userData}/>
      <Timeline years={backgroundYears} />

      <ScrollArea className="content-container scroll-area flex flex-col max-h-[290px]">
        {
          contentData.map(
            (period, index) => {
              const isNotUniqueOrLast = contentData.length !== 1 && index < contentData.length - 1;

              return (
                <ContentItem
                  key={period.title}
                  background={period}
                  isNotUniqueOrLast={isNotUniqueOrLast}
                />
              )
            }
          )
        }
      </ScrollArea>
    </main>
  );
}
