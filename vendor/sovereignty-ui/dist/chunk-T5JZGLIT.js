import { useEffect, useState, useCallback, useRef, useMemo } from 'react';

// src/hooks/useClickOutside.ts
var useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      const element = ref.current;
      if (!element || element.contains(event.target)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
var useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};
var useLoading = (initialLoading = false) => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState(null);
  const startLoading = useCallback(() => {
    setIsLoading(true);
    setError(null);
  }, []);
  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);
  const withLoading = useCallback(async (fn) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fn();
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  return { error, isLoading, setError, startLoading, stopLoading, withLoading };
};
var useMediaQuery = (query) => {
  const getMatches = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  }, [query]);
  const [matches, setMatches] = useState(getMatches);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia(query);
    const handler = (event) => setMatches(event.matches);
    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);
  return matches;
};
var useModal = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  return { close, isOpen, open, toggle };
};
var DEFAULT_AUTO_DISMISS_MS = 5e3;
var DEFAULT_MAX = 5;
var useNotifications = ({
  autoDismissMs = DEFAULT_AUTO_DISMISS_MS,
  max = DEFAULT_MAX
} = {}) => {
  const [notifications, setNotifications] = useState([]);
  const counterRef = useRef(0);
  const timersRef = useRef(/* @__PURE__ */ new Map());
  const remove = useCallback((id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);
  const notify = useCallback(
    ({ message, title, type = "info" }) => {
      counterRef.current += 1;
      const id = `sui-notification-${counterRef.current}`;
      setNotifications((prev) => {
        const next = [...prev, { id, message, title, type }];
        return next.length > max ? next.slice(next.length - max) : next;
      });
      if (autoDismissMs > 0) {
        const timer = setTimeout(() => remove(id), autoDismissMs);
        timersRef.current.set(id, timer);
      }
      return id;
    },
    [autoDismissMs, max, remove]
  );
  const clear = useCallback(() => {
    setNotifications([]);
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
  }, []);
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);
  return { clear, notifications, notify, remove };
};
var usePagination = ({
  initialPage = 1,
  pageSize = 10,
  total
}) => {
  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);
  const [currentPage, setCurrentPage] = useState(Math.min(initialPage, totalPages));
  const goToPage = useCallback(
    (page) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    },
    [totalPages]
  );
  const goToNext = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const goToPrev = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);
  const goToFirst = useCallback(() => goToPage(1), [goToPage]);
  const goToLast = useCallback(() => goToPage(totalPages), [goToPage, totalPages]);
  return {
    currentPage,
    goToFirst,
    goToLast,
    goToNext,
    goToPage,
    goToPrev,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
    pageSize,
    totalPages
  };
};
var useTableSort = (options = {}) => {
  const [sort, setSort] = useState(
    options.initialKey ? { direction: options.initialDirection ?? "asc", key: options.initialKey } : null
  );
  const handleSort = useCallback((key) => {
    setSort((prev) => {
      if (prev?.key === key) {
        return prev.direction === "asc" ? { direction: "desc", key } : null;
      }
      return { direction: "asc", key };
    });
  }, []);
  return { handleSort, sort };
};

export { useClickOutside, useDebounce, useLoading, useMediaQuery, useModal, useNotifications, usePagination, useTableSort };
//# sourceMappingURL=chunk-T5JZGLIT.js.map
//# sourceMappingURL=chunk-T5JZGLIT.js.map