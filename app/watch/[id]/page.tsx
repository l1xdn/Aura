"use client";
import PdfViewer from "@/app/components/pdf";
import WatchPage from "@/app/components/video";


interface WatchProps {
  params: {
    id: string;
  };
}

const Watch = ({ params: { id }}: WatchProps) => {
  return( 
  <>
  <WatchPage id={id} />
  <PdfViewer pdfUrl='/ph1.pdf'/>
  </>
)
};

export default Watch;