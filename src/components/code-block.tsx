import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock = ({ code, language = "text" }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-language-label">{language.toUpperCase()}</span>
      </div>
      <div className="code-content">
        <pre>
          <code>{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className={`copy-button ${copied ? "copied" : ""}`}
          aria-label="Copy code"
          title="Copy code"
        >
          {copied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          )}
        </button>
      </div>

      <style>{`
        .code-block-wrapper {
          position: relative;
          margin: 1.5rem 0;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border: 1px solid hsl(var(--border));
          background-color: #1e1e1e;
        }
        
        .code-block-header {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          background-color: #2d2d2d;
          padding: 0.5rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .code-language-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: #d4d4d4;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .code-content {
          position: relative;
        }
        
        pre {
          margin: 0;
          padding: 1rem;
          overflow-x: auto;
          background-color: #1e1e1e;
        }
        
        code {
          background: transparent;
          padding: 0;
          border-radius: 0;
          white-space: pre;
          font-family: 'Consolas', 'Monaco', 'Andale Mono', monospace;
          font-size: 0.875rem;
          line-height: 1.5;
          color: #d4d4d4;
          display: block;
          tab-size: 2;
        }
        
        .copy-button {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          height: 32px;
          width: 32px;
          padding: 0.375rem;
          background-color: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 0.25rem;
          color: #d4d4d4;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          z-index: 10;
        }
        
        .copy-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
        
        .copy-button.copied {
          background-color: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
        }
      `}</style>
    </div>
  );
};

export default CodeBlock;