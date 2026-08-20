import ReactMarkdown from "react-markdown";

export default function Markdown({ children }: { children: string }) {
  return (
    <div className="space-y-5 text-[15px] leading-relaxed text-charbon/90 [&_strong]:text-charbon [&_a]:text-laterite [&_a]:font-medium [&_a]:hover:underline">
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2 className="font-display text-lg font-bold text-indigo pt-2">{children}</h2>
          ),
          h3: ({ children }) => <h3 className="font-display text-base font-bold text-indigo pt-1">{children}</h3>,
          ul: ({ children }) => <ul className="list-disc pl-5 space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 space-y-2">{children}</ol>,
          p: ({ children }) => <p>{children}</p>,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
