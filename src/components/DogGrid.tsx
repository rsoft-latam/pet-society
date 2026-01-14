import { ReactNode } from "react";

interface DogGridProps {
  readonly children: ReactNode;
}

export default function DogGrid({ children }: Readonly<DogGridProps>) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {children}
    </div>
  );
}
