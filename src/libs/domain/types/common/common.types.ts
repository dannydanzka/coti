/**
 * Common Types
 *
 * Shared type definitions used across both admin and public applications.
 * These types represent common concepts that both domains understand.
 *
 */

export type SortOrder = 'asc' | 'desc';

export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';

export type ActivityType =
  | 'create'
  | 'update'
  | 'delete'
  | 'approve'
  | 'reject'
  | 'suspend'
  | 'activate'
  | 'user_registration';

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface SortParams {
  sortBy: string;
  sortOrder: SortOrder;
}

export interface DateRange {
  from: Date;
  to: Date;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

export interface ApiResponse<T = unknown> {
  data: T;
  error?: string;
  metadata?: {
    lastUpdated: string;
    [key: string]: unknown;
  };
  success: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface BulkOperation<T = unknown> {
  operation: 'create' | 'update' | 'delete';
  items: T[];
  options?: Record<string, unknown>;
}

export interface FilterParams {
  [key: string]: string | number | boolean | string[] | number[] | boolean[] | null | undefined;
}

export interface SearchParams {
  query: string;
  filters?: FilterParams;
  sortParams?: SortParams;
  paginationParams?: PaginationParams;
}

export type UserRole = 'owner' | 'admin' | 'participant';

export type PrismaUserRole = 'ADMIN' | 'OWNER' | 'PARTICIPANT';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export type KitStatus = 'pending' | 'sent' | 'delivered';

export type ShippingType = 'pickup_point' | 'home_delivery';

export type ChallengeType = 'STANDARD' | 'CLOSURE';

export type EvidenceType = 'PHOTO' | 'VIDEO' | 'TEXT';

export interface ApiRouteContext {
  params: Promise<{ id: string }>;
}

export type FaqCategory = 'general' | 'eventos' | 'kits' | 'pagos';

export interface FaqEntity {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory | null;
  order: number;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFaqRequest {
  question: string;
  answer: string;
  category?: FaqCategory;
  order?: number;
  isActive?: boolean;
}

export interface UpdateFaqRequest {
  id: string;
  question?: string;
  answer?: string;
  category?: FaqCategory | null;
  order?: number;
  isActive?: boolean;
}

export interface FaqFilters {
  category?: FaqCategory;
  isActive?: boolean;
  searchTerm?: string;
}

export interface FaqListResponse {
  items: FaqEntity[];
  total: number;
}

export type GalleryCategory = 'eventos' | 'equipo' | 'kits' | 'comunidad';

export type GalleryMediaType = 'image' | 'video';

export interface GalleryImageEntity {
  id: string;
  eventId: string | null;
  title: string;
  description: string | null;
  imageUrl: string;
  mediaType: GalleryMediaType;
  category: GalleryCategory | null;
  order: number;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGalleryImageRequest {
  eventId?: string;
  title: string;
  description?: string;
  imageUrl: string;
  mediaType?: GalleryMediaType;
  category?: GalleryCategory;
  order?: number;
  isActive?: boolean;
}

export interface UpdateGalleryImageRequest {
  id: string;
  eventId?: string | null;
  title?: string;
  description?: string | null;
  imageUrl?: string;
  mediaType?: GalleryMediaType;
  category?: GalleryCategory | null;
  order?: number;
  isActive?: boolean;
}

export interface GalleryFilters {
  eventId?: string;
  category?: GalleryCategory;
  isActive?: boolean;
  searchTerm?: string;
}

export interface GalleryListResponse {
  items: GalleryImageEntity[];
  total: number;
}

export type SponsorSocialLinkType =
  | 'website'
  | 'instagram'
  | 'facebook'
  | 'linkedin'
  | 'twitter'
  | 'youtube'
  | 'tiktok'
  | 'whatsapp'
  | 'email'
  | 'other';

export interface SponsorSocialLink {
  type: SponsorSocialLinkType;
  url: string;
  label?: string;
}

export interface SponsorEntity {
  id: string;
  name: string;
  slug: string;
  description: string;
  logoUrl: string;
  logoAlt: string;
  socialLinks: SponsorSocialLink[];
  partnerSince: Date | null;
  order: number;
  isActive: boolean;
  internalNotes: string | null;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface PublicSponsor {
  id: string;
  name: string;
  slug: string;
  description: string;
  logoUrl: string;
  logoAlt: string;
  socialLinks: SponsorSocialLink[];
  partnerSince: Date | null;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSponsorRequest {
  name: string;
  description: string;
  logoUrl: string;
  logoAlt: string;
  socialLinks?: SponsorSocialLink[];
  partnerSince?: Date;
  order?: number;
  isActive?: boolean;
  internalNotes?: string;
}

export interface UpdateSponsorRequest {
  id: string;
  name?: string;
  description?: string;
  logoUrl?: string;
  logoAlt?: string;
  socialLinks?: SponsorSocialLink[];
  partnerSince?: Date | null;
  order?: number;
  isActive?: boolean;
  internalNotes?: string | null;
}

export interface SponsorFilters {
  isActive?: boolean;
  searchTerm?: string;
  includeDeleted?: boolean;
}

export interface SponsorListResponse {
  items: SponsorEntity[];
  total: number;
}

export interface PublicSponsorListResponse {
  items: PublicSponsor[];
  total: number;
}
