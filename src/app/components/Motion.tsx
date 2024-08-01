"use client";

import { motion, MotionProps as FramerMotionProps } from "framer-motion";
import React from "react";

interface MotionProps extends Omit<FramerMotionProps, "ref"> {
  type?: keyof typeof motion;
  children: React.ReactNode;
  className?: string;
}

export const Motion: React.FC<MotionProps> = ({
  type,
  children,
  className,
  ...props
}) => {
  const Component = type ? motion[type] : motion.div;

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};
