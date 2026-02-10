"use client";

import React from "react";
import { cn } from "@/lib/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={cn("relative w-full h-screen overflow-hidden", className)}>
      {children}
    </div>
  );
};

export default Container;
