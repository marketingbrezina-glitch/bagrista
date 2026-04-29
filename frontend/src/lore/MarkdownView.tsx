import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import { processWikiLinks } from './loreContent';

type Props = {
  body: string;
};

export function MarkdownView({ body }: Props) {
  const processed = processWikiLinks(body);
  return (
    <div className="lore-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            if (typeof href === 'string' && href.startsWith('/lore')) {
              return <Link to={href}>{children}</Link>;
            }
            return <a href={href}>{children}</a>;
          },
        }}
      >
        {processed}
      </ReactMarkdown>
    </div>
  );
}
