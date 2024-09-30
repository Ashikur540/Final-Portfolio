import { BulletText } from "./BulletText";
import { LinkTextWithIcon } from "./LinkTextWithIcon";

export type WorkHistoryCardProps = {
  company: string;
  title: string;
  date: string;
  description: string;
  responsibilities: string[];
  url: string;
};

export const WorkHistoryCard = ({
  history,
}: {
  history: WorkHistoryCardProps;
}) => {
  const { company, description, responsibilities, url } = history;
  return (
    <>
      <div className="flex  flex-col space-y-1 relative">
        <LinkTextWithIcon url={url ?? ""}>
          <h4 className="text-lg md:text-xl lg:text-xl font-semibold inline-flex animate-shimmer bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text  text-transparent">
            {company}
          </h4>
        </LinkTextWithIcon>
        <p
          className="text-sm md:text-base text-slate-900 dark:text-zinc-50"
          style={{ marginBottom: "16px" }}
        >
          {description}
        </p>

        {responsibilities.map((responsibility: string, index: number) => (
          <BulletText key={index}>{responsibility}</BulletText>
        ))}
      </div>
    </>
  );
};
