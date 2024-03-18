"use client"
import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';

class DateAdapter extends AdapterDateFns {
  getWeekdays = (): string[] => ['日', '月', '火', '水', '木', '金', '土'];
}

interface DailyReport {
  id: number;
  date: string;
  author: string;
  branch: string;
}

interface DailyReportListProps {}

const DailyReportList: React.FC<DailyReportListProps> = () => {
  const initialDate = new Date();

  // 日付をフォーマットする関数
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  // 指定した日付の日報データを取得する関数
  const getDailyReportsForDate = (date: Date | null) => {
    if (!date) return [];

    const formattedDate = formatDate(date);
    const fetchedReports: DailyReport[] = [
      { id: 1, date: '2024/03/18', author: '周周周', branch: '九州支店' },
      { id: 2, date: '2024/03/18', author: '周周周', branch: '九州支店' },
      { id: 3, date: '2024/03/18', author: '周周周', branch: '九州支店' },
      { id: 4, date: '2024/03/17', author: '周周周', branch: '九州支店' },
      { id: 5, date: '2024/03/17', author: '周周周', branch: '九州支店' },
      { id: 6, date: '2024/03/17', author: '周周周', branch: '九州支店' },
    ];
    return fetchedReports.filter((report) => report.date === formattedDate);
    //指定された日付と同じ日付の日報のみを返すようにフィルタリング。
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [dailyReports, setDailyReports] = useState<DailyReport[]>(getDailyReportsForDate(initialDate));

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      setDailyReports(getDailyReportsForDate(date));
    } else {
      setDailyReports(getDailyReportsForDate(initialDate));
    }
  };

  return (
    <div>
      <h2>日報一覧検索</h2>
      <div>
        <label htmlFor="dateCalendar">カレンダーから日付を選択してください</label>
        <LocalizationProvider
          dateAdapter={DateAdapter}
          dateFormats={{
            monthAndYear: "yyyy年MM月",
            monthShort: "MM月"
          }}
        >
          <DateCalendar
            value={selectedDate}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        {selectedDate && (
          <p>選択された日付: {format(selectedDate, 'yyyy年MM月dd日')}</p>
        )}
      </div>
      <div>
        {dailyReports.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>日付</th>
                <th>支店名</th>
                <th>報告者</th>
              </tr>
            </thead>
            <tbody>
              {dailyReports.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td style={{ color: 'blue' }}>{report.date}</td>
                  <td>{report.branch}</td>
                  <td>{report.author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>日報はありません。</p>
        )}
      </div>
    </div>
  );
};

export default DailyReportList;
