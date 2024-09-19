export interface StepperProps {
  stepData: Step[];
  currentId: number;
  setSelectedTabNav?: (id: number) => void;
}
export interface Step {
  id: number;
  title: string;
}
