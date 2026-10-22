"use client";

import { useEffect } from "react";

// The account forms have no action, so in the editor a click into a button or
// label would validate and submit the form or move focus to an input.
// Document listeners, because re-renders replace the forms' attributes.
function guardForms() {
  document.addEventListener("invalid", (event) => event.preventDefault(), true);
  document.addEventListener("submit", (event) => event.preventDefault(), true);
  document.addEventListener(
    "click",
    (event) => {
      if ((event.target as Element | null)?.closest?.("form label")) {
        event.preventDefault();
      }
    },
    true,
  );
}

export default function CloudCannonEditor() {
  useEffect(() => {
    if (!(window as { inEditorMode?: boolean }).inEditorMode) return;
    guardForms();
    import("../app/cloudcannon/registerComponents").catch((error) => {
      console.warn("Failed to load CloudCannon component registration:", error);
    });
  }, []);

  return null;
}
