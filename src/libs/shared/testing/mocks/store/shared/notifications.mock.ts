/**
 * Notifications Mock Data
 *
 * Mock data for testing notifications system and notification components.
 * Provides different notification states and types.
 */

import type { Notification, PersistentNotification } from '@thunks';

export const mockNotificationsData: Notification[] = [
  {
    displayDuration: 5000,
    id: 'notif_1',
    message: 'Usuario creado exitosamente',
    origin: 'user-management',
    timestamp: Date.now() - 10000,
    type: 'success',
  },
  {
    displayDuration: 3000,
    id: 'notif_2',
    message: 'Error al procesar la solicitud',
    origin: 'api-call',
    timestamp: Date.now() - 5000,
    type: 'error',
  },
  {
    displayDuration: 4000,
    id: 'notif_3',
    message: 'Cambios guardados correctamente',
    origin: 'form-save',
    timestamp: Date.now() - 2000,
    type: 'info',
  },
];

export const mockPersistentNotifications: PersistentNotification[] = [
  {
    dateTime: new Date('2024-06-15T10:30:00Z').toISOString(),
    description: 'Se ha creado un nuevo usuario administrador en el sistema',
    id: 'persistent_1',
    isRead: false,
    timestamp: new Date('2024-06-15T10:30:00Z').getTime(),
    title: 'Nuevo usuario administrador',
    type: 'system',
  },
  {
    dateTime: new Date('2024-06-15T09:15:00Z').toISOString(),
    description: 'El sistema estará en mantenimiento el próximo domingo',
    id: 'persistent_2',
    isRead: true,
    timestamp: new Date('2024-06-15T09:15:00Z').getTime(),
    title: 'Mantenimiento programado',
    type: 'alert',
  },
  {
    dateTime: new Date('2024-06-14T16:45:00Z').toISOString(),
    description: 'Se han actualizado las reglas del concurso actual',
    id: 'persistent_3',
    isRead: false,
    timestamp: new Date('2024-06-14T16:45:00Z').getTime(),
    title: 'Actualización de reglas',
    type: 'system',
  },
];
