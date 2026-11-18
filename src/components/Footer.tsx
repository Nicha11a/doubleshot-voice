import { PageId } from '../types/feedback';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-[#E6DDD0] bg-[#F5EFE6]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-display text-base font-semibold text-[#3B2316]">
            Doubleshot Voice
          </p>
          <p className="mt-1 text-sm text-[#6E5849]">
            ระบบรับความคิดเห็นและข้อเสนอแนะสำหรับร้านกาแฟ Doubleshot X Khonkaen
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-[#5A4234]">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="cursor-pointer py-1 hover:text-[#2C1A10] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2C1D] whitespace-nowrap"
          >
            หน้าแรก
          </button>
          <button
            type="button"
            onClick={() => onNavigate('submit')}
            className="cursor-pointer py-1 hover:text-[#2C1A10] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2C1D] whitespace-nowrap"
          >
            แสดงความคิดเห็น
          </button>
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="cursor-pointer py-1 hover:text-[#2C1A10] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2C1D] whitespace-nowrap"
          >
            แดชบอร์ดพนักงาน
          </button>
        </div>
      </div>
    </footer>
  );
}
