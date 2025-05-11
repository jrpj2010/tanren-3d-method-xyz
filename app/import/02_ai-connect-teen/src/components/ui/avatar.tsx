import * as React from "react";
import { cn, getInitials, stringToColor } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away' | 'busy' | null;
}

export function Avatar({
  className,
  src,
  alt = "",
  fallback,
  size = 'md',
  status,
  ...props
}: AvatarProps) {
  const [hasError, setHasError] = React.useState(false);

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const statusSizeClasses = {
    sm: "h-2 w-2",
    md: "h-2.5 w-2.5",
    lg: "h-3 w-3",
    xl: "h-3.5 w-3.5",
  };

  const statusColorClasses = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
    busy: "bg-red-500",
  };

  // fallbackがない場合は、altからイニシャルを生成
  const initials = fallback || getInitials(alt);
  // イニシャルの背景色をランダムに生成
  const bgColor = stringToColor(alt || 'default');

  return (
    <div className={cn("relative", className)} {...props}>
      <div 
        className={cn(
          "shrink-0 rounded-full flex items-center justify-center overflow-hidden",
          sizeClasses[size]
        )}
        style={{
          backgroundColor: !src || hasError ? bgColor : undefined,
        }}
      >
        {(!src || hasError) ? (
          <span className="text-white font-medium text-sm">
            {initials.slice(0, 2)}
          </span>
        ) : (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setHasError(true)}
          />
        )}
      </div>
      {status && (
        <span 
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-gray-800",
            statusSizeClasses[size],
            statusColorClasses[status]
          )}
        />
      )}
    </div>
  );
}
