export interface LeadsIndicatorItemProps {
  item: LeadItem;
  maxValue: number;
}
interface LeadItem {
  progress: number;
  label: string;
  color: string;
}
