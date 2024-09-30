import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentAge() {
  const birthDate = new Date("2000-11-11");
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  const month = currentDate.getMonth() - birthDate.getMonth();
  if (
    month < 0 ||
    (month === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    return age - 1;
  }
  return age;
}

export function copyToClipboard(text: string) {
  if (!navigator.clipboard) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // Prevent scrolling to bottom of page in older browsers
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      console.log("Fallback: Text copied to clipboard");
    } catch (err) {
      console.error("Fallback: Unable to copy", err);
    }

    document.body.removeChild(textArea);
    return;
  }

  // Modern clipboard API
  navigator.clipboard.writeText(text).then(
    () => {
      console.log("Text successfully copied to clipboard");
    },
    (err) => {
      console.error("Error in copying text: ", err);
    }
  );
}
