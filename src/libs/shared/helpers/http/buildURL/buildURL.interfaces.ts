/**
 * BuildURL Component Interfaces
 *
 * Interfaces specific to the buildURL helper component.
 */

export interface BuildURLParams {
  endpoint: string;
  extraCustomQuery?: string;
  params?: Record<string, string>;
  query?: Record<string, string | number | boolean | string[]>;
  url: string;
}
