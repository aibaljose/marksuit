
import React from 'react';
import './PropertiesPanel.css';
import { marked } from 'marked';

function PropertiesPanel({ markdown, onCopy, onShowPreview }) {
  const [showHelp, setShowHelp] = React.useState(false);
  return (
    <div className="properties-panel">
      <div className="properties-header">
        <div className="properties-title">Generated Markdown</div>
        <button className="help-button" title="Keyboard shortcuts" onClick={() => setShowHelp(true)}>?</button>
      </div>
      <div className="properties-content">
        <div className="property-group">
          <div className="property-label">OUTPUT</div>
          <div className="markdown-output" style={{ background: '#111', border: '1px solid #333', borderRadius: '8px', padding: '16px', fontFamily: 'monospace', fontSize: '13px', color: '#e5e5e5', whiteSpace: 'pre-wrap', marginBottom: '12px' }}>
            {markdown || '# Your Markdown Output\n\nStart by dragging elements from the sidebar to see the generated markdown code here.'}
          </div>
            <button className="copy-button" onClick={onCopy}>📋 Copy to Clipboard</button>
            <button className="copy-button" style={{marginTop: 8, background: '#222', color: '#6366f1'}} onClick={onShowPreview}>🔍 Fullscreen Preview</button>
            <div className="property-label">Preview</div>
            <div className="markdown-preview" dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }} />
        </div>
      </div>
      {showHelp && (
        <div
  className="modal-overlay"
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(20,20,30,0.98)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
>
  <div
    className="modal-content"
    style={{
      background: '#222',
      color: '#eee',
      borderRadius: 12,
      padding: '32px',
      maxWidth: 400,
      boxShadow: '0 4px 32px #000',
      textAlign: 'center',
      position: 'relative'
    }}
  >
    <button
      style={{
        position: 'absolute',
        top: 16,
        right: 16,
        fontSize: 20,
        background: '#6366f1',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '6px 16px',
        cursor: 'pointer'
      }}
      onClick={() => setShowHelp(false)}
    >
      ×
    </button>

    <h2 style={{ marginTop: 0 }}>Credits</h2>
    <p style={{ fontSize: 16, lineHeight: 1.8 }}>
      This project was designed & developed by <br />
      <b style={{ color: '#6366f1' }}>Aibal Jose</b>
    </p>

    <p style={{ fontSize: 14, color: '#aaa', marginTop: 20 }}>
      © {new Date().getFullYear()} All rights reserved.
    </p>
  </div>
</div>
        )}
        </div>  
  );
}

export default PropertiesPanel;
