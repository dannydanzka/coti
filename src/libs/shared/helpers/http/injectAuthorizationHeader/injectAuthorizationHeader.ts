/**
 * Injects authorization header if session token exists
 */
const injectAuthorizationHeader = (
  headers: Record<string, string> = {}
): Record<string, string> => {
  let sessionToken =
    typeof localStorage !== 'undefined' ? localStorage.getItem('auth_token') : null;

  if (sessionToken) {
    sessionToken = sessionToken.replace(/^"(.*)"$/, '$1');
  }

  if (sessionToken) {
    return {
      Authorization: `Bearer ${sessionToken}`,
      ...headers,
    };
  }

  return headers;
};

export { injectAuthorizationHeader };
