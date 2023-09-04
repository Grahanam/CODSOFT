import React, { useRef,useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMedal, faSignature, faSwatchbook } from '@fortawesome/free-solid-svg-icons'


const Certificate = ({ certificateDownloaded,name, course ,userId }) => {
  const pdfRef = useRef(null);
  const [showpdf,setshowpdf]=useState(false)

  

  const generatePDF = () => {
    const input = pdfRef.current;

    html2canvas(input,{scale:4}).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg',1.0);
      const pdf = new jsPDF("landscape");
      pdf.addImage(imgData, 'JPEG', 0, 0,pdf.internal.pageSize.getWidth(),pdf.internal.pageSize.getHeight());
      pdf.save('certificate.pdf');
    });
    certificateDownloaded()
  };

  return (
    <>
    <div className='absolute -left-[1000px]'>
    <div ref={pdfRef} className=' w-[792px] h-[612px] border-2 border-orange-500 font-bold flex flex-col bg-gray-900' >
      <h2 className='p-3 text-left text-base'>UserId:{userId}</h2>
      <div className='flex flex-row mt-10 text-4xl justify-center'>
        <i className='p-1 mt-3 rounded bg-black'>
            <FontAwesomeIcon className='text-4xl' icon={faSwatchbook} />
            <span></span>
        </i>
        <div className='pl-1'>
            <h2 className='font-extrabold text-orange-500'>Educad</h2>
        </div>
        </div>
      <h1 className='text-5xl py-6 '>Certificate of Completion</h1>
      <div className='flex flex-col items-center justify-center h-[30%]'>
      <i className='text-xl p-2'>This is to certify that</i>
      <p className='text-orange-500 text-2xl p-2'>{name}</p>
      <i className='text-xl p-2'>has successfully completed the course</i>
      <p className='text-orange-500 text-2xl p-2'>{course}</p>
      </div>
      <div className='mt-10 flex justify-around items-center'>
        <p>Date: {new Date().toDateString()}</p>
        <p >
          <i className='text-5xl'><FontAwesomeIcon icon={faSignature}/></i>
          <div className='text-xl'><i>Authorized Signature</i></div>
        </p>
      </div>
    </div>
    </div>
    <button onClick={generatePDF}>Download Certificate <i className='pt-4'><FontAwesomeIcon icon={faMedal}/></i></button>
    </>
  );
};

export default Certificate;