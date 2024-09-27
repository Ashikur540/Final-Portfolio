import Link from "next/link";
import { ReactNode } from "react";

import IconExternal from "@/assets/icons/IconExternal";

type LinkTextWithIconProps = {
  url: string;
  children: ReactNode;
};

export const LinkTextWithIcon = ({ url, children }: LinkTextWithIconProps) => {
  return (
    <Link target="_blank" href={url}>
      <span className="flex items-center justify-start space-x-1">
        {children}
        <span className="inline-block ">
          <IconExternal className="text-indigo-400" />
        </span>
      </span>
    </Link>
  );
};
