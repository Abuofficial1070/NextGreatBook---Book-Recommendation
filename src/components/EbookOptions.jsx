import { ExternalLink, Book, Download, ShoppingBag } from 'lucide-react';

export default function EbookOptions({ accessInfo, saleInfo }) {
  const options = [];

  // Check for Free Reading Option (Google Play Web Reader)
  if (accessInfo?.webReaderLink && accessInfo.accessViewStatus !== "NONE") {
    options.push({
      id: 'web-reader',
      title: 'Read Sample / Free eBook',
      source: 'Google Play Books',
      type: accessInfo.publicDomain ? 'Free eBook' : 'Sample',
      url: accessInfo.webReaderLink,
      icon: <Book size={20} />,
      color: 'bg-green-500'
    });
  }

  // Check for EPUB
  if (accessInfo?.epub?.isAvailable && accessInfo?.epub?.acsTokenLink) {
    options.push({
      id: 'epub',
      title: 'Download EPUB',
      source: 'Google Play Books',
      type: 'Paid/Protected',
      url: accessInfo.epub.acsTokenLink,
      icon: <Download size={20} />,
      color: 'bg-blue-500'
    });
  }

  // Check for PDF
  if (accessInfo?.pdf?.isAvailable && accessInfo?.pdf?.acsTokenLink) {
    options.push({
      id: 'pdf',
      title: 'Download PDF',
      source: 'Google Play Books',
      type: 'Paid/Protected',
      url: accessInfo.pdf.acsTokenLink,
      icon: <Download size={20} />,
      color: 'bg-purple-500'
    });
  }

  // Check for Buying Option
  if (saleInfo?.saleability === 'FOR_SALE' && saleInfo?.buyLink) {
    options.push({
      id: 'buy',
      title: `Buy eBook - ${saleInfo.retailPrice?.amount} ${saleInfo.retailPrice?.currencyCode}`,
      source: 'Google Play Books',
      type: 'Purchase',
      url: saleInfo.buyLink,
      icon: <ShoppingBag size={20} />,
      color: 'bg-primary'
    });
  }

  if (options.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center">
        <p className="text-gray-500">No legal eBook options are currently available for this title.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => (
        <a 
          key={opt.id}
          href={opt.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl hover:border-primary hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 ${opt.color} rounded-xl flex items-center justify-center text-white shadow-sm`}>
              {opt.icon}
            </div>
            <div>
              <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                {opt.title}
              </h4>
              <p className="text-xs text-gray-500 font-medium">
                {opt.source} • {opt.type}
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <ExternalLink size={16} className="text-gray-400 group-hover:text-primary" />
          </div>
        </a>
      ))}
    </div>
  );
}
