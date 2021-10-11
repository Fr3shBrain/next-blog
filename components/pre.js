import SyntaxHighlighter  from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

const Pre = ({ children, className }) => {
  console.log(className)
  const lang = className.split('-')[1]
  return (
    <SyntaxHighlighter  language={lang} style={dracula}>
      {children}
    </SyntaxHighlighter>
  )
}

export default Pre
