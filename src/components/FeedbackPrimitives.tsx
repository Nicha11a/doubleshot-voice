import { CheckCircle2, Clock, RefreshCw, Star } from 'lucide-react';
import { FeedbackStatus } from '../types/feedback';

export function StarRatingDisplay({
  rating,
  size = 'sm',
}: {
  rating: number;
  size?: 'sm' | 'md';
}) {
  const iconClass = size === 'md' ? 'h-5 w-5' : 'h-4 w-4';

  return (
    <div
      className="inline-flex items-center gap-1"
      aria-label={`คะแนนความพึงพอใจ ${rating} จาก 5 ดาว`}
    >
      {[1, 2, 3, 4, 5].map((value) => {
        const filled = value <= rating;
        return (
          <Star
            key={value}
            className={`${iconClass} ${
              filled
                ? 'fill-[#B46927] text-[#B46927]'
                : 'fill-transparent text-[#D6C8B8]'
            }`}
          />
        );
      })}
    </div>
  );
}

export function StatusIndicator({ status }: { status: FeedbackStatus }) {
  if (status === 'รอดำเนินการ') {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B45309] whitespace-nowrap shrink-0">
        <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>รอดำเนินการ</span>
      </span>
    );
  }

  if (status === 'กำลังดำเนินการ') {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0369A1] whitespace-nowrap shrink-0">
        <RefreshCw className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>กำลังดำเนินการ</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#15803D] whitespace-nowrap shrink-0">
      <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>ดำเนินการแล้ว</span>
    </span>
  );
}
