import React, { useState } from 'react';
import './Sidebar.css';

const ELEMENTS = [
  {
    category: 'Text Elements',
    items: [
      { type: 'heading', icon: <span className="element-icon">H</span>, label: 'Heading' },
      { type: 'paragraph', icon: <span className="element-icon">T</span>, label: 'Paragraph' },
      { type: 'quote', icon: <span className="element-icon">"</span>, label: 'Quote' },
    ],
  },
  {
    category: 'Lists',
    items: [
      { type: 'list', icon: <span className="element-icon">•</span>, label: 'Bullet List' },
      { type: 'numbered-list', icon: <span className="element-icon">1</span>, label: 'Numbered List' },
    ],
  },
  {
    category: 'Media',
    items: [
      { type: 'image', icon: <span className="element-icon">🖼</span>, label: 'Image' },
      { type: 'link', icon: <span className="element-icon">🔗</span>, label: 'Link' },
    ],
  },
  {
    category: 'Code & Layout',
    items: [
      { type: 'code', icon: <span className="element-icon">{'<>'}</span>, label: 'Code Block' },
      { type: 'horizontal-rule', icon: <span className="element-icon">—</span>, label: 'Divider' },
      { type: 'table', icon: <span className="element-icon">⊞</span>, label: 'Table' },
      { type: 'text-to-md', icon: <span className="element-icon">📝</span>, label: 'Text to Markdown' },
    ],
  },
  {
    category: 'Advanced',
    items: [
      { type: 'emoji', icon: <span className="element-icon">😃</span>, label: 'Emoji' },
      { type: 'checkbox', icon: <span className="element-icon">☑️</span>, label: 'Checkbox List' },
      { type: 'radiobutton', icon: <span className="element-icon">🔘</span>, label: 'Radio Button List' },
      { type: 'uml', icon: <span className="element-icon">📊</span>, label: 'UML Diagram' },
      { type: 'color', icon: <span className="element-icon">🖍️</span>, label: 'Color Text' },
    ],
  },
];

// Task templates for assets tab
const TASK_TEMPLATES = [
  {
    label: 'Personal Know-How',
    content:
      '# 🔖 Task 9: Personal Know-How  \n' +
      '⭐ **300 Karma points**\n---\n' +
      '### • Powered by Ilmora ⚙️\n' +
      '### 📌 In this task, submit:\n' +
      '- 📄 Your latest **resume (PDF)**  \n' +
      '- 🎥 A **video (max 5 mins)** where you explain:  \n' +
      '  - Where AI will be in **2027**  \n' +
      '  - What major changes it might bring to **everyday life**  \n' +
      '---\n' +
      '### 🎤 Guidelines:\n' +
      '- Speak clearly in **English**  \n' +
      '- Ensure **good lighting** and **sound quality**  \n' +
      '---\n' +
      '### 📤 Submission:\n' +
      'Upload both the **video** and **resume** to a **GitHub repo** or **Google Drive**.  \n' +
      'Share the link in the **#ai channel** using the hashtag **#cl-ai-personalknowhow**  \n' +
      'to earn ⭐ **300 karma points**.'
  },
  {
    label: 'Sentiment Classifier (BERT)',
    content:
      '# 🔖 **Task 2: Fine-Tune a Sentiment Classifier using BERT** :⭐ 200 Karma Points\n' +
      '**Powered by Supe AI ✨**\n' +
      'In this task, you\'ll build and fine-tune a **BERT-based sentiment classifier** that can label text reviews (like movie or product reviews) as **Positive**, **Negative**, or **Neutral** 🎭.\n' +
      'You\'ll work with **sentiment datasets**, train using **PyTorch** or **TensorFlow**, and evaluate your model using **accuracy**, **F1-score**, and a **confusion matrix** 📊. Use **Weights & Biases** for experiment tracking and logging.\n' +
      '## 🔗 Check out: [Resource](https://youtu.be/8N-nM3QW7O0?si=gMI74MwhxHjbGBqr)\n' +
      '## 📦 Deliverables\n' +
      '* A deployed sentiment classifier\n' +
      '* Jupyter Notebook (.ipynb) showing preprocessing, training, and evaluation\n' +
      '* A short report covering dataset, training results, and improvement ideas\n' +
      '## 📤 After completing this task\n' +
      'Upload your notebook, app code, and report to GitHub. Share your repo in the generative-ai with the hashtag **#cl-genai-bertsentiment** to earn your :⭐ **200 karma points**.'
  },
  {
    label: 'LLM Fine-Tune on PDF',
    content:
      '# 🔖 **Task 3: Fine-Tune an Open-Source LLM on a Custom PDF Document** :⭐ 300 Karma points\n' +
      '**Powered by Supe AI!**\n' +
      'In this task, you\'ll fine-tune an open-source Large Language Model (e.g., Mistral-7B) using content from a specific PDF to create a domain-specific expert.\n' +
      'Choose a text-rich PDF document that will serve as the knowledge base for your expert model. The document should be substantial, with **over 100,000 words**.\n' +
      'Suitable examples include:\n' +
      '* The Constitution of India\n' +
      '* Classic literature (*Moby Dick*, *War and Peace*)\n' +
      '* Religious texts\n' +
      '* Comprehensive technical manuals\n' +
      'Use tools like LangChain, transformers, peft, datasets, and pypdf — all within a Google Colab environment (with GPU) 🚀.\n' +
      '## 🔗 Check out: [Resource](https://huggingface.co/learn/llm-course/chapter1/1)\n' +
      '## 📦 Deliverables:\n' +
      '1. **LoRA Adapter Weights**: Uploaded to Hugging Face Hub (public).\n' +
      '2. **Demo UI**: Gradio/Streamlit app hosted on Hugging Face Spaces.\n' +
      '3. **README.md**: With project overview, usage instructions, and fine-tuning results.\n' +
      '## 📤 Submission\n' +
      'Submit both your GitHub repo and Hugging Face links in the **generative-ai** channel using **#cl-genai-llmfinetune** to earn your ⭐ **300 karma points!'
  },
  {
    label: 'Nessus TryHackMe',
    content:
      '# 🔖 Task 7: Nessus 💯 100 Karma points\n' +
      'In this task, you have to showcase your proficiency in using **Nessus** by successfully completing all the tasks in the TryHackMe room "RP: Nessus Redux" and achieving a 100% completion status.\n' +
      '**Challenge Link:** [TryHackMe RP: Nessus Redux](https://tryhackme.com/room/rpnessusredux)\n' +
      'After completing the task, share your public profile URL in the cyber security channel using the hashtag **#cl-cybersec-thmnessus** to avail 💯 100 karma points.'
  },
  {
    label: 'OWASP Juice Shop',
    content:
      '# 🔖 Task 2: OWASP Juice Shop ⭐⭐ 400 Karma points\n' +
      'In this task, you have to demonstrate your expertise in web application security by successfully completing all the tasks in the TryHackMe room "OWASP Juice Shop" and achieving a 100% completion status.\n' +
      '**Challenge Link:** [TryHackMe OWASP Juice Shop](https://tryhackme.com/room/owaspjuiceshop)\n' +
      'After completing the task, share your public profile URL in the Cyber Security channel using the hashtag **#cl-cybersec-owaspjuiceshop** to avail ⭐⭐ 400 karma points.'
  },
];

function Sidebar({ onDragStart }) {
  const [activeTab, setActiveTab] = useState('elements');
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">M</div>
        <div className="app-title">MarkSuit</div>
      </div>
      <div className="sidebar-tabs">
        <button className={`tab${activeTab === 'elements' ? ' active' : ''}`} onClick={() => setActiveTab('elements')} data-tab="elements">Elements</button>
        <button className={`tab${activeTab === 'assets' ? ' active' : ''}`} onClick={() => setActiveTab('assets')} data-tab="assets">Assets</button>
      </div>
      <div className="elements-panel" style={{ display: activeTab === 'elements' ? 'block' : 'none' }}>
        {ELEMENTS.map(cat => (
          <div className="element-category" key={cat.category}>
            <div className="category-title">{cat.category}</div>
            {cat.items.map(item => (
              <div
                className="element-item"
                key={item.type}
                draggable
                data-type={item.type}
                onDragStart={() => {
                  // Provide default content for advanced elements
                  let template = '';
                  if (item.type === 'emoji') template = '😃';
                  if (item.type === 'checkbox') template = '- [ ] Task 1\n- [x] Task 2';
                  if (item.type === 'radiobutton') template = '( ) Option 1\n(*) Option 2';
                  if (item.type === 'uml') template = '```mermaid\nclassDiagram\n  Animal <|-- Duck\n  Animal <|-- Fish\n  Animal <|-- Zebra\n  Animal : +int age\n  Animal : +isMammal()\n  Animal : +mate()\n```';
                  if (item.type === 'color') template = '<span style="color: #ff5733;">Colored Text Example</span>';
                  if (template) {
                    onDragStart('template', template);
                  } else {
                    onDragStart(item.type);
                  }
                }}
              >
                {item.icon}
                <div>{item.label}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="elements-panel" style={{ display: activeTab === 'assets' ? 'block' : 'none' }}>
        <div className="element-category">
          <div className="category-title">Task Templates</div>
            {TASK_TEMPLATES.concat([
              {
                label: 'Emoji',
                type: 'emoji',
                icon: '😃',
                template: '😃'
              },
              {
                label: 'Checkbox List',
                type: 'checkbox',
                icon: '☑️',
                template: '- [ ] Task 1\n- [x] Task 2'
              },
              {
                label: 'Radio Button List',
                type: 'radiobutton',
                icon: '🔘',
                template: '( ) Option 1\n(*) Option 2'
              },
              {
                label: 'UML Diagram',
                type: 'uml',
                icon: '📊',
                template: '```mermaid\nclassDiagram\n  Animal <|-- Duck\n  Animal <|-- Fish\n  Animal <|-- Zebra\n  Animal : +int age\n  Animal : +isMammal()\n  Animal : +mate()\n```'
              },
              {
                label: 'Color Text',
                type: 'color',
                icon: '🖍️',
                template: '<span style="color: #ff5733;">Colored Text Example</span>'
              },
            ]).map((tpl, idx) => (
              <div
                className="element-item"
                key={tpl.label}
                draggable
                data-type="template"
                onDragStart={() => onDragStart('template', tpl.content)}
              >
                <span className="element-icon">📄</span>
                <div>{tpl.label}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
