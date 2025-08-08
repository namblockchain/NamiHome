// components/PDFViewer.js
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './PDFViewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.3.31/pdf.worker.min.mjs`;

const PDFViewer = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const fileUrl = '/pdf/sample.pdf';

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1);
    };

    const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
    const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages));

    return (
        <div className="pdf-container">
            <div className="pdf-controls">
                <button onClick={goToPrevPage} disabled={pageNumber <= 1}>⬅️</button>
                <span>{pageNumber} / {numPages}</span>
                <button onClick={goToNextPage} disabled={pageNumber >= numPages}>➡️</button>
                <a href={fileUrl} download target="_blank" rel="noopener noreferrer">
                    📥 Tải PDF
                </a>
            </div>
            <div className="pdf-viewer">
                <Document
                    file={fileUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading="Đang tải PDF..."
                >
                    <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
                </Document>
            </div>
        </div>
    );
};

export default PDFViewer;
