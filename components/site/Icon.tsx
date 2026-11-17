export type IconName =
  | "ne"
  | "right"
  | "down"
  | "github"
  | "mail"
  | "copy"
  | "check"
  | "linkedin"
  | "lock"
  | "play"
  | "pause"
  | "prev"
  | "next"
  | "volume"
  | "mute";

const PATHS: Record<IconName, React.ReactNode> = {
  ne: <path d="M7 17 17 7M8 7h9v9" />,
  right: <path d="M5 12h14m-6-6 6 6-6 6" />,
  down: <path d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14" />,
  github: (
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </>
  ),
  check: <path d="m5 12 5 5 9-10" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  play: <path d="M8 5v14l11-7z" fill="currentColor" />,
  pause: <path d="M8 5v14M16 5v14" />,
  prev: <path d="M19 6v12l-9-6zM6 6v12" />,
  next: <path d="M5 6v12l9-6zM18 6v12" />,
  volume: <path d="M4 9v6h4l5 4V5L8 9zM16.5 8.5a5 5 0 0 1 0 7" />,
  mute: <path d="M4 9v6h4l5 4V5L8 9zM17 9.5l5 5M22 9.5l-5 5" />,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={{ flex: "none" }}
    >
      {PATHS[name]}
    </svg>
  );
}
