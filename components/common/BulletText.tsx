import IconCheckCircleFill from "@/assets/icons/IconCheck";

export const BulletText = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex space-x-1.5 items-start justify-start  my-2">
      <IconCheckCircleFill className="text-zinc-200 text-sm shrink-0 mt-1.5" />
      <p className="text-base md:text-md text-zinc-200">{children}</p>
    </div>
  );
};
