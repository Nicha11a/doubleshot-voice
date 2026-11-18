import { useMemo, useState } from 'react';
import { MessageSquarePlus, RotateCcw, Search, X } from 'lucide-react';
import {
  FEEDBACK_STATUSES,
  FEEDBACK_TOPICS,
  FeedbackItem,
  FeedbackStatus,
  FeedbackTopic,
  PageId,
} from '../types/feedback';
import { formatThaiDateTime } from '../utils/formatThaiDate';
import { StarRatingDisplay, StatusIndicator } from '../components/FeedbackPrimitives';

interface StaffDashboardPageProps {
  feedbacks: FeedbackItem[];
  onUpdateStatus: (id: string, status: FeedbackStatus) => void;
  onUpdateStaffNote: (id: string, note: string) => void;
  onResetSampleData: () => void;
  onNavigate: (page: PageId) => void;
}

type StatusFilter = 'ทั้งหมด' | FeedbackStatus;
type TopicFilter = 'ทุกหัวข้อ' | FeedbackTopic;

export function StaffDashboardPage({
  feedbacks,
  onUpdateStatus,
  onUpdateStaffNote,
  onResetSampleData,
  onNavigate,
}: StaffDashboardPageProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ทั้งหมด');
  const [topicFilter, setTopicFilter] = useState<TopicFilter>('ทุกหัวข้อ');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [resetNotice, setResetNotice] = useState(false);

  const counts = useMemo(() => {
    return {
      all: feedbacks.length,
      pending: feedbacks.filter((item) => item.status === 'รอดำเนินการ').length,
      inProgress: feedbacks.filter((item) => item.status === 'กำลังดำเนินการ').length,
      resolved: feedbacks.filter((item) => item.status === 'ดำเนินการแล้ว').length,
    };
  }, [feedbacks]);

  const filteredFeedbacks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return feedbacks.filter((item) => {
      if (statusFilter !== 'ทั้งหมด' && item.status !== statusFilter) {
        return false;
      }
      if (topicFilter !== 'ทุกหัวข้อ' && !item.topics.includes(topicFilter)) {
        return false;
      }
      if (query.length > 0) {
        const matchesId = item.id.toLowerCase().includes(query);
        const matchesDetails = item.details.toLowerCase().includes(query);
        const matchesName = item.customerName.toLowerCase().includes(query);
        const matchesTopic = item.topics.some((t) =>
          t.toLowerCase().includes(query)
        );
        return matchesId || matchesDetails || matchesName || matchesTopic;
      }
      return true;
    });
  }, [feedbacks, statusFilter, topicFilter, searchQuery]);

  const handleOpenNoteEditor = (item: FeedbackItem) => {
    setEditingNoteId(item.id);
    setNoteDraft(item.staffNote ?? '');
  };

  const handleSaveNote = (id: string) => {
    onUpdateStaffNote(id, noteDraft.trim());
    setEditingNoteId(null);
    setNoteDraft('');
  };

  const handleReset = () => {
    onResetSampleData();
    setStatusFilter('ทั้งหมด');
    setTopicFilter('ทุกหัวข้อ');
    setSearchQuery('');
    setEditingNoteId(null);
    setResetNotice(true);
    window.setTimeout(() => setResetNotice(false), 3000);
  };

  const statusTabs: { label: StatusFilter; count: number }[] = [
    { label: 'ทั้งหมด', count: counts.all },
    { label: 'รอดำเนินการ', count: counts.pending },
    { label: 'กำลังดำเนินการ', count: counts.inProgress },
    { label: 'ดำเนินการแล้ว', count: counts.resolved },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#7C5B46]">
            Doubleshot X Khonkaen · ระบบจัดการสำหรับทีมงาน
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#2C1A10] sm:text-3xl">
            แดชบอร์ดตรวจสอบความคิดเห็น
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DED2C2] bg-white px-4 py-2.5 text-sm font-medium text-[#5A4234] whitespace-nowrap cursor-pointer transition-colors duration-150 hover:bg-[#F3ECE2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2C1D] min-h-[44px]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>คืนค่าข้อมูลตัวอย่าง</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('submit')}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4A2C1D] px-4 py-2.5 text-sm font-semibold text-white whitespace-nowrap cursor-pointer transition-colors duration-150 hover:bg-[#361F14] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2C1D] min-h-[44px]"
          >
            <MessageSquarePlus className="h-4 w-4" aria-hidden="true" />
            <span>เพิ่มความคิดเห็นใหม่</span>
          </button>
        </div>
      </div>

      {resetNotice && (
        <div
          role="status"
          className="mt-4 rounded-xl border border-[#CBE2CE] bg-[#EDF6EE] px-4 py-3 text-sm font-medium text-[#15803D]"
        >
          คืนค่ารายการความคิดเห็นตัวอย่างเรียบร้อยแล้ว
        </div>
      )}

      <section
        aria-label="สรุปสถานะความคิดเห็น"
        className="mt-6 grid grid-cols-2 divide-y divide-[#E6DDD0] rounded-2xl border border-[#E6DDD0] bg-white lg:grid-cols-4 lg:divide-x lg:divide-y-0"
      >
        <div className="px-5 py-4 sm:px-6">
          <p className="text-sm text-[#6E5849]">ความคิดเห็นทั้งหมด</p>
          <p className="mt-1 text-2xl font-bold text-[#2C1A10] tabular-nums">
            {counts.all}
          </p>
        </div>
        <div className="border-l border-[#E6DDD0] px-5 py-4 sm:px-6 lg:border-l-0">
          <p className="text-sm text-[#6E5849]">รอดำเนินการ</p>
          <p className="mt-1 text-2xl font-bold text-[#B45309] tabular-nums">
            {counts.pending}
          </p>
        </div>
        <div className="px-5 py-4 sm:px-6">
          <p className="text-sm text-[#6E5849]">กำลังดำเนินการ</p>
          <p className="mt-1 text-2xl font-bold text-[#0369A1] tabular-nums">
            {counts.inProgress}
          </p>
        </div>
        <div className="border-l border-[#E6DDD0] px-5 py-4 sm:px-6 lg:border-l-0">
          <p className="text-sm text-[#6E5849]">ดำเนินการแล้ว</p>
          <p className="mt-1 text-2xl font-bold text-[#15803D] tabular-nums">
            {counts.resolved}
          </p>
        </div>
      </section>

      <section
        aria-label="ตัวกรองและค้นหาความคิดเห็น"
        className="mt-6 flex flex-col gap-3 rounded-2xl border border-[#E6DDD0] bg-white p-4 sm:p-5"
      >
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
          {statusTabs.map((tab) => {
            const isActive = statusFilter === tab.label;
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => setStatusFilter(tab.label)}
                aria-pressed={isActive}
                className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-sm font-medium whitespace-nowrap cursor-pointer transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2C1D] min-h-[44px] ${
                  isActive
                    ? 'border-[#4A2C1D] bg-[#4A2C1D] text-white'
                    : 'border-[#E6DDD0] bg-[#FAF6F0] text-[#4A2C1D] hover:bg-[#EFE7DC]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`tabular-nums text-xs ${
                    isActive ? 'text-[#EFE7DC]' : 'text-[#7C5B46]'
                  }`}
                >
                  ({tab.count})
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-3 border-t border-[#F0E8DC] pt-3 sm:grid-cols-12">
          <div className="relative sm:col-span-8">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#8C7463]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาข้อความความคิดเห็น ชื่อลูกค้า หรือรหัส..."
              aria-label="ค้นหาความคิดเห็น"
              className="w-full rounded-xl border border-[#DED2C2] bg-[#FAF6F0] py-2.5 pr-10 pl-10 text-sm text-[#2C1A10] placeholder-[#9B8675] focus:border-[#4A2C1D] focus:bg-white focus:outline-none min-h-[44px]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="ล้างคำค้นหา"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md p-1.5 text-[#6E5849] hover:text-[#2C1A10] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="sm:col-span-4">
            <select
              aria-label="กรองตามหัวข้อความคิดเห็น"
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value as TopicFilter)}
              className="w-full rounded-xl border border-[#DED2C2] bg-[#FAF6F0] px-3.5 py-2.5 text-sm font-medium text-[#2C1A10] focus:border-[#4A2C1D] focus:bg-white focus:outline-none min-h-[44px] cursor-pointer"
            >
              <option value="ทุกหัวข้อ">หัวข้อ: ทั้งหมด</option>
              {FEEDBACK_TOPICS.map((topic) => (
                <option key={topic} value={topic}>
                  หัวข้อ: {topic}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section aria-label="รายการความคิดเห็นจากลูกค้า" className="mt-6 space-y-4">
        {filteredFeedbacks.length === 0 ? (
          <div className="rounded-2xl border border-[#E6DDD0] bg-white px-6 py-12 text-center">
            <p className="text-lg font-semibold text-[#2C1A10]">
              ไม่พบรายการความคิดเห็นที่ตรงกับเงื่อนไข
            </p>
            <p className="mt-1.5 text-sm text-[#6E5849]">
              ลองเปลี่ยนตัวกรองสถานะ หัวข้อ หรือล้างคำค้นหาเพื่อดูรายการทั้งหมด
            </p>
            <button
              type="button"
              onClick={() => {
                setStatusFilter('ทั้งหมด');
                setTopicFilter('ทุกหัวข้อ');
                setSearchQuery('');
              }}
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#4A2C1D] px-5 py-2.5 text-sm font-medium text-white cursor-pointer hover:bg-[#361F14] min-h-[44px]"
            >
              แสดงความคิดเห็นทั้งหมด
            </button>
          </div>
        ) : (
          filteredFeedbacks.map((item) => {
            const isEditingNote = editingNoteId === item.id;

            return (
              <article
                key={item.id}
                className="rounded-2xl border border-[#E6DDD0] bg-white p-5 sm:p-6"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#6E5849] sm:text-sm">
                    <span className="font-mono font-semibold text-[#3B2316] tabular-nums">
                      รหัส #{item.id}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      {formatThaiDateTime(item.createdAt)}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-[#4A2C1D]">
                      {item.customerName}
                    </span>
                  </div>

                  <StatusIndicator status={item.status} />
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <div className="flex items-center gap-2">
                    <StarRatingDisplay rating={item.rating} />
                    <span className="text-sm font-semibold text-[#2C1A10] tabular-nums">
                      {item.rating}/5 ดาว
                    </span>
                  </div>
                  <span className="text-[#CBBBA6]" aria-hidden="true">
                    |
                  </span>
                  <p className="text-sm font-medium text-[#5A4234]">
                    หัวข้อ: {item.topics.join(' · ')}
                  </p>
                </div>

                <p className="mt-3 text-base leading-relaxed text-[#2C1A10]">
                  {item.details}
                </p>

                {item.staffNote && !isEditingNote && (
                  <div className="mt-4 rounded-xl bg-[#FAF6F0] px-4 py-3 text-sm text-[#4A2C1D]">
                    <span className="font-semibold">บันทึกพนักงาน: </span>
                    <span>{item.staffNote}</span>
                  </div>
                )}

                {isEditingNote && (
                  <div className="mt-4 rounded-xl border border-[#DED2C2] bg-[#FAF6F0] p-3.5">
                    <label
                      htmlFor={`note-${item.id}`}
                      className="block text-xs font-semibold text-[#4A2C1D]"
                    >
                      บันทึกการดำเนินการของพนักงาน
                    </label>
                    <input
                      id={`note-${item.id}`}
                      type="text"
                      value={noteDraft}
                      onChange={(e) => setNoteDraft(e.target.value)}
                      placeholder="เช่น แจ้งบาริสต้าตรวจสอบสูตรและปรับแก้ไขแล้ว..."
                      className="mt-2 w-full rounded-lg border border-[#DED2C2] bg-white px-3 py-2 text-sm text-[#2C1A10] focus:border-[#4A2C1D] focus:outline-none min-h-[42px]"
                    />
                    <div className="mt-2.5 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSaveNote(item.id)}
                        className="rounded-lg bg-[#4A2C1D] px-4 py-2 text-xs font-semibold text-white cursor-pointer hover:bg-[#361F14] min-h-[38px]"
                      >
                        บันทึกข้อความ
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingNoteId(null)}
                        className="rounded-lg border border-[#DED2C2] bg-white px-4 py-2 text-xs font-medium text-[#5A4234] cursor-pointer hover:bg-[#F3ECE2] min-h-[38px]"
                      >
                        ยกเลิก
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex flex-col gap-3 border-t border-[#F0E8DC] pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="mr-1 text-xs font-medium text-[#6E5849]">
                      เปลี่ยนสถานะ:
                    </span>
                    {FEEDBACK_STATUSES.map((statusOption) => {
                      const isCurrent = item.status === statusOption;
                      return (
                        <button
                          key={statusOption}
                          type="button"
                          onClick={() => onUpdateStatus(item.id, statusOption)}
                          aria-pressed={isCurrent}
                          className={`rounded-lg border px-3 py-1.5 text-xs font-medium whitespace-nowrap cursor-pointer transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2C1D] min-h-[38px] ${
                            isCurrent
                              ? 'border-[#4A2C1D] bg-[#4A2C1D] text-white'
                              : 'border-[#DED2C2] bg-[#FAF6F0] text-[#4A2C1D] hover:bg-[#EFE7DC]'
                          }`}
                        >
                          {statusOption}
                        </button>
                      );
                    })}
                  </div>

                  {!isEditingNote && (
                    <button
                      type="button"
                      onClick={() => handleOpenNoteEditor(item)}
                      className="self-start text-xs font-semibold text-[#6F4E37] underline-offset-4 hover:underline cursor-pointer py-2 sm:self-auto"
                    >
                      {item.staffNote ? 'แก้ไขบันทึกพนักงาน' : '+ เพิ่มบันทึกพนักงาน'}
                    </button>
                  )}
                </div>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
}
