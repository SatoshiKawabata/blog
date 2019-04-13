import React from 'react'

export interface ContentProps extends React.Props<{}> {
  content: string
  className?: string
}

export const HTMLContent: React.StatelessComponent<ContentProps> = ({ content, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
)

const Content: React.StatelessComponent<ContentProps> = ({ content, className }) => (
  <div className={className}>{content}</div>
)

export default Content
