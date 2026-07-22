/**
 * PageContainer - Reusable page-level layout wrapper.
 *
 * Uses the existing `.main-content` CSS class from the design system
 * (style/layout.css). Provides consistent padding, max-width,
 * and centering for page content.
 *
 * Props:
 *  - children: page content
 *  - className: additional CSS class names
 *  - as: the HTML element to render (default: 'main')
 *  - ...rest: forwarded to the container element
 */
export default function PageContainer({
  children,
  className = '',
  as: Element = 'main',
  ...rest
}) {
  return (
    <Element
      className={`main-content ${className}`.trim()}
      {...rest}
    >
      {children}
    </Element>
  )
}
