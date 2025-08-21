  // Helper: convert plain text to markdown (simple rules)
  function plainToMarkdown(text) {
    let md = text;
    md = md.replace(/\*\*(.*?)\*\*/g, '**$1**'); // bold
    md = md.replace(/\*(.*?)\*/g, '*$1*'); // italic
    md = md.replace(/^(\d+)\.\s/gm, '- '); // numbered to bullet
    md = md.replace(/\n{2,}/g, '\n\n'); // collapse multiple newlines
    return md;
  }

import React from 'react';
import RichTextInput from './RichTextInput';
import './CanvasArea.css';

function CanvasArea({ elements, onDrop, onDragOver, onClear, onPreview, onExport, onEditElement, onDeleteElement }) {
  return (
    <div className="canvas-area">
      <div className="canvas-header">
        <div className="canvas-title">Design Canvas</div>
        <div className="canvas-actions">
          <button className="action-btn" onClick={onClear} title="Clear all elements from canvas">Clear All</button>
          <button className="action-btn" onClick={onExport} title="Export to file">Export</button>
          <button className="action-btn primary" onClick={onPreview} title="Preview rendered markdown">Preview</button>
        </div>
      </div>
      <div
        className="canvas"
        onDrop={onDrop}
        onDragOver={onDragOver}
        style={{ minHeight: 400, backgroundImage: 'radial-gradient(circle at 20px 20px, #333 1px, transparent 1px)', backgroundSize: '40px 40px', backgroundPosition: '0 0' }}
      >
        {elements.length === 0 ? (
          <div className="canvas-placeholder">
            <div className="placeholder-icon">📝</div>
            <div style={{ fontSize: 20, color: '#888', marginTop: 8 }}>Drag elements here to start building</div>
            <div style={{ fontSize: 12, color: '#555', marginTop: 8 }}>Your markdown document will appear here</div>
          </div>
        ) : (
          elements.map((el, idx) => (
            <div key={el.id || idx} className="canvas-element">
              <div className="element-header">
                <div className="element-icon">{el.icon}</div>
                <div>{el.label}</div>
              </div>
              <div className="element-content">
                {/* Heading element with editable content and level */}
                {el.type === 'heading' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <select
                      value={el.level || 1}
                      onChange={e => onEditElement(idx, { ...el, level: Number(e.target.value) })}
                      style={{ marginBottom: 8, width: 120 }}
                    >
                      <option value={1}>Heading 1</option>
                      <option value={2}>Heading 2</option>
                      <option value={3}>Heading 3</option>
                      <option value={4}>Heading 4</option>
                      <option value={5}>Heading 5</option>
                      <option value={6}>Heading 6</option>
                    </select>
                    <RichTextInput
                      value={el.content || ''}
                      onChange={val => onEditElement(idx, val)}
                      rows={1}
                      style={{ fontWeight: 'bold', fontSize: 20, width: '90%', overflow: 'auto' }}
                      placeholder="Heading text..."
                    />
                  </div>
                )}
                {/* All other text elements use RichTextInput for formatting */}
                {['paragraph','quote','list','numbered-list','color'].includes(el.type) && (
                  <RichTextInput
                    value={el.content || ''}
                    onChange={val => onEditElement(idx, val)}
                  />
                )}
                {el.type === 'image' && (
                  <>
                    <input
                      className="editable-input"
                      type="text"
                      value={el.content.alt || ''}
                      placeholder="Image Description"
                      onChange={e => onEditElement(idx, { ...el.content, alt: e.target.value })}
                      style={{ marginBottom: 8 }}
                    />
                    <input
                      className="editable-input"
                      type="text"
                      value={el.content.url || ''}
                      placeholder="Image URL"
                      onChange={e => onEditElement(idx, { ...el.content, url: e.target.value })}
                    />
                  </>
                )}
                {el.type === 'link' && (
                  <>
                    <input
                      className="editable-input"
                      type="text"
                      value={el.content.text || ''}
                      placeholder="Link Text"
                      onChange={e => onEditElement(idx, { ...el.content, text: e.target.value })}
                      style={{ marginBottom: 8 }}
                    />
                    <input
                      className="editable-input"
                      type="text"
                      value={el.content.url || ''}
                      placeholder="URL"
                      onChange={e => onEditElement(idx, { ...el.content, url: e.target.value })}
                    />
                  </>
                )}
                {el.type === 'code' && (
                  <>
                    <input
                      className="editable-input"
                      type="text"
                      value={el.content.language || ''}
                      placeholder="Language (optional)"
                      onChange={e => onEditElement(idx, { ...el.content, language: e.target.value })}
                      style={{ marginBottom: 8, fontSize: 14 }}
                    />
                    <textarea
                      className="editable-input"
                      rows={5}
                      value={el.content.code || ''}
                      placeholder="Enter code here..."
                      onChange={e => onEditElement(idx, { ...el.content, code: e.target.value })}
                      style={{ fontFamily: 'monospace' }}
                    />
                  </>
                )}
                {el.type === 'table' && (
                  <textarea
                    className="editable-input"
                    rows={5}
                    value={el.content || ''}
                    placeholder="Enter table data..."
                    onChange={e => onEditElement(idx, e.target.value)}
                  />
                )}
                {el.type === 'horizontal-rule' && (
                  <div style={{ color: '#666', textAlign: 'center' }}>— Horizontal Rule —</div>
                )}
                {el.type === 'text-to-md' && (
                  <>
                    <textarea
                      className="editable-input modern-input"
                      rows={8}
                      value={el.content || ''}
                      placeholder="Paste or type plain text here..."
                      onChange={e => onEditElement(idx, e.target.value)}
                      style={{marginBottom: 8}}
                    />
                    <div style={{background:'#181818',borderRadius:8,padding:'12px',marginTop:8,color:'#e5e5e5',fontFamily:'monospace',fontSize:15}}>
                      <div style={{marginBottom:4,fontWeight:600,color:'#6366f1'}}>Markdown Output:</div>
                      <pre style={{whiteSpace:'pre-wrap',margin:0}}>{plainToMarkdown(el.content || '')}</pre>
                    </div>
                  </>
                )}
              </div>
              <div className="element-actions">
                <button className="element-action delete" onClick={() => onDeleteElement(idx)} title="Delete">×</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CanvasArea;
