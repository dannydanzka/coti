/**
 * AdminSidebar Constants
 */

import {
  BookOpen,
  Calendar,
  CheckSquare,
  ClipboardList,
  CreditCard,
  DollarSign,
  Flag,
  Handshake,
  HelpCircle,
  Home,
  Image,
  Mail,
  MailOpen,
  MapPin,
  Package,
  ShoppingBag,
  Target,
  Ticket,
  Truck,
  Users,
} from 'lucide-react';
import { createElement } from 'react';

import type { AdminNavItem } from './AdminSidebar.interfaces';

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    href: '/admin',
    icon: createElement(Home, { size: 20 }),
    id: 'dashboard',
    label: 'Dashboard',
  },
  {
    href: '/admin/events',
    icon: createElement(Calendar, { size: 20 }),
    id: 'events',
    label: 'Eventos',
  },
  {
    href: '/admin/challenges',
    icon: createElement(Target, { size: 20 }),
    id: 'challenges',
    label: 'Retos',
  },
  {
    href: '/admin/enrollments',
    icon: createElement(ClipboardList, { size: 20 }),
    id: 'enrollments',
    label: 'Inscripciones',
  },
  {
    href: '/admin/users',
    icon: createElement(Users, { size: 20 }),
    id: 'users',
    label: 'Usuarios',
  },
  {
    href: '/admin/kits',
    icon: createElement(ShoppingBag, { size: 20 }),
    id: 'kits',
    label: 'Kits',
  },
  {
    href: '/admin/deliveries',
    icon: createElement(Package, { size: 20 }),
    id: 'deliveries',
    label: 'Entregas',
  },
  {
    href: '/admin/evidences',
    icon: createElement(CheckSquare, { size: 20 }),
    id: 'evidences',
    label: 'Evidencias',
  },
  {
    href: '/admin/payments',
    icon: createElement(CreditCard, { size: 20 }),
    id: 'payments',
    label: 'Pagos',
  },
  {
    href: '/admin/digital-purchases',
    icon: createElement(DollarSign, { size: 20 }),
    id: 'digital-purchases',
    label: 'Compras digitales',
  },
  {
    href: '/admin/meets',
    icon: createElement(MapPin, { size: 20 }),
    id: 'meets',
    label: 'Encuentros',
  },
  {
    href: '/admin/meet-orders',
    icon: createElement(Ticket, { size: 20 }),
    id: 'meet-orders',
    label: 'Pedidos Mango',
  },
  {
    href: '/admin/shipments',
    icon: createElement(Truck, { size: 20 }),
    id: 'shipments',
    label: 'Envíos',
  },
  {
    href: '/admin/contacts',
    icon: createElement(Mail, { size: 20 }),
    id: 'contacts',
    label: 'Mensajes',
  },
  {
    href: '/admin/letters',
    icon: createElement(MailOpen, { size: 20 }),
    id: 'letters',
    label: 'Cartas',
  },
  {
    href: '/admin/faq',
    icon: createElement(HelpCircle, { size: 20 }),
    id: 'faq',
    label: 'FAQ',
  },
  /**
   * Books admin nav is intentionally NOT gated by NEXT_PUBLIC_FEATURE_BOOKS:
   * admin must be able to prepare the catalog before the participant flag is enabled.
   * Participant nav (AppDrawer) IS gated. See docs/business/BOOKS-MODULE.md.
   */
  {
    href: '/admin/books',
    icon: createElement(BookOpen, { size: 20 }),
    id: 'books',
    label: 'Libros',
  },
  {
    href: '/admin/gallery',
    icon: createElement(Image, { size: 20 }),
    id: 'gallery',
    label: 'Galería',
  },
  {
    href: '/admin/sponsors',
    icon: createElement(Handshake, { size: 20 }),
    id: 'sponsors',
    label: 'Aliados',
  },
  {
    href: '/admin/feature-flags',
    icon: createElement(Flag, { size: 20 }),
    id: 'feature-flags',
    label: 'Banderas',
  },
];

export const UI_TEXT = {
  ADMIN: 'Administrador',
  DEFAULT_NAME: 'Admin',
  OWNER: 'Propietario',
} as const;
