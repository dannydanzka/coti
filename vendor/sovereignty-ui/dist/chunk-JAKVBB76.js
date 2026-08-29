// src/utils/array.ts
var unique = (arr) => [...new Set(arr)];
var uniqueBy = (arr, key) => {
  const seen = /* @__PURE__ */ new Set();
  return arr.filter((item) => {
    const val = item[key];
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
};
var groupBy = (arr, key) => arr.reduce((groups, item) => {
  const groupKey = String(item[key]);
  const group = groups[groupKey] ?? [];
  group.push(item);
  groups[groupKey] = group;
  return groups;
}, {});
var sortBy = (arr, key, direction = "asc") => [...arr].sort((a, b) => {
  const valA = a[key];
  const valB = b[key];
  if (valA < valB) return direction === "asc" ? -1 : 1;
  if (valA > valB) return direction === "asc" ? 1 : -1;
  return 0;
});
var chunk = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

// src/utils/date.ts
var formatDate = (date, locale = "en-US") => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
};
var formatDateTime = (date, locale = "en-US") => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString(locale, {
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    year: "numeric"
  });
};
var formatRelative = (date) => {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = /* @__PURE__ */ new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1e3);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)}w ago`;
  if (diffDay < 365) return `${Math.floor(diffDay / 30)}mo ago`;
  return `${Math.floor(diffDay / 365)}y ago`;
};
var diffInDays = (dateA, dateB) => {
  const a = typeof dateA === "string" ? new Date(dateA) : dateA;
  const b = typeof dateB === "string" ? new Date(dateB) : dateB;
  return Math.floor((b.getTime() - a.getTime()) / (1e3 * 60 * 60 * 24));
};
var isExpired = (date) => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.getTime() < Date.now();
};

// src/utils/format.ts
var formatCurrency = (amount, currency = "USD", locale = "en-US") => new Intl.NumberFormat(locale, { currency, style: "currency" }).format(amount);
var formatNumber = (value, locale = "en-US") => new Intl.NumberFormat(locale).format(value);
var formatCompact = (value, locale = "en-US") => new Intl.NumberFormat(locale, { notation: "compact" }).format(value);
var formatPercentage = (value, decimals = 0) => `${(value * 100).toFixed(decimals)}%`;
var formatBytes = (bytes) => {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
};
var formatPhone = (phone) => {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
};

// src/utils/object.ts
var pick = (obj, keys) => {
  const result = {};
  for (const key of keys) {
    if (key in obj) result[key] = obj[key];
  }
  return result;
};
var omit = (obj, keys) => {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
};
var isEmpty = (value) => {
  if (value === null || value === void 0) return true;
  if (typeof value === "string") return value.length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
};
var deepMerge = (target, source) => {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    const sourceVal = source[key];
    const targetVal = target[key];
    if (sourceVal !== null && typeof sourceVal === "object" && !Array.isArray(sourceVal) && targetVal !== null && typeof targetVal === "object" && !Array.isArray(targetVal)) {
      result[key] = deepMerge(
        targetVal,
        sourceVal
      );
    } else {
      result[key] = sourceVal;
    }
  }
  return result;
};

// src/utils/string.ts
var truncate = (str, maxLength, suffix = "...") => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
};
var capitalize = (str) => {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
var capitalizeWords = (str) => str.split(" ").map(capitalize).join(" ");
var slugify = (str) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
var pluralize = (count, singular, plural) => {
  if (count === 1) return singular;
  return plural ?? `${singular}s`;
};
var initials = (name, maxChars = 2) => name.split(" ").filter(Boolean).map((word) => word.charAt(0).toUpperCase()).slice(0, maxChars).join("");

export { capitalize, capitalizeWords, chunk, deepMerge, diffInDays, formatBytes, formatCompact, formatCurrency, formatDate, formatDateTime, formatNumber, formatPercentage, formatPhone, formatRelative, groupBy, initials, isEmpty, isExpired, omit, pick, pluralize, slugify, sortBy, truncate, unique, uniqueBy };
//# sourceMappingURL=chunk-JAKVBB76.js.map
//# sourceMappingURL=chunk-JAKVBB76.js.map