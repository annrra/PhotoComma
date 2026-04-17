'use client';
import React, { useMemo } from 'react';

type EmailLinkProps = {
  className?: string;
  showEmail?: boolean;
}

const EmailLink = ({ className, showEmail = false }: EmailLinkProps) => {
  const a = "ann"
  const b = "rra"
  const c = "gma"
  const d = "il"
  const e = "co"
  const f = "m"

  // Construct only in JS runtime
  const email = useMemo(() => {
    return `${a + b}@${c + d}.${e + f}`;
  }, []);

  const handleClick = () => {
    window.open(`mailto:${email}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") handleClick();
  };

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={className}
    >
      {showEmail ? email : "email"}
    </span>
  )
}

export default EmailLink;
