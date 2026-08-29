/**
 * Prisma Error Translation
 *
 * Shared Prisma error-to-Spanish message translation.
 * Used by both api-error-handler (API routes) and use-case-error-handler (use cases).
 */

/**
 * Translates Prisma/infrastructure errors to user-friendly Spanish messages.
 * Technical details are logged server-side; only safe messages reach the client.
 *
 * @returns Translated message, or null if the error is not a recognized Prisma error.
 */
export const translatePrismaError = (error: Error): string | null => {
  const msg = error.message;

  if (msg.includes('too long for the column')) {
    return 'El contenido enviado excede el tamaño máximo permitido. Intenta con menos archivos o un texto más corto.';
  }

  if (msg.includes('Unique constraint failed')) {
    if (msg.includes('email')) return 'Ya existe un registro con este correo electrónico.';
    if (msg.includes('slug')) return 'Ya existe un registro con este identificador.';
    return 'Ya existe un registro con estos datos. No se permiten duplicados.';
  }

  if (msg.includes('Record to update not found') || msg.includes('P2025')) {
    return 'El registro que intentas modificar ya no existe.';
  }

  if (msg.includes('Foreign key constraint failed') || msg.includes('P2003')) {
    return 'No se puede completar la operación porque hay registros relacionados.';
  }

  if (msg.includes('Invalid') && msg.includes('invocation')) {
    return 'Error al procesar los datos. Verifica la información e intenta de nuevo.';
  }

  return null;
};
