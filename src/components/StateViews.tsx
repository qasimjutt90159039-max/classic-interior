import React from 'react';
import { RotateCw, AlertTriangle, Inbox } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading catalog specifications...' }) => {
  return (
    <div className="py-24 px-6 flex flex-col items-center justify-center text-center">
      <div className="w-12 h-[1px] bg-[#111111] animate-pulse mb-6"></div>
      <span className="text-xs uppercase tracking-[0.25em] text-[#8A8A86] font-light">
        {message}
      </span>
    </div>
  );
};

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No items found',
  description = 'No catalog records have been registered at this time.',
  actionText,
  onAction,
}) => {
  return (
    <div className="py-20 px-6 border border-dashed border-[#E7E7E5] bg-[#FAF9F7]/60 text-center max-w-xl mx-auto my-8">
      <Inbox className="w-8 h-8 text-[#8A8A86] mx-auto mb-4 stroke-1" />
      <h4 className="font-serif-display text-xl text-[#111111] mb-2">{title}</h4>
      <p className="text-xs text-[#8A8A86] leading-relaxed max-w-sm mx-auto mb-6">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 border border-[#111111] text-xs uppercase tracking-widest text-[#111111] hover:bg-[#111111] hover:text-[#FFFFFF] transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Unable to connect to the showroom server.',
  onRetry,
}) => {
  return (
    <div className="py-16 px-6 border border-red-200 bg-red-50/40 text-center max-w-md mx-auto my-8">
      <AlertTriangle className="w-7 h-7 text-red-600 mx-auto mb-3" />
      <h4 className="font-serif-display text-lg text-[#111111] mb-1">Data Retrieval Interrupted</h4>
      <p className="text-xs text-red-700/80 mb-5">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-[#111111] text-[#FFFFFF] text-xs uppercase tracking-wider hover:bg-[#252525] transition-colors"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Retry Connection</span>
        </button>
      )}
    </div>
  );
};
