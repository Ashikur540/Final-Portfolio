import { cn } from "@/lib/utils";

export const SectionTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h2
      className={cn(
        "text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold relative tracking-tightro  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-slate-500 py-8",
        className
      )}
    >
      {children}
    </h2>
  );
};
