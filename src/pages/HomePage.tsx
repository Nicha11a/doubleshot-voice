import { useState } from 'react';
import { ArrowRight, Coffee } from 'lucide-react';
import { FeedbackItem, PageId } from '../types/feedback';

interface HomePageProps {
  feedbacks: FeedbackItem[];
  onNavigate: (page: PageId) => void;
}

const HERO_IMAGE_URL = '/src/assets/images/coffee_craft_latte_1794945417145.jpg';

export function HomePage({ feedbacks, onNavigate }: HomePageProps) {
  const [imageError, setImageError] = useState(false);

  const totalCount = feedbacks.length;
  const resolvedCount = feedbacks.filter((f) => f.status === 'ดำเนินการแล้ว').length;
  const averageRating =
    totalCount > 0
      ? (feedbacks.reduce((sum, item) => sum + item.rating, 0) / totalCount).toFixed(1)
      : '0.0';

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <section className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col justify-center lg:col-span-6">
          <p className="text-sm font-medium text-[#7C5B46]">
            Doubleshot X Khonkaen
          </p>

          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-[#2C1A10] sm:text-5xl">
            Doubleshot Voice
          </h1>

          <p className="mt-4 text-xl font-semibold leading-snug text-[#4A2C1D] sm:text-2xl">
            ยินดีต้อนรับสู่พื้นที่รับฟังทุกความประทับใจและข้อเสนอแนะจากคุณ
          </p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#5A4234]">
            ระบบรับความคิดเห็นและข้อร้องเรียนสำหรับลูกค้า Doubleshot X Khonkaen
            เพื่อส่งต่อเสียงสะท้อนเรื่องรสชาติ เครื่องดื่ม การบริการ และบรรยากาศร้าน
            ให้ทีมพนักงานตรวจสอบและนำไปพัฒนาอย่างเป็นระบบ
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <button
              type="button"
              onClick={() => onNavigate('submit')}
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#4A2C1D] px-7 py-3.5 text-base font-semibold text-white whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 hover:bg-[#361F14] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2C1D] min-h-[48px]"
            >
              <span>แสดงความคิดเห็น</span>
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center justify-center rounded-xl border border-[#D8CBB9] bg-white px-5 py-3.5 text-sm font-medium text-[#4A2C1D] whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 hover:bg-[#F3ECE2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2C1D] min-h-[48px]"
            >
              สำหรับพนักงาน: ตรวจสอบความคิดเห็น
            </button>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#E6DDD0] bg-[#EFE7DC] lg:h-full lg:aspect-auto lg:min-h-[380px]">
            {!imageError ? (
              <img
                src={HERO_IMAGE_URL}
                alt="กาแฟลาเต้สูตรพิเศษของร้าน Doubleshot X Khonkaen บนโต๊ะไม้โทนอบอุ่น"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#F3ECE2] to-[#E5D7C5] p-8 text-center">
                <Coffee className="h-12 w-12 text-[#6F4E37]" aria-hidden="true" />
                <p className="font-display text-xl font-semibold text-[#3B2316]">
                  Doubleshot X Khonkaen
                </p>
                <p className="text-sm text-[#6E5849]">
                  ใส่ใจในทุกแก้วและทุกประสบการณ์ของคุณ
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        aria-label="ภาพรวมความคิดเห็นในระบบ"
        className="mt-12 grid grid-cols-1 divide-y divide-[#E6DDD0] rounded-2xl border border-[#E6DDD0] bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0"
      >
        <div className="px-6 py-5">
          <p className="text-sm text-[#6E5849]">ความคิดเห็นที่ได้รับทั้งหมด</p>
          <p className="mt-1 text-2xl font-bold text-[#2C1A10] tabular-nums">
            {totalCount} รายการ
          </p>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm text-[#6E5849]">คะแนนความพึงพอใจเฉลี่ย</p>
          <p className="mt-1 text-2xl font-bold text-[#2C1A10] tabular-nums">
            {averageRating} / 5.0 ดาว
          </p>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm text-[#6E5849]">ดำเนินการเรียบร้อยแล้ว</p>
          <p className="mt-1 text-2xl font-bold text-[#2C1A10] tabular-nums">
            {resolvedCount} รายการ
          </p>
        </div>
      </section>

      <section className="mt-14 border-t border-[#E6DDD0] pt-12">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-[#2C1A10] sm:text-3xl">
            ใช้งานง่ายใน 3 ขั้นตอน
          </h2>
          <p className="mt-2 text-base text-[#6E5849]">
            ไม่ว่าคุณจะอยากชื่นชมเมนูโปรดหรือแจ้งข้อเสนอแนะเพื่อปรับปรุง
            ทุกข้อความจะส่งตรงถึงทีมงานร้านทันที
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-[#E6DDD0] bg-white p-6">
            <p className="font-mono text-sm font-medium text-[#8C684F] tabular-nums">
              01
            </p>
            <h3 className="mt-2 text-lg font-semibold text-[#2C1A10]">
              ประเมินความพึงพอใจ
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5A4234]">
              กดเลือกระดับความพึงพอใจตั้งแต่ 1 ถึง 5 ดาว
              ตามประสบการณ์จริงที่คุณได้รับในวันนี้
            </p>
          </div>

          <div className="rounded-2xl border border-[#E6DDD0] bg-white p-6">
            <p className="font-mono text-sm font-medium text-[#8C684F] tabular-nums">
              02
            </p>
            <h3 className="mt-2 text-lg font-semibold text-[#2C1A10]">
              เลือกหัวข้อและบอกเล่า
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5A4234]">
              ระบุเรื่องที่ต้องการติชม เช่น รสชาติ เครื่องดื่ม การบริการ พนักงาน
              หรือบรรยากาศร้าน พร้อมรายละเอียดเพิ่มเติม
            </p>
          </div>

          <div className="rounded-2xl border border-[#E6DDD0] bg-white p-6">
            <p className="font-mono text-sm font-medium text-[#8C684F] tabular-nums">
              03
            </p>
            <h3 className="mt-2 text-lg font-semibold text-[#2C1A10]">
              ทีมงานตรวจสอบและติดตาม
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5A4234]">
              พนักงาน Doubleshot X Khonkaen
              จะตรวจสอบรายการและอัปเดตสถานะการแก้ไขอย่างเป็นระบบ
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
