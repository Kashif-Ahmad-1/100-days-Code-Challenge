import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

function Content({ selectedDay }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (selectedDay) {
      fetch(`/interviews/Day-${selectedDay.toString().padStart(2, '0')}/interview.md`)
        .then(response => {
          if (!response.ok) {
            throw new Error('File not found');
          }
          return response.text();
        })
        .then(text => setContent(text))
        .catch(error => {
          console.error('Error fetching content:', error);
          setContent('# Content not found');
        });
    } else {
      setContent('# Select a Day');
    }
  }, [selectedDay]);

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <h2 className="text-3xl font-bold mb-4 text-blue-800">
        {selectedDay ? `Day ${selectedDay.toString().padStart(2, '0')}` : 'Select a Day'}
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <ReactMarkdown
          className="prose max-w-none"
          components={{
            h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4 text-blue-800" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mt-5 mb-3 text-blue-700" {...props} />,
            p: ({ node, ...props }) => <p className="mb-4 text-gray-700" {...props} />,
            code: ({ node, inline, className, children, ...props }) => {
              return !inline ? (
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code className="bg-gray-100 px-1 rounded" {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default Content;