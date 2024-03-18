"use client"
import ja from 'date-fns/locale/ja';
import DatePicker, { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';
import { isWeekend,format } from 'date-fns';

const weekdayShortNames = ['日', '月', '火', '水', '木', '金', '土']; 

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
      { id: 2, date: '2024/03/18', author: '周周周', branch: '大阪支店'},
      { id: 3, date: '2024/03/18', author: '周周周', branch: '福岡支店'},
      { id: 4, date: '2024/03/18', author: '周周周', branch: '東京支店' },
      { id: 5, date: '2024/03/17', author: '周周周', branch: '京都支店' },
      { id: 6, date: '2024/03/17', author: '周周周', branch: '福山支店' },
      // ...
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

// カスタムヘッダーを定義する関数
const customHeader = ({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }: ReactDatePickerCustomHeaderProps) => (
  <div>
    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
      {'<'}
    </button>
    <span>{format(date, 'yyyy年MM月')}</span>
    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
      {'>'}
    </button>
  </div>
);

// カスタム曜日表示を定義する関数
const customDayProp = (date: Date) => {
  const isWeekendDay = isWeekend(date);
  return (
    <div
      className={isWeekendDay ? 'weekend-day' : 'weekday'}
      style={{
        color: isWeekendDay ? 'red' : 'black',
      }}
    >
      {date.getDate()}
    </div>
  );
};

  return (
    <div>
      <h2>日報一覧検索</h2>
      <div>
        <label htmlFor="dateCalendar">カレンダーから日付を選択してください</label>
        <DatePicker
          id="dateCalendar"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy年MM月dd日"
          renderCustomHeader={customHeader}
          renderDayProp={customDayProp}
          weekdayShortNames={weekdayShortNames}
          locale={ja}
        />
      </div>
      {/* <table>
        <thead>
          <tr>
            <th>No</th>
            <th>報告日付</th>
            <th>報告者</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          {dailyReports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.date}</td>
              <td>{report.author}</td>
              <td>{report.content}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <div>
        {/* <h3>{selectedDate ? format(selectedDate, 'yyyy年MM月dd日') : 'カレンダーから日付を選択してください'}</h3> */}
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
                <td style={{color:'blue'}}>{report.date}</td>
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



//日付を当日にデフォルトとして表示

// "use client"
// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import ja from 'date-fns/locale/ja'; // 日本語ロケールをインポート

// interface DailyReport {
//   id: number;
//   date: string;
//   author: string;
//   content: string;
// }

// const DailyReportList: React.FC = () => {
//   // 当日の日付を初期値として設定
//   const initialDate = new Date();
//   const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
//   const [dailyReports, setDailyReports] = useState<DailyReport[]>([]);

//   const handleDateChange = (date: Date | null) => {
//     setSelectedDate(date);
//     // 選択した日付のデイリーレポートを取得するロジックをここに追加
//     // 例: API呼び出しなど
//     const fetchedReports: DailyReport[] = [
//       { id: 1, date: '2024/3/5', author: '周周周', content: '本日の業務報告...' },
//       { id: 2, date: '2024/3/5', author: '周周周', content: '本日の業務報告...' },
//       { id: 3, date: '2024/3/5', author: '周周周', content: '本日の業務報告...' },
//       { id: 4, date: '2024/3/5', author: '周周周', content: '本日の業務報告...' },
//       // ...
//     ];
//     setDailyReports(fetchedReports);
//   };

//   return (
//     <div>
   
//       <div>
//         <label htmlFor="dateCalendar">支店長日報検索</label>
    
//         <DatePicker
//           id="dateCalendar"
//           selected={selectedDate}
//           onChange={handleDateChange}
//           dateFormat="yyyy年MM月dd日" // 日付形式を変更(オプション)
//           locale={ja} // 日本語ロケールを設定
//         />
//       </div>
//       <table>
//         <thead>
//           <tr>
//           <th>No</th>
//             <th>報告日付</th>
//             <th>報告者</th>
//             <th>内容</th>
//           </tr>
//         </thead>
//         <tbody>
//           {dailyReports.map((report) => (
            
//             <tr key={report.id}>
//                <td>{report.id}</td> 
//               <td>{report.date}</td>
//               <td>{report.author}</td>
//               <td>{report.content}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DailyReportList;



// "use client"
// import {useState } from "react";
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';




// interface DailyReport {
//   id: number;
//   date: string;
//   author: string;
//   content: string;
// }

// const DailyReportList: React.FC = () => {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [dailyReports, setDailyReports] = useState<DailyReport[]>([]);


//   const handleDateChange = (date: Date | null) => {
//     setSelectedDate(date);
//     // 選択した日付のデイリーレポートを取得するロジックをここに追加
//     // 例: API呼び出しなど
//     const fetchedReports: DailyReport[] = [
//       { id: 1, date: '2024/3/5', author: '鈴木太郎', content: '本日の業務報告...' },
//       { id: 2, date: '2024/3/5', author: '田中花子', content: '本日の業務報告...' },
//       // ...
//     ];
//     setDailyReports(fetchedReports);
//   };

//   return (
//     <div>
//       <h2>デイリーレポート一覧</h2>
//       <h2>デイリーレポート一覧</h2>
//       <div>
//         <label htmlFor="dateCalendar">カレンダー（DateCalendar）</label>
//         <DatePicker
//           id="dateCalendar"
//           selected={selectedDate}
//           onChange={handleDateChange}
//           dateFormat="yyyy/MM/dd"
//         />
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>報告日付</th>
//             <th>報告者</th>
//             <th>内容</th>
//           </tr>
//         </thead>
//         <tbody>
//           {dailyReports.map((report) => (
//             <tr key={report.id}>
//               <td>{report.date}</td>
//               <td>{report.author}</td>
//               <td>{report.content}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DailyReportList;


// export default function Page() {
//   return <h1>Hello, Next.js!</h1>
// }
