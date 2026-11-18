import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageId } from '../types/feedback';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'หน้าแรก' },
  { id: 'submit', label: 'แสดงความคิดเห็น' },
  { id: 'dashboard', label: 'แดชบอร์ดพนักงาน' },
];

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectPage = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#E6DDD0] bg-[#FAF6F0]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => handleSelectPage('home')}
          className="font-display text-xl font-bold tracking-tight text-[#3B2316] whitespace-nowrap shrink-0 cursor-pointer rounded-md py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2C1D]"
        >
          Doubleshot Voice
        </button>

        <nav
          aria-label="เมนูหลัก"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6E5849]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectPage(item.id)}
                className={`relative py-2 whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A2C1D] ${
                  isActive
                    ? 'font-semibold text-[#3B2316]'
                    : 'text-[#6E5849] hover:text-[#3B2316]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-[#4A2C1D]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelectPage('submit')}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#4A2C1D] px-4 py-2 text-sm font-medium text-white whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 hover:bg-[#361F14] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2C1D] min-h-[40px]"
          >
            แสดงความคิดเห็น
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'ปิดเมนูนำทาง' : 'เปิดเมนูนำทาง'}
            className="inline-flex md:hidden items-center justify-center rounded-lg border border-[#DED2C2] bg-white p-2.5 text-[#3B2316] cursor-pointer transition-colors duration-150 hover:bg-[#F3ECE2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2C1D] min-h-[44px] min-w-[44px]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[#E6DDD0] bg-[#FAF6F0] px-4 py-3 md:hidden">
          <nav aria-label="เมนูนำทางมือถือ" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectPage(item.id)}
                  className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-base font-medium cursor-pointer transition-colors duration-150 min-h-[44px] ${
                    isActive
                      ? 'bg-[#4A2C1D] text-white'
                      : 'text-[#3B2316] hover:bg-[#EFE7DC]'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
