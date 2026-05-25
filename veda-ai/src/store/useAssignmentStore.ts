import { create } from 'zustand';

export interface Assignment {
  id: string;
  title: string;
  assignedOn: string;
  due: string;
}

interface AssignmentStore {
  assignments: Assignment[];
  addAssignment: (assignment: Assignment) => void;
  deleteAssignment: (id: string) => void;
  setEmpty: () => void;
  fillMock: () => void;
}

const mockData = [
  { id: '1', title: 'Quiz on Electricity', assignedOn: '20-06-2025', due: '21-06-2025' },
  { id: '2', title: 'Quiz on Electricity', assignedOn: '20-06-2025', due: '21-06-2025' },
  { id: '3', title: 'Quiz on Electricity', assignedOn: '20-06-2025', due: '21-06-2025' },
  { id: '4', title: 'Quiz on Electricity', assignedOn: '20-06-2025', due: '21-06-2025' },
  { id: '5', title: 'Quiz on Electricity', assignedOn: '20-06-2025', due: '21-06-2025' },
  { id: '6', title: 'Quiz on Electricity', assignedOn: '20-06-2025', due: '21-06-2025' },
];

export const useAssignmentStore = create<AssignmentStore>((set) => ({
  assignments: mockData,
  addAssignment: (assignment) => set((state) => ({ assignments: [...state.assignments, assignment] })),
  deleteAssignment: (id) => set((state) => ({ assignments: state.assignments.filter(a => a.id !== id) })),
  setEmpty: () => set({ assignments: [] }),
  fillMock: () => set({ assignments: mockData }),
}));
