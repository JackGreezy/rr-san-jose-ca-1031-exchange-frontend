export type Slug = string;

export interface ServiceItem {
  slug: Slug;
  name: string;
  short: string;
  route: Slug;
  category?: string;
}

export interface LocationItem {
  slug: Slug;
  name: string;
  parent?: Slug;
  route: Slug;
  type: "city" | "neighborhood" | "suburb" | "district" | "remote";
  heroImage?: string;
}

export interface PropertyTypeItem {
  slug: Slug;
  name: string;
  route: Slug;
  heroImage?: string;
}

export interface InventoryCategory {
  slug: Slug;
  name: string;
  route: Slug;
  note?: string;
  heroImage?: string;
}

export interface ResourceLink {
  key: string;
  label: string;
  href: string;
}

export interface PageLayoutVariant {
  key: string;
  label: string;
  description: string;
  sections: string[];
  features?: {
    toc?: boolean;
    stickyCta?: boolean;
    sidebar?: boolean;
    heroStyle?: "image" | "gradient" | "map" | "abstract";
    schema?: string[];
  };
}

export interface LayoutAssignments {
  services: Record<string, string>;
  locations: Record<string, string>;
}


