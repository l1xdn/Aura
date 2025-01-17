// "use client";
import PdfViewer from "@/app/components/pdf";
import WatchPage from "@/app/components/video";


interface WatchProps {
  params: {
    id: string;
  };
}

const Watch = async ({ params }: WatchProps) => {
  const { id } = await params;
  return( 
  <>
  <WatchPage id={id} />
  <PdfViewer pdfUrl='/ph1.pdf'/>
  </>
)
};

export default Watch;