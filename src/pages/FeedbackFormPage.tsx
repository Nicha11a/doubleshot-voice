import { useState, FormEvent } from 'react';
import { ArrowLeft, Check, CheckCircle2, Star } from 'lucide-react';
import {
  FEEDBACK_TOPICS,
  FeedbackItem,
  FeedbackTopic,
  PageId,
  RATING_LABELS,
} from '../types/feedback';
import { StarRatingDisplay } from '../components/FeedbackPrimitives';

interface FeedbackFormPageProps {
  onSubmitFeedback: (data: {
    rating: 1 | 2 | 3 | 4 | 5;
    topics: FeedbackTopic[];
    details: string;
    customerName: string;
  }) => FeedbackItem;
  onNavigate: (page: PageId) => void;
}

export function FeedbackFormPage({
  onSubmitFeedback,
  onNavigate,
}: FeedbackFormPageProps) {
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5 | 0>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedTopics, setSelectedTopics] = useState<FeedbackTopic[]>([]);
  const [details, setDetails] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [errors, setErrors] = useState<{
    rating?: string;
    topics?: string;
    details?: string;
  }>({});
  const [submittedItem, setSubmittedItem] = useState<FeedbackItem | null>(null);

  const toggleTopic = (topic: FeedbackTopic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((item) => item !== topic) : [...prev, topic]
    );
    if (errors.topics) {
      setErrors((prev) => ({ ...prev, topics: undefined }));
    }
  };

  const handleSelectRating = (value: 1 | 2 | 3 | 4 | 5) => {
    setRating(value);
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: undefined }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: {
      rating?: string;
      topics?: string;
      details?: string;
    } = {};

    if (rating === 0) {
      nextErrors.rating = 'กรุณาเลือกคะแนนความพึงพอใจ 1–5 ดาว';
    }
    if (selectedTopics.length === 0) {
      nextErrors.topics = 'กรุณาเลือกหัวข้อความคิดเห็นอย่างน้อย 1 หัวข้อ';
    }
    if (details.trim().length === 0) {
      nextErrors.details = 'กรุณากรอกรายละเอียดเพิ่มเติมเพื่อให้ทีมงานเข้าใจมากยิ่งขึ้น';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const created = onSubmitFeedback({
      rating: rating as 1 | 2 | 3 | 4 | 5,
      topics: selectedTopics,
      details: details.trim(),
      customerName: customerName.trim() || 'ไม่ระบุชื่อ',
    });

    setSubmittedItem(created);
  };

  const handleResetForm = () => {
    setRating(0);
    setHoverRating(0);
    setSelectedTopics([]);
    setDetails('');
    setCustomerName('');
    setErrors({});
    setSubmittedItem(null);
  };

  if (submittedItem) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-14">
        <div className="rounded-2xl border border-[#E6DDD0] bg-white p-6 sm:p-10">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EDF6EE] text-[#15803D]">
              <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-[#2C1A10] sm:text-3xl">
              ส่งความคิดเห็นสำเร็จแล้ว
            </h1>

            <p className="mt-2 max-w-md text-base leading-relaxed text-[#5A4234]">
              ขอบคุณที่ร่วมแบ่งปันเสียงสะท้อนให้กับ Doubleshot X Khonkaen
              ทีมงานได้รับข้อมูลของคุณเรียบร้อยแล้ว
            </p>
          </div>

          <div className="mt-8 space-y-3 rounded-xl border border-[#E6DDD0] bg-[#FAF6F0] p-5 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[#6E5849]">รหัสอ้างอิง</span>
              <span className="font-mono font-semibold text-[#2C1A10] tabular-nums">
                #{submittedItem.id}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[#6E5849]">คะแนนความพึงพอใจ</span>
              <div className="flex items-center gap-2">
                <StarRatingDisplay rating={submittedItem.rating} />
                <span className="font-semibold text-[#2C1A10] tabular-nums">
                  ({submittedItem.rating}/5)
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[#6E5849]">หัวข้อความคิดเห็น</span>
              <span className="font-medium text-[#2C1A10]">
                {submittedItem.topics.join(' · ')}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[#6E5849]">สถานะการติดตาม</span>
              <span className="font-semibold text-[#B45309]">
                {submittedItem.status}
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={handleResetForm}
              className="inline-flex items-center justify-center rounded-xl bg-[#4A2C1D] px-6 py-3 text-sm font-semibold text-white whitespace-nowrap cursor-pointer transition-colors duration-150 hover:bg-[#361F14] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2C1D] min-h-[46px]"
            >
              ส่งความคิดเห็นเพิ่มเติม
            </button>
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center justify-center rounded-xl border border-[#D8CBB9] bg-white px-6 py-3 text-sm font-medium text-[#3B2316] whitespace-nowrap cursor-pointer transition-colors duration-150 hover:bg-[#F3ECE2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2C1D] min-h-[46px]"
            >
              ดูในแดชบอร์ดพนักงาน
            </button>
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-medium text-[#6E5849] whitespace-nowrap cursor-pointer transition-colors duration-150 hover:text-[#2C1A10] min-h-[46px]"
            >
              กลับหน้าแรก
            </button>
          </div>
        </div>
      </div>
    );
  }

  const displayedRating = hoverRating || rating;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#6E5849] cursor-pointer transition-colors hover:text-[#2C1A10] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2C1D] py-1"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        <span>กลับหน้าแรก</span>
      </button>

      <div className="rounded-2xl border border-[#E6DDD0] bg-white p-6 sm:p-10">
        <div>
          <p className="text-sm font-medium text-[#7C5B46]">
            Doubleshot X Khonkaen
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#2C1A10] sm:text-3xl">
            ส่งความคิดเห็นและข้อเสนอแนะ
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#6E5849] sm:text-base">
            กรอกข้อมูลด้านล่างเพื่อช่วยให้เราพัฒนาเครื่องดื่มและการบริการให้ดียิ่งขึ้น
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-8">
          <div>
            <label className="block text-base font-semibold text-[#2C1A10]">
              1. ประเมินความพึงพอใจของคุณ <span className="text-[#B91C1C]">*</span>
            </label>
            <p className="mt-1 text-sm text-[#6E5849]">
              แตะที่รูปดาวตั้งแต่ 1 ถึง 5 ดาว
            </p>

            <div
              className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3"
              onMouseLeave={() => setHoverRating(0)}
            >
              {([1, 2, 3, 4, 5] as const).map((value) => {
                const isActive = value <= displayedRating;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleSelectRating(value)}
                    onMouseEnter={() => setHoverRating(value)}
                    aria-label={`ให้คะแนน ${value} ดาว: ${RATING_LABELS[value]}`}
                    aria-pressed={rating === value}
                    className={`flex h-13 w-13 items-center justify-center rounded-xl border cursor-pointer transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2C1D] ${
                      isActive
                        ? 'border-[#C9843B] bg-[#FDF7EF]'
                        : 'border-[#E6DDD0] bg-[#FAF6F0] hover:border-[#CBBBA6]'
                    }`}
                  >
                    <Star
                      className={`h-7 w-7 transition-colors duration-150 ${
                        isActive
                          ? 'fill-[#B46927] text-[#B46927]'
                          : 'fill-transparent text-[#B8A592]'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-2.5 min-h-[24px]">
              {displayedRating > 0 ? (
                <p className="text-sm font-medium text-[#4A2C1D] tabular-nums">
                  {displayedRating} ดาว —{' '}
                  {RATING_LABELS[displayedRating as 1 | 2 | 3 | 4 | 5]}
                </p>
              ) : (
                <p className="text-sm text-[#8C7463]">ยังไม่ได้เลือกคะแนน</p>
              )}
            </div>

            {errors.rating && (
              <p role="alert" className="mt-1 text-sm font-medium text-[#B91C1C]">
                {errors.rating}
              </p>
            )}
          </div>

          <div>
            <label className="block text-base font-semibold text-[#2C1A10]">
              2. หัวข้อความคิดเห็น <span className="text-[#B91C1C]">*</span>
            </label>
            <p className="mt-1 text-sm text-[#6E5849]">
              เลือกได้มากกว่า 1 หัวข้อที่เกี่ยวข้องกับประสบการณ์ของคุณ
            </p>

            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {FEEDBACK_TOPICS.map((topic) => {
                const isSelected = selectedTopics.includes(topic);
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => toggleTopic(topic)}
                    aria-pressed={isSelected}
                    className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium whitespace-nowrap cursor-pointer transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2C1D] min-h-[46px] ${
                      isSelected
                        ? 'border-[#4A2C1D] bg-[#4A2C1D] text-white'
                        : 'border-[#DED2C2] bg-[#FAF6F0] text-[#3B2316] hover:bg-[#EFE7DC]'
                    }`}
                  >
                    {isSelected && <Check className="h-4 w-4 shrink-0" aria-hidden="true" />}
                    <span>{topic}</span>
                  </button>
                );
              })}
            </div>

            {errors.topics && (
              <p role="alert" className="mt-2 text-sm font-medium text-[#B91C1C]">
                {errors.topics}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="feedback-details"
              className="block text-base font-semibold text-[#2C1A10]"
            >
              3. รายละเอียดเพิ่มเติม <span className="text-[#B91C1C]">*</span>
            </label>
            <p className="mt-1 text-sm text-[#6E5849]">
              บอกเล่าสิ่งที่ประทับใจ เมนูที่สั่ง หรือจุดที่อยากให้ร้านปรับปรุง
            </p>

            <textarea
              id="feedback-details"
              rows={4}
              value={details}
              onChange={(e) => {
                setDetails(e.target.value);
                if (errors.details) {
                  setErrors((prev) => ({ ...prev, details: undefined }));
                }
              }}
              placeholder="ตัวอย่าง: วันนี้สั่งลาเต้เย็น รสชาติกลมกล่อมดีมาก แต่ช่วงเที่ยงรอคิวค่อนข้างนานนิดหน่อย..."
              className="mt-3 w-full rounded-xl border border-[#DED2C2] bg-[#FAF6F0] px-4 py-3 text-base text-[#2C1A10] placeholder-[#9B8675] transition-colors focus:border-[#4A2C1D] focus:bg-white focus:outline-none"
            />

            {errors.details && (
              <p role="alert" className="mt-1.5 text-sm font-medium text-[#B91C1C]">
                {errors.details}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="customer-name"
              className="block text-base font-semibold text-[#2C1A10]"
            >
              4. ชื่อของคุณ (ไม่บังคับ)
            </label>
            <input
              id="customer-name"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="ระบุชื่อเล่นหรือเว้นว่างไว้เพื่อส่งแบบไม่ระบุตัวตน"
              className="mt-2 w-full rounded-xl border border-[#DED2C2] bg-[#FAF6F0] px-4 py-3 text-base text-[#2C1A10] placeholder-[#9B8675] transition-colors focus:border-[#4A2C1D] focus:bg-white focus:outline-none min-h-[46px]"
            />
          </div>

          <div className="border-t border-[#EFE7DC] pt-6">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#4A2C1D] px-8 py-3.5 text-base font-semibold text-white whitespace-nowrap cursor-pointer transition-colors duration-150 hover:bg-[#361F14] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2C1D] min-h-[52px] sm:w-auto"
            >
              ส่งความคิดเห็น
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
