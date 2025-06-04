export type Badge = {
  id: string;
  type: string;
  icon: string;
  title: string;
  description: string;
  lore: string;
};

export type BadgeGrouped = Record<string, Badge[]>;
