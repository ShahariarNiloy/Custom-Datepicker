import { ReactNode, useRef } from "react";
import "./datepicker-popup.css";
import { useTrapFocus } from "../use-trap-focus";

export const DatepickerPopup = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  useTrapFocus(ref);

  return (
    <div
      ref={ref}
      className="datepicker-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog1Title"
      aria-describedby="dialog1Desc"
    >
      {children}
    </div>
  );
};
