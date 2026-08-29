'use strict';

var react = require('react');

// src/hooks/useClickOutside.ts
var useClickOutside = (ref, handler) => {
  react.useEffect(() => {
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
  const [debouncedValue, setDebouncedValue] = react.useState(value);
  react.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};
var useLoading = (initialLoading = false) => {
  const [isLoading, setIsLoading] = react.useState(initialLoading);
  const [error, setError] = react.useState(null);
  const startLoading = react.useCallback(() => {
    setIsLoading(true);
    setError(null);
  }, []);
  const stopLoading = react.useCallback(() => {
    setIsLoading(false);
  }, []);
  const withLoading = react.useCallback(async (fn) => {
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
  const getMatches = react.useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  }, [query]);
  const [matches, setMatches] = react.useState(getMatches);
  react.useEffect(() => {
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
  const [isOpen, setIsOpen] = react.useState(initialOpen);
  const open = react.useCallback(() => setIsOpen(true), []);
  const close = react.useCallback(() => setIsOpen(false), []);
  const toggle = react.useCallback(() => setIsOpen((prev) => !prev), []);
  return { close, isOpen, open, toggle };
};
var DEFAULT_AUTO_DISMISS_MS = 5e3;
var DEFAULT_MAX = 5;
var useNotifications = ({
  autoDismissMs = DEFAULT_AUTO_DISMISS_MS,
  max = DEFAULT_MAX
} = {}) => {
  const [notifications, setNotifications] = react.useState([]);
  const counterRef = react.useRef(0);
  const timersRef = react.useRef(/* @__PURE__ */ new Map());
  const remove = react.useCallback((id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);
  const notify = react.useCallback(
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
  const clear = react.useCallback(() => {
    setNotifications([]);
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
  }, []);
  react.useEffect(() => {
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
  const totalPages = react.useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);
  const [currentPage, setCurrentPage] = react.useState(Math.min(initialPage, totalPages));
  const goToPage = react.useCallback(
    (page) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    },
    [totalPages]
  );
  const goToNext = react.useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const goToPrev = react.useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);
  const goToFirst = react.useCallback(() => goToPage(1), [goToPage]);
  const goToLast = react.useCallback(() => goToPage(totalPages), [goToPage, totalPages]);
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
  const [sort, setSort] = react.useState(
    options.initialKey ? { direction: options.initialDirection ?? "asc", key: options.initialKey } : null
  );
  const handleSort = react.useCallback((key) => {
    setSort((prev) => {
      if (prev?.key === key) {
        return prev.direction === "asc" ? { direction: "desc", key } : null;
      }
      return { direction: "asc", key };
    });
  }, []);
  return { handleSort, sort };
};

exports.useClickOutside = useClickOutside;
exports.useDebounce = useDebounce;
exports.useLoading = useLoading;
exports.useMediaQuery = useMediaQuery;
exports.useModal = useModal;
exports.useNotifications = useNotifications;
exports.usePagination = usePagination;
exports.useTableSort = useTableSort;
//# sourceMappingURL=chunk-BNRFVIDY.cjs.map
//# sourceMappingURL=chunk-BNRFVIDY.cjs.map