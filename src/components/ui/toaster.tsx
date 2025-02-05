import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className={cn(
              "border border-gray-800 bg-[#262626] text-white",
              "data-[state=open]:animate-in",
              "data-[state=closed]:animate-out",
              "data-[swipe=end]:animate-out",
              "data-[state=closed]:fade-out-80",
              "data-[state=closed]:slide-out-to-right-full",
              "data-[state=open]:slide-in-from-top-full",
              "data-[state=open]:sm:slide-in-from-bottom-full"
            )}
          >
            <div className="grid gap-1">
              {title && <ToastTitle className="text-white">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-gray-300">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="text-gray-400 hover:text-white" />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
