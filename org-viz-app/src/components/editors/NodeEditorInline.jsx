// Inline edit mode — editing happens directly in OrgTree via context menu + hover actions
// This is a passthrough — inline mode uses the OrgTree's built-in hover buttons
// and context menu. No separate editor component needed; the "edit" action in
// inline mode opens a lightweight popover directly on the node.

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function NodeEditorInline({ node, colorScheme, position, onSave, onDelete, onClose }) {
  const [name, setName] = useState(node.name || '');
  const [subtitle, setSubtitle] = useState(node.subtitle || '');
  const [meta, setMeta] = useState(node.meta || '');
  const [type, setType] = useState(node.type || Object.keys(colorScheme)[0]);
  const ref = useRef(null);

  const typeOptions = Object.entries(colorScheme).map(([key, val]) => ({ key, ...val }));

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), subtitle: subtitle.trim(), meta: meta.trim(), type });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -4, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.98 }}
      transition={{ duration: 0.12 }}
      style={{
        position: 'absolute', left: 0, right: 0, top: '100%',
        marginTop: 4,
        background: '#1a1a1a', border: '1px solid #333',
        borderRadius: 10, padding: 14, zIndex: 50,
        boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
      }}
      onClick={e => e.stopPropagation()}
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input
          autoFocus
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          onKeyDown={e => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') onClose(); }}
          style={{
            flex: 2, background: '#0d0d0d', border: '1px solid #2a2a2a',
            borderRadius: 5, padding: '6px 8px', color: '#ede9e3',
            fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 600,
            outline: 'none',
          }}
        />
        <input
          value={subtitle}
          onChange={e => setSubtitle(e.target.value)}
          placeholder="Subtitle"
          onKeyDown={e => { if (e.key === 'Enter') handleSave(); }}
          style={{
            flex: 2, background: '#0d0d0d', border: '1px solid #2a2a2a',
            borderRadius: 5, padding: '6px 8px', color: '#999',
            fontFamily: 'var(--font-body)', fontSize: 11, outline: 'none',
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <input
          value={meta}
          onChange={e => setMeta(e.target.value)}
          placeholder="Meta (e.g. CEO: Name)"
          onKeyDown={e => { if (e.key === 'Enter') handleSave(); }}
          style={{
            flex: 1, background: '#0d0d0d', border: '1px solid #2a2a2a',
            borderRadius: 5, padding: '6px 8px', color: '#999',
            fontFamily: 'var(--font-body)', fontSize: 11, outline: 'none',
          }}
        />
      </div>
      {/* Type chips */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
        {typeOptions.map(t => (
          <button
            key={t.key}
            onClick={() => setType(t.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '3px 8px', borderRadius: 4,
              border: `1px solid ${type === t.key ? t.color + '66' : '#222'}`,
              background: type === t.key ? t.bg : 'transparent',
              color: type === t.key ? t.textBright : '#555',
              fontFamily: 'var(--font-body)', fontSize: 10,
              cursor: 'pointer',
            }}
          >
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: t.color, opacity: type === t.key ? 1 : 0.4 }} />
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
        {onDelete && (
          <button onClick={onDelete} style={{
            marginRight: 'auto', padding: '4px 10px', borderRadius: 5,
            border: '1px solid #5a202055', background: 'transparent',
            color: '#f06060', fontFamily: 'var(--font-body)', fontSize: 10,
            cursor: 'pointer',
          }}>Delete</button>
        )}
        <button onClick={onClose} style={{
          padding: '4px 10px', borderRadius: 5, border: '1px solid #333',
          background: 'transparent', color: '#777', fontFamily: 'var(--font-body)',
          fontSize: 10, cursor: 'pointer',
        }}>Cancel</button>
        <button onClick={handleSave} style={{
          padding: '4px 14px', borderRadius: 5, border: 'none',
          background: '#4a9eff', color: '#fff', fontFamily: 'var(--font-body)',
          fontSize: 10, fontWeight: 500, cursor: 'pointer',
        }}>Save</button>
      </div>
    </motion.div>
  );
}
