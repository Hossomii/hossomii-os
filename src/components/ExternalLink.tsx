import type { AnchorHTMLAttributes, MouseEvent } from "react";

import { registerExternalNavigation } from "../system/navigation/externalNavigation";

type ExternalLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "target" | "rel"
> & {
  href: string;
};

export function ExternalLink({
  href,
  onClick,
  onAuxClick,
  ...props
}: ExternalLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    registerExternalNavigation(href);
  }

  function handleAuxClick(event: MouseEvent<HTMLAnchorElement>) {
    onAuxClick?.(event);

    if (event.defaultPrevented || event.button !== 1) {
      return;
    }

    registerExternalNavigation(href);
  }

  return (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      onAuxClick={handleAuxClick}
    />
  );
}
