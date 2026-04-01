import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Button } from "./Button";
import { cn } from "../../utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  mobileBottomSheet?: boolean;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  mobileBottomSheet = false,
  footer,
}) => {
  
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={
              mobileBottomSheet
                ? { opacity: 0, y: 36 }
                : { opacity: 0, scale: 0.95, y: 20 }
            }
            animate={
              mobileBottomSheet
                ? { opacity: 1, y: 0 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              mobileBottomSheet
                ? { opacity: 0, y: 36 }
                : { opacity: 0, scale: 0.95, y: 20 }
            }
            className={cn(
              "fixed bg-white shadow-2xl z-50 overflow-hidden flex flex-col",
              mobileBottomSheet
                ? "inset-x-0 bottom-0 top-auto rounded-t-3xl max-h-[85vh] md:inset-x-auto md:top-[10%] md:bottom-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg md:max-h-[80vh] md:rounded-3xl"
                : "inset-x-4 top-[10%] rounded-3xl max-h-[80vh] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg",
            )}
          >
            {mobileBottomSheet && (
              <div className="w-12 h-1.5 bg-gray-200 rounded-full self-center mt-3 mb-1 md:hidden" />
            )}
            <div
              className={cn(
                "flex items-center justify-between border-bottom border-gray-100",
                mobileBottomSheet ? "p-4 md:p-6" : "p-6",
              )}
            >
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            <div
              className={cn(
                "overflow-y-auto flex-1",
                mobileBottomSheet ? "p-4 md:p-6" : "p-6",
              )}
            >
              {children}
            </div>
            {footer && (
              <div
                className={cn(
                  "border-t border-gray-100 p-4 md:p-6 bg-white",
                  mobileBottomSheet &&
                    "sticky bottom-0 md:static bg-white/95 backdrop-blur-sm",
                )}
              >
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
