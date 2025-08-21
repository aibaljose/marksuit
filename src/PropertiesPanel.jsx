
import React from 'react';
import './PropertiesPanel.css';
import { marked } from 'marked';

function PropertiesPanel({ markdown, onCopy, onShowPreview }) {
  return (
    <div className="properties-panel">
      <div className="properties-header">
        <div className="properties-title">Generated Markdown</div>
        <button className="help-button" title="Keyboard shortcuts">?</button>
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
    </div>
  );
}

export default PropertiesPanel;
