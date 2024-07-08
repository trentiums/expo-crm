export interface TabBarProps {
  selectedActiveTab?: string;
  setSelectedTabNav: React.Dispatch<React.SetStateAction<string>>;
  tab: string[];
  selectedTab: (val: string) => void;
  color?: string;
  tabSize?: number;
  tabBackgroundColor?: string;
  selectedTabColor?: string;
  tabWidth?: number;
  radius?: number;
  onTabChange?: (index: number) => void;
  val?: string;
  totalWidth?: number;
  isTabChange?: boolean;
}
