import * as React from "react";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";

const components = {
  h1: ({ className, ...props }) => <h1 className={className} {...props} />,
  h2: ({ className, ...props }) => <h2 className={className} {...props} />,
  h3: ({ className, ...props }) => <h3 className={className} {...props} />,
  h4: ({ className, ...props }) => <h4 className={className} {...props} />,
  h5: ({ className, ...props }) => <h5 className={className} {...props} />,
  h6: ({ className, ...props }) => <h6 className={className} {...props} />,
  a: ({ className, ...props }) => <a className={className} {...props} />,
  p: ({ className, ...props }) => <p className={className} {...props} />,
  ul: ({ className, ...props }) => <ul className={className} {...props} />,
  ol: ({ className, ...props }) => <ol className={className} {...props} />,
  li: ({ className, ...props }) => <li className={className} {...props} />,
  blockquote: ({ className, ...props }) => (
    <blockquote className={className} {...props} />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img className={className} alt={alt} {...props} />
  ),
  hr: ({ className, ...props }) => <hr className={className} {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <table className={className} {...props} />
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={className} {...props} />
  ),
  th: ({ className, ...props }) => <th className={className} {...props} />,
  td: ({ className, ...props }) => <td className={className} {...props} />,
  pre: ({ className, ...props }) => <pre className={className} {...props} />,
  code: ({ className, ...props }) => <code className={className} {...props} />,
  Image,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  );
}
