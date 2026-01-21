import { useBackground } from "@/contexts/BackgroundContext";

type BulletProps = {
  isActive: boolean;
  onClick: () => void;
};

export default function BulletList() {
    const {
      yearContents,
      selectedContent,
      setSelectedContent,
    } = useBackground();

  return (
    <ul className="bullet-list ml-4">
      {yearContents.map((content) => {
        const isActive = content.id === selectedContent;

        return (
          <Bullet
            key={content.id}
            isActive={isActive}
            onClick={() => setSelectedContent(content.id)}
          />
        );
      })}
    </ul>
  );
}

export function Bullet({ isActive, onClick }: BulletProps) {
  const opacity = isActive ? "opacity-100" : "opacity-25";
  const smallCircleSize = isActive ? "w-2 h-2" : "w-1 h-1";
  const largeCircleSize = isActive ? "w-4 h-4" : "w-3 h-3";

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-5 h-5 ${opacity} cursor-pointer hover:opacity-75 transition-opacity mb-2`}
    >
      <div className={`absolute ${smallCircleSize} rounded-full bg-neutral-400`}></div>
      <div
        className={`absolute ${largeCircleSize} rounded-full border-2 border-primary`}
      ></div>
    </button>
  );
}