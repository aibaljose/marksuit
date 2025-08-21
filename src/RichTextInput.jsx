
import React, { useRef } from 'react';
import './CanvasArea.css';

export default function RichTextInput({ value, onChange, rows = 3, style = {}, placeholder = '' }) {
  const textareaRef = useRef();
  const rowsValue = typeof rows === 'number' ? rows : 3;
  const styleValue = style || {};
  // Insert markdown formatting at cursor
  const insertMarkdown = (syntax) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);
    let newValue;
    if (syntax === 'bold') {
      newValue = value.substring(0, start) + '**' + selected + '**' + value.substring(end);
    } else if (syntax === 'italic') {
      newValue = value.substring(0, start) + '*' + selected + '*' + value.substring(end);
    }
    onChange(newValue);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + (syntax === 'bold' ? 2 : 1), end + (syntax === 'bold' ? 2 : 1));
    }, 0);
  };
  return (
    <div className="rich-input-box">
      <div className="rich-toolbar">
        <button type="button" title="Bold" onClick={() => insertMarkdown('bold')}><b>B</b></button>
        <button type="button" title="Italic" onClick={() => insertMarkdown('italic')}><i>I</i></button>
      </div>
      <textarea
        ref={textareaRef}
        className="rich-input"
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={rowsValue}
        style={{ width: '90%', minHeight: 48, border: '1.5px solid #444', borderRadius: 8, padding: 10, background: '#222', color: '#eee', fontSize: '1rem', fontFamily: 'inherit', marginTop: 4, ...styleValue, overflow: 'auto' }}
        placeholder={placeholder}
      />
    </div>
  );
}
