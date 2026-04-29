import type { ReactNode } from 'react';

type Props = {
  label?: string;
  children: ReactNode;
  attrib?: string;
};

export function Creed({ label = 'Závěrečné požehnání', children, attrib }: Props) {
  return (
    <div className="creed">
      <div className="creed-label">— {label} —</div>
      <div className="creed-text">{children}</div>
      {attrib && <div className="creed-attrib">{attrib}</div>}
    </div>
  );
}
