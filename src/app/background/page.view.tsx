import UserInfo from "./UserInfo";
import Timeline from "./Timeline";
import "./styles.css"
import ContentItem from "./ContentItem";
import { contentData, listOfYears, userData } from "@/background-data";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function UserPage() {
  return (
    <main className="user-page-grid grid my-auto min-h-screen">
      <UserInfo {...userData}/>
      <Timeline years={listOfYears} />

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
