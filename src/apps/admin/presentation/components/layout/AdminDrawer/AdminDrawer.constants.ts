/**
 * AdminDrawer Constants
 */

import {
  BookOpen,
  Calendar,
  CheckSquare,
  ClipboardList,
  CreditCard,
  DollarSign,
  Flag,
  HelpCircle,
  Home,
  Image,
  Mail,
  MailOpen,
  MapPin,
  Package,
  Send,
  Ticket,
  Truck,
  Users,
} from 'lucide-react';
import { createElement } from 'react';

import type { AdminNavigationItem } from './AdminDrawer.interfaces';

export const ADMIN_NAVIGATION_ITEMS: AdminNavigationItem[] = [
  {
    href: '/admin',
    icon: createElement(Home),
    id: 'dashboard',
    label: 'Dashboard',
  },
  {
    href: '/admin/events',
    icon: createElement(Calendar),
    id: 'events',
    label: 'Eventos',
  },
  {
    href: '/admin/enrollments',
    icon: createElement(ClipboardList),
    id: 'enrollments',
    label: 'Inscripciones',
  },
  {
    href: '/admin/kits',
    icon: createElement(Package),
    id: 'kits',
    label: 'Kits',
  },
  {
    href: '/admin/evidences',
    icon: createElement(CheckSquare),
    id: 'evidences',
    label: 'Evidencias',
  },
  {
    href: '/admin/deliveries',
    icon: createElement(Truck),
    id: 'deliveries',
    label: 'Entregas',
  },
  {
    href: '/admin/payments',
    icon: createElement(CreditCard),
    id: 'payments',
    label: 'Pagos',
  },
  {
    href: '/admin/digital-purchases',
    icon: createElement(DollarSign),
    id: 'digital-purchases',
    label: 'Compras digitales',
  },
  {
    href: '/admin/meets',
    icon: createElement(MapPin),
    id: 'meets',
    label: 'Encuentros',
  },
  {
    href: '/admin/meet-orders',
    icon: createElement(Ticket),
    id: 'meet-orders',
    label: 'Pedidos Mango',
  },
  {
    href: '/admin/shipments',
    icon: createElement(Send),
    id: 'shipments',
    label: 'Envíos',
  },
  {
    href: '/admin/contacts',
    icon: createElement(Mail),
    id: 'contacts',
    label: 'Mensajes',
  },
  {
    href: '/admin/letters',
    icon: createElement(MailOpen),
    id: 'letters',
    label: 'Cartas',
  },
  {
    href: '/admin/faq',
    icon: createElement(HelpCircle),
    id: 'faq',
    label: 'Preguntas Frecuentes',
  },
  /**
   * Books admin nav is intentionally NOT gated by NEXT_PUBLIC_FEATURE_BOOKS:
   * admin must be able to prepare the catalog before the participant flag is enabled.
   * Participant nav (AppDrawer) IS gated. See docs/business/BOOKS-MODULE.md.
   */
  {
    href: '/admin/books',
    icon: createElement(BookOpen),
    id: 'books',
    label: 'Libros',
  },
  {
    href: '/admin/gallery',
    icon: createElement(Image),
    id: 'gallery',
    label: 'Galería',
  },
  {
    href: '/admin/users',
    icon: createElement(Users),
    id: 'users',
    label: 'Usuarios',
  },
  {
    href: '/admin/feature-flags',
    icon: createElement(Flag),
    id: 'feature-flags',
    label: 'Banderas',
  },
];

export const DRAWER_UI_TEXT = {
  ADMIN: 'Administrador',
  CLOSE: 'Cerrar menú',
  LOGOUT: 'Cerrar Sesión',
  OWNER: 'Propietario',
} as const;
