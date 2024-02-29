"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

const dummy_report = './DummyReport.pdf';

const DeviceReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/execute')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  // const downloadPdf = (url) => {
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.setAttribute('download','Report')
  //   document.body.appendChild(link)
  //   link.click()
  //   link.remove()
  // };

  return (
    <div className='report bg-white flex rounded-xl mx-5 pt-5 pb-5 gap-x-10 justify-around'>
      <table align='center'>
        <tr align='center' className='text-[25px]'>
          <th className='bg-yellow-500 px-7 py-2 rounded-full'>
            Device Name
          </th>
          <th className='bg-yellow-500 px-7 py-2 rounded-full'>
            Risk
          </th>
          <th className='bg-yellow-500 px-7 py-2 rounded-full'>
            Report URL
          </th>
          <th className='bg-yellow-500 px-7 py-2 rounded-full'>
          Report Generated Time
          </th>
        </tr>
        {data.map((item, index) => (
          <tr align='center' key={index}>
            <td>
              <h2 className='subHead'>{item.file_name}</h2>
            </td>
            <td>
              <div className={`riskBar w-16 color px-14 py-4 rounded-full ${item.severity === 3 ? "bg-red-500" : item.severity === 2 ? "bg-yellow-300" : "bg-green-500"}`}></div>
            </td>
            <td>
              <h2 className='cursor-pointer subHead text-blue-600 hover:text-blue-300 underline' onClick={() => downloadPdf(`http://localhost:3001/download/${item.file_name.slice(0,-4)}`)}>Download Report</h2>
            </td>
            <td>
              <h2 className='subHead'>{new Date().toLocaleString()}</h2>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default DeviceReport;
