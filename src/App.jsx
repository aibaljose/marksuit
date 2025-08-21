import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Sidebar from './Sidebar';
import CanvasArea from './CanvasArea';
import PropertiesPanel from './PropertiesPanel';
import Modal from './Modal';
import { marked } from 'marked';

function App() {
  // Helper: convert plain text to markdown (simple rules)
  function plainToMarkdown(text) {
    if (!text) return '';
    let lines = text.split(/\r?\n/);
    let out = [];
    let inCodeBlock = false;
    lines.forEach(line => {
      let l = line.trim();
      // Code block detection
      if (/^```/.test(l)) {
        inCodeBlock = !inCodeBlock;
        out.push(l);
        return;
      }
      if (inCodeBlock) {
        out.push(l);
        return;
      }
      // Header detection
      if (/^Task/.test(l)) {
        out.push(`# 🔖 ${l}`);
      } else if (/^Guidelines:?/.test(l)) {
        out.push('### 🎤 Guidelines:');
      } else if (/^Submission:?/.test(l)) {
        out.push('### 📤 Submission:');
      } else if (/^In this task, submit:?/.test(l)) {
        out.push('### 📌 In this task, submit:');
      } else if (/^Powered by/.test(l)) {
        out.push('### • Powered by Ilmora ⚙️');
 
      } else if (/^\*\*/.test(l) || /^⭐/.test(l)) {
        out.push('⭐ **300 Karma points**');
      } else if (/^•/.test(l) || /^- /.test(l)) {
        // Bullet list
        out.push(l.replace(/^•/, '-').replace(/^\- /, '- '));
      } else if (/^\d+\./.test(l)) {
        // Numbered list to bullet
        out.push('- ' + l.replace(/^\d+\.\s*/, ''));
   
      } else if (/^\s*$/.test(l)) {
        out.push('');
      } else if (/^\s{2,}/.test(line)) {
        // Indented line (sub-list or note)
        out.push('  ' + l);
      } else if (/^#/.test(l)) {
        // Hashtag
        out.push('**' + l + '**');
      } else {
        // Bold/italic important phrases
        l = l.replace(/(resume|video|Karma points|English|good lighting|sound quality|GitHub repo|Google Drive|#ai channel|#cl-ai-personalknowhow)/gi, '**$1**');
        l = l.replace(/resume/gi, '📄 **resume**');
        l = l.replace(/video/gi, '🎥 **video**');
        // Subheader detection
        if (/^\w.*:$/i.test(l)) {
          out.push('#### ' + l);
        } else {
          out.push(l);
        }
      }
    });
    return out.join('\n');
  }
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  // Markdown preview modal handler
  const handleShowPreviewModal = () => setShowPreviewModal(true);
  const handleClosePreviewModal = () => setShowPreviewModal(false);
  // Reorder elements
  const handleReorderElement = (fromIdx, toIdx) => {
    setCanvasElements(prev => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIdx, 1);
      updated.splice(toIdx, 0, moved);
      return updated;
    });
  };
  const [showModal, setShowModal] = useState(false);
  const [canvasElements, setCanvasElements] = useState([]);
  const [draggedElement, setDraggedElement] = useState(null);
  const [draggedTemplate, setDraggedTemplate] = useState(null);
  const [markdown, setMarkdown] = useState('');

  // Open/close modal
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Drag handlers
  const handleDragStart = (type, template) => {
    setDraggedElement(type);
    setDraggedTemplate(template || null);
  };
  const handleDrop = () => {
    if (draggedElement) {
      // Add a new element object with type, label, icon, and template
      const elementDef = getElementDef(draggedElement, draggedTemplate);
      // If template returns array, flatten it
      if (Array.isArray(elementDef)) {
        setCanvasElements(prev => [...prev, ...elementDef]);
      } else {
        setCanvasElements(prev => [...prev, elementDef]);
      }
      setDraggedElement(null);
      setDraggedTemplate(null);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Markdown generation (simple example)
  React.useEffect(() => {
    // Generate markdown from canvasElements
    const md = canvasElements.map(el => generateMarkdown(el)).join('\n\n');
    setMarkdown(md);
  }, [canvasElements]);
  // Element definitions for rendering and markdown
  function getElementDef(type, template) {
    const defs = {
      heading: { type: 'heading', label: 'Heading', icon: 'H', content: 'Your Heading Here', level: 1 },
      paragraph: { type: 'paragraph', label: 'Paragraph', icon: '¶', content: 'Your paragraph text goes here.' },
      quote: { type: 'quote', label: 'Quote', icon: '"', content: '> This is a blockquote' },
      list: { type: 'list', label: 'Bullet List', icon: '•', content: '- Item 1\n- Item 2\n- Item 3' },
      'numbered-list': { type: 'numbered-list', label: 'Numbered List', icon: '1', content: '1. First item\n2. Second item\n3. Third item' },
      image: { type: 'image', label: 'Image', icon: '🖼', content: { alt: 'Image Description', url: 'https://example.com/image.jpg' } },
      link: { type: 'link', label: 'Link', icon: '🔗', content: { text: 'Link Text', url: 'https://example.com' } },
      code: { type: 'code', label: 'Code Block', icon: '<>', content: { language: 'javascript', code: "function example() {\n  console.log('Hello, world!');\n}" } },
      'horizontal-rule': { type: 'horizontal-rule', label: 'Divider', icon: '—', content: '' },
      table: { type: 'table', label: 'Table', icon: '⊞', content: '| Header 1 | Header 2 | Header 3 |\n| -------- | -------- | -------- |\n| Cell 1   | Cell 2   | Cell 3   |\n| Cell 4   | Cell 5   | Cell 6   |' },
      emoji: { type: 'emoji', label: 'Emoji', icon: '😃', content: '😃' },
      checkbox: { type: 'checkbox', label: 'Checkbox', icon: '☑️', content: '- [ ] Task 1\n- [x] Task 2' },
      radiobutton: { type: 'radiobutton', label: 'Radio Button', icon: '🔘', content: '( ) Option 1\n(*) Option 2' },
      uml: { type: 'uml', label: 'UML Diagram', icon: '📊', content: '```mermaid\nclassDiagram\n  Animal <|-- Duck\n  Animal <|-- Fish\n  Animal <|-- Zebra\n  Animal : +int age\n  Animal : +isMammal()\n  Animal : +mate()\n```' },
      color: { type: 'color', label: 'Color Text', icon: '🖍️', content: '<span style="color: #ff5733;">Colored Text Example</span>' },
      template: { type: 'template', label: 'Template', icon: '📄', content: template },
    };
    let def = defs[type] ? { ...defs[type] } : { type, label: type, icon: '?', content: '' };
    // Handle asset templates
    if (type === 'image' && template === 'badge') {
      def.content = { alt: 'GitHub Stars', url: 'https://img.shields.io/github/stars/username/repo?style=social' };
    }
    if (type === 'image' && template === 'profile') {
      def.content = { alt: 'Profile Picture', url: 'https://github.com/username.png?size=200' };
    }
    // For Sidebar asset templates, always return a single element with full markdown content
    if (type === 'template' && template && typeof template === 'string') {
      return { type: 'paragraph', label: 'Template', icon: '📄', content: template };
    }
    // For legacy templates (readme/license)
    if (type === 'template' && template === 'readme') {
      return [
        defs.heading,
        { ...defs.paragraph, content: 'A short description of what this project does and who it\'s for.' },
        { ...defs.heading, content: 'Features', level: 2 },
        { ...defs.list, content: '- Feature 1\n- Feature 2\n- Feature 3' },
        { ...defs.heading, content: 'Installation', level: 2 },
        { ...defs.code, content: { language: 'bash', code: 'npm install my-project\ncd my-project' } },
        { ...defs.heading, content: 'Usage', level: 2 },
        { ...defs.paragraph, content: 'Describe how to use your project.' },
        { ...defs.code, content: { language: 'javascript', code: "import { myProject } from 'my-project';\n\n// Example usage\nconst result = myProject.doSomething();" } },
      ];
    }
    if (type === 'template' && template === 'license') {
      return [
        { ...defs.paragraph, content: `MIT License\n\nCopyright (c) ${new Date().getFullYear()} Your Name\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.` },
      ];
    }
    return def;
  }

  function generateMarkdown(el) {
    switch (el.type) {
      case 'heading':
        return `${'#'.repeat(el.level || 1)} ${el.content}`;
      case 'paragraph':
        return el.content;
      case 'quote':
        return el.content;
      case 'list':
        return el.content;
      case 'numbered-list':
        return el.content;
      case 'image':
        return `![${el.content.alt}](${el.content.url})`;
      case 'link':
        return `[${el.content.text}](${el.content.url})`;
      case 'code':
        return `${el.content.language}\n${el.content.code}\n`;
      case 'horizontal-rule':
        return '---';
      case 'table':
        return el.content;
      case 'text-to-md':
        return plainToMarkdown(el.content || '');
      default:
        return '';
    }
  }

  // Element editing
  const handleEditElement = (idx, value) => {
    setCanvasElements(prev => prev.map((el, i) => i === idx ? { ...el, content: value } : el));
  };
  const handleDeleteElement = (idx) => {
    setCanvasElements(prev => prev.filter((_, i) => i !== idx));
  };
  const handleClearCanvas = () => {
    if (window.confirm('Are you sure you want to clear all elements?')) {
      setCanvasElements([]);
    }
  };
  const handlePreview = () => {
    // Simple preview: open markdown in new window
    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(`<pre>${markdown}</pre>`);
  };
  const handleExport = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copy markdown
  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    alert('Markdown copied!');
  };

  return (
    <>
      <div className="app-container">
        {/* Sidebar Panel */}
        <Sidebar onDragStart={handleDragStart} />

        {/* Canvas Area */}
        <CanvasArea
          elements={canvasElements}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClear={handleClearCanvas}
          onPreview={handlePreview}
          onExport={handleExport}
          onEditElement={handleEditElement}
          onDeleteElement={handleDeleteElement}
          onReorderElement={handleReorderElement}
        />

        {/* Properties Panel */}
        <PropertiesPanel
          markdown={markdown}
          onCopy={handleCopyMarkdown}
          onShowPreview={handleShowPreviewModal}
        />

        {/* Markdown Preview Modal */}
        <Modal show={showPreviewModal} onClose={handleClosePreviewModal}>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(20,20,30,0.98)',
            color: '#fff',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            margin: 0,
            overflowY: 'auto',
          }}>
            <button style={{
              position: 'absolute',
              top: 32,
              right: 48,
              fontSize: 20,
              background: '#6366f1',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 28px',
              cursor: 'pointer',
              zIndex: 10001,
              boxShadow: '0 2px 8px #0004',
            }} onClick={handleClosePreviewModal}>Close Preview</button>
            <div style={{
              maxWidth: '900px',
              width: '90vw',
              minHeight: '200px',
              background: '#222',
              borderRadius: 18,
              boxShadow: '0 8px 40px #000a',
              padding: '48px 40px',
              marginTop: 0,
              marginBottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '100%',
                fontSize: 20,
                lineHeight: 1.7,
                overflow: 'auto',
              }}>
                <div
                  dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
                  style={{
                    width: '100%',
                  }}
                />
                <style>{`
                  .markdown-preview img {
                    max-width: 100%;
                    max-height: 400px;
                    border-radius: 12px;
                    display: block;
                    margin: 24px auto;
                    box-shadow: 0 2px 16px #0004;
                  }
                `}</style>
              </div>
            </div>
          </div>
        </Modal>
        {/* Help Modal */}
        <Modal show={showModal} onClose={handleCloseModal}>
          <h2>Keyboard Shortcuts</h2>
          <ul>
            <li><b>Ctrl + C</b>: Copy markdown</li>
            <li><b>Ctrl + Z</b>: Undo</li>
            <li><b>Ctrl + Y</b>: Redo</li>
          </ul>
          <button onClick={handleCloseModal}>Close</button>
        </Modal>
        {/* Example button to open modal */}
        <button style={{position: 'fixed', bottom: 20, right: 20}} onClick={handleOpenModal}>Show Shortcuts</button>
      </div>
    </>
  )
}

export default App
