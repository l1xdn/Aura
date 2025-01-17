// // "use client";
// import React from "react";
// import PdfViewer from "@/app/components/pdf";
// import WatchPage from "@/app/components/video";

// type WatchPageProps = {
//   params: { id: string }
// }

// const Watch = async ({ params }: WatchPageProps ) => {
//   const { id } = await params;
//   return (
//     <>
//       <WatchPage id={id} />
//       <PdfViewer pdfUrl='/ph1.pdf'/>
//     </>
//   );
// };

// export default Watch;

import React from "react";
import PdfViewer from "@/app/components/pdf";
import WatchPage from "@/app/components/video";

type WatchPageProps = {
  params: Promise<{ id: string }>
}

const Watch = async ({ params }: WatchPageProps) => {
  // Await the params object before destructuring
  const { id } = await params;
  
  return (
    <>
      <WatchPage id={id} />
      <PdfViewer pdfUrl='/ph1.pdf'/>
    </>
  );
};

export default Watch;