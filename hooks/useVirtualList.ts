"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

/**
 * Maps a key press to the row that should get the focus.
 *
 * Returns `null` when the key is not handled by the list.
 */
export function resolveFocusTarget(
  key: string,
  currentIndex: number,
  count: number
): number | null {
  if (count === 0) return null;
  switch (key) {
    case "ArrowDown":
      return Math.min(currentIndex + 1, count - 1);
    case "ArrowUp":
      return Math.max(currentIndex - 1, 0);
    case "Home":
      return 0;
    case "End":
      return count - 1;
    default:
      return null;
  }
}

interface UseVirtualListOptions {
  /** Number of items in the list. */
  count: number;
  /** Fixed height of a single row in pixels. Must match the rendered row. */
  rowHeight: number;
  /** Maximum height of the scroll container in pixels. */
  maxHeight?: number;
  /** Number of rows rendered above and below the viewport. */
  overscan?: number;
}

/**
 * Shared plumbing for the virtualized lists (participant list, leaderboard).
 *
 * - Rows have a fixed height, so the scroll height is known before the rows
 *   are measured and the list never shifts while rows load.
 * - Only the visible rows are in the DOM. Because of that, keyboard users
 *   cannot Tab to the rows that are currently unmounted, so the list keeps a
 *   roving focus: ArrowUp/ArrowDown move between rows, Home/End jump to the
 *   first/last row and the target row is scrolled into view and focused.
 */
export function useVirtualList({
  count,
  rowHeight,
  maxHeight = 560,
  overscan = 8,
}: UseVirtualListOptions) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const pendingFocusRef = useRef<number | null>(null);

  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => rowHeight,
    overscan,
    // Render the first rows immediately so the list is never empty on the
    // first paint (the real viewport is measured right after mount).
    initialRect: { width: 0, height: maxHeight },
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  const focusIndex = useCallback(
    (index: number) => {
      if (count === 0) return;
      const next = Math.min(Math.max(index, 0), count - 1);
      pendingFocusRef.current = next;
      setActiveIndex(next);
      virtualizer.scrollToIndex(next, { align: "auto" });
    },
    [count, virtualizer]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      const target = resolveFocusTarget(event.key, activeIndex, count);
      if (target === null) return;
      event.preventDefault();
      focusIndex(target);
    },
    [activeIndex, count, focusIndex]
  );

  // Move the DOM focus once the target row is mounted. The row may only
  // exist after the virtualizer scrolled it into view, so this runs after
  // every render until the row is found.
  useEffect(() => {
    if (pendingFocusRef.current === null) return;
    const row = scrollRef.current?.querySelector<HTMLElement>(
      `[data-virtual-index="${pendingFocusRef.current}"]`
    );
    if (!row) return;
    pendingFocusRef.current = null;
    row.focus();
  });

  const firstItem = virtualItems[0];
  const lastItem = virtualItems[virtualItems.length - 1];

  return {
    scrollRef,
    virtualizer,
    virtualItems,
    totalSize,
    activeIndex,
    setActiveIndex,
    focusIndex,
    handleKeyDown,
    /** Height of the empty rows rendered before the first visible row. */
    topPadding: firstItem ? firstItem.start : 0,
    /** Height of the empty rows rendered after the last visible row. */
    bottomPadding: lastItem ? Math.max(totalSize - lastItem.end, 0) : 0,
    /** Height of the scroll container: never taller than the content. */
    containerHeight: count === 0 ? 0 : Math.min(maxHeight, totalSize),
    /** Props for the row element that carries the roving focus. */
    getRowProps: (index: number) => ({
      "data-virtual-index": index,
      tabIndex: index === activeIndex ? 0 : -1,
      onFocus: () => setActiveIndex(index),
    }),
  };
}
