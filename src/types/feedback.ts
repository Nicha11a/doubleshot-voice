export type PageId = 'home' | 'submit' | 'dashboard';

export type FeedbackTopic =
  | 'รสชาติ'
  | 'เครื่องดื่ม'
  | 'การบริการ'
  | 'พนักงาน'
  | 'บรรยากาศ'
  | 'อื่น ๆ';

export type FeedbackStatus =
  | 'รอดำเนินการ'
  | 'กำลังดำเนินการ'
  | 'ดำเนินการแล้ว';

export interface FeedbackItem {
  id: string;
  rating: 1 | 2 | 3 | 4 | 5;
  topics: FeedbackTopic[];
  details: string;
  customerName: string;
  createdAt: string;
  status: FeedbackStatus;
  staffNote?: string;
}

export const FEEDBACK_TOPICS: FeedbackTopic[] = [
  'รสชาติ',
  'เครื่องดื่ม',
  'การบริการ',
  'พนักงาน',
  'บรรยากาศ',
  'อื่น ๆ',
];

export const FEEDBACK_STATUSES: FeedbackStatus[] = [
  'รอดำเนินการ',
  'กำลังดำเนินการ',
  'ดำเนินการแล้ว',
];

export const RATING_LABELS: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: 'ต้องปรับปรุงด่วน',
  2: 'พอใช้ ควรพัฒนาเพิ่มเติม',
  3: 'ปานกลาง ตามมาตรฐาน',
  4: 'พึงพอใจ ประทับใจดี',
  5: 'ประทับใจมาก ยอดเยี่ยม',
};
