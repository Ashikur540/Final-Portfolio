import IconCheckCircleFill from "@/assets/icons/IconCheck";

export const BulletText = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex space-x-1.5 items-center justify-start  my-2">
      <IconCheckCircleFill className="text-zinc-200" />
      <p className="text-base md:text-md text-zinc-200">{children}</p>
    </div>
  );
};
