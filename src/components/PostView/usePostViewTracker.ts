'use client';
import { useEffect } from 'react';

export function usePostViewTracker(slug?: string) {
  useEffect(() => {
    if (!slug) return;

    // avoid double firing in dev (React strict mode)
    /* const alreadyTracked = sessionStorage.getItem(`viewed:${slug}`);
    if (alreadyTracked) return;

    sessionStorage.setItem(`viewed:${slug}`, "1"); */

    fetch("/api/views", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug }),
    });
  }, [slug]);
}