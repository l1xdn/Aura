"use client";
import React, { useState, useEffect } from 'react';
import { Card } from './card';

interface PdfViewerProps {
  pdfUrl: string;
  initialPage?: number;
  className?: string;
}

interface PdfViewerState {
  loading: boolean;
  error: string | null;
  pageNumber: number;
}

const PdfViewer: React.FC<PdfViewerProps> = ({
  pdfUrl,
  initialPage = 1,
  className = ''
}) => {
  const [state, setState] = useState<PdfViewerState>({
    loading: true,
    error: null,
    pageNumber: initialPage
  });

  useEffect(() => {
    const checkPdf = async (): Promise<void> => {
      try {
        const response = await fetch(pdfUrl, { method: 'HEAD' });
        if (!response.ok) {
          throw new Error(`Failed to load PDF (status: ${response.status})`);
        }
        setState(prev => ({ ...prev, loading: false }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to load PDF'
        }));
      }
    };
    
    checkPdf();
  }, [pdfUrl]);

  const handlePreviousPage = (): void => {
    setState(prev => ({
      ...prev,
      pageNumber: Math.max(1, prev.pageNumber - 1)
    }));
  };

  const handleNextPage = (): void => {
    setState(prev => ({
      ...prev,
      pageNumber: prev.pageNumber + 1
    }));
  };

  if (state.error) {
    return (
      <Card className="p-4 text-red-500">
        <p>Error: {state.error}</p>
      </Card>
    );
  }

  return (
    <div className={`w-full max-w-6xl mx-auto ${className}`}>
      <Card className="overflow-hidden">
        {state.loading ? (
          <div className="h-[800px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        ) : (
          <div className="w-full h-[800px] relative">
            <iframe
              src={`${pdfUrl}#page=${state.pageNumber}`}
              className="w-full h-full border-0 absolute inset-0"
              title="PDF Viewer"
              onError={() => setState(prev => ({
                ...prev,
                error: 'Failed to display PDF'
              }))}
            />
          </div>
        )}
      </Card>

      <div className="flex justify-center gap-4 mt-4 p-3">
        <button
          onClick={handlePreviousPage}
          disabled={state.pageNumber <= 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="py-2">Page {state.pageNumber}</span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;