import UserInfo from "./UserInfo";
import Timeline from "./Timeline";
import "./styles.css"

const listOfYears = [1997, 2016, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

const userData = {
  name: "Jemimma",
  lastName: "Luz",
  profilePhotoUrl: "https://github.com/jemluz.png",
  urls: [
    "https://github.com/jemluz",
    "https://www.linkedin.com/in/jemluz",
    "https://www.turma.dev"
  ]
}

export default function UserPage() {
  return (
    <main className="user-page-grid grid my-auto min-h-screen">
      <UserInfo {...userData}/>
      <Timeline years={listOfYears} />
      <div className="content-container flex items-center justify-center h-full">left content</div>
    </main>
  );
}
