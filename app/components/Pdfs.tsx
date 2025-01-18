import React from 'react'

const Pdfs = () => {
  const pdfs = [
    { id: 1, name: 'كهرباء 1', url: '/ph-1.pdf' },
    { id: 2, name: 'كهرباء 2', url: '/ph-2.pdf' },
    { id: 3, name: 'رياضيات 1', url: '/math-1.pdf' },
    { id: 3, name: 'رياضيات 2', url: '/math-2.pdf' },
    { id: 3, name: 'انظمة رقمية 1', url: '/ds-1.pdf' },
    { id: 3, name: 'انظمة رقمية 2', url: '/ds-2.pdf' },
    { id: 3, name: 'انظمة رقمية ', url: '/ns.pdf' }
  ];

  return (
    <div className="">
      <h1 className="flex justify-center">Download PDFs</h1>
     
      {pdfs.map(pdf => (
       <main className='p-3'>
        <button key={pdf.id} className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto p-2">
          <a href={pdf.url} download>{pdf.name}</a>
        </button>
        </main>
      ))}
      </div>
  )
}

export default Pdfs;