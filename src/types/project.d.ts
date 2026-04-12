import type { IconName } from '@src/types/icon';

export interface Project {
  name: string;
  subtitle: string;
  description: string;
  repo: string;
  tags: string[];
  icons: IconName[];
}
