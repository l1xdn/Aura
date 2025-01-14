"use client";
import { useState } from 'react';
import PdfViewer from './pdf';

interface WatchPageProps {
    id: string;
}

export default function WatchPage({ id }: WatchPageProps) {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoad = () => {
        setIsLoading(false);
    };

    return (
        <>
            <div className="flex justify-center items-center p-10 ">
                {isLoading && (
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 absolute"></div>
                )}
                <iframe
                    width="853"
                    height="480"
                    src={`https://www.youtube.com/embed/${id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={handleLoad}
                    className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                />
            </div>
            <div className="flex justify-center items-center mt-8 pb-3">
                <a 
                    href="/ph1.pdf" 
                    download 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download PDF
                </a>
            </div>
            
           
        </>
    );
}
