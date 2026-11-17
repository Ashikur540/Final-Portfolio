import { Icon, type IconName } from "./Icon";
import s from "./button.module.css";

type Props = {
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "line";
  size?: "md" | "sm";
  icon: IconName;
  /** which way the icon nudges on hover */
  iconMove?: "ne" | "down" | "right";
  onDark?: boolean;
  /** shows the green "done" state on the icon */
  done?: boolean;
  external?: boolean;
  download?: boolean;
  ariaLabel?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  onClick,
  variant = "solid",
  size = "md",
  icon,
  iconMove,
  onDark,
  done,
  external,
  download,
  ariaLabel,
  children,
}: Props) {
  const cls = [s.btn, variant === "line" && s.line, size === "sm" && s.sm, onDark && s.onDark, done && s.done]
    .filter(Boolean)
    .join(" ");
  const inner = (
    <>
      <span>{children}</span>
      <span className={`${s.ic} ${iconMove ? s[iconMove] : ""}`}>
        <Icon name={icon} />
      </span>
    </>
  );
  if (href) {
    return (
      <a
        className={cls}
        href={href}
        aria-label={ariaLabel}
        download={download || undefined}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}
