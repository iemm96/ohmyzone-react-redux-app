import React, { useState } from 'react'
import { createPortal } from 'react-dom'

export const IFrame = ({
  children,
  ...props
}:{ children:any, props:any }) => {
  const [contentRef, setContentRef] = useState<any>(null)
  const mountNode:any =
    contentRef?.contentWindow?.document?.body

  return (
    <iframe {...props} ref={setContentRef}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  )
}