import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NodeEditorModal({ node, colorScheme, isNew, onSave, onDelete, onClose }) {
  const [name, setName] = useState(node.name || '');
  const [subtitle, setSubtitle] = useState(node.subtitle || '');
  const [meta, setMeta] = useState(node.meta || '');
  const [type, setType] = useState(node.type || Object.keys(colorScheme)[0]);

  const typeOptions = Object.entries(colorScheme).map(([key, val]) => ({ key, ...val }));

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), subtitle: subtitle.trim(), meta: meta.trim(), type });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100 }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400, maxWidth: '90vw',
          background: '#161616', border: '1px solid #2a2a2a',
          borderRadius: 14, padding: 28, zIndex: 101,
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        }}
      >
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600,
          color: '#ede9e3', marginBottom: 20,
        }}>
          {isNew ? 'Add Node' : 'Edit Node'}
        </div>

        <FormField label="Name" value={name} onChange={setName} autoFocus placeholder="Node name" />
        <FormField label="Subtitle" value={subtitle} onChange={setSubtitle} placeholder="Brief description" />
        <FormField label="Meta" value={meta} onChange={setMeta} placeholder="e.g. CEO: John Smith" />

        {/* Type selector */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, color: '#666', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
            Type
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {typeOptions.map(t => (
              <button
                key={t.key}
                onClick={() => setType(t.key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '5px 10px', borderRadius: 6,
                  border: `1px solid ${type === t.key ? t.color + '88' : '#2a2a2a'}`,
                  background: type === t.key ? t.bg : 'transparent',
                  color: type === t.key ? t.textBright : '#666',
                  fontFamily: 'var(--font-body)', fontSize: 11,
                  cursor: 'pointer', transition: 'all 0.12s',
                }}
              >
                <div style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: t.color, opacity: type === t.key ? 1 : 0.5,
                }} />
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          {!isNew && onDelete && (
            <button onClick={onDelete} style={{
              marginRight: 'auto', padding: '8px 14px', borderRadius: 7,
              border: '1px solid #5a202055', background: '#5a202022',
              color: '#f06060', fontFamily: 'var(--font-body)', fontSize: 12,
              cursor: 'pointer',
            }}>
              Delete
            </button>
          )}
          <button onClick={onClose} style={{
            padding: '8px 18px', borderRadius: 7,
            border: '1px solid #333', background: 'transparent',
            color: '#888', fontFamily: 'var(--font-body)', fontSize: 12,
            cursor: 'pointer',
          }}>
            Cancel
          </button>
          <button onClick={handleSave} style={{
            padding: '8px 22px', borderRadius: 7,
            border: 'none', background: '#4a9eff', color: '#fff',
            fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
            cursor: 'pointer',
          }}>
            {isNew ? 'Add' : 'Save'}
          </button>
        </div>
      </motion.div>
    </>
  );
}

function FormField({ label, value, onChange, autoFocus, placeholder }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 10, color: '#666', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
        {label}
      </div>
      <input
        autoFocus={autoFocus}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', background: '#0d0d0d', border: '1px solid #2a2a2a',
          borderRadius: 7, padding: '9px 12px', color: '#ede9e3',
          fontFamily: 'var(--font-body)', fontSize: 13, outline: 'none',
          transition: 'border-color 0.12s',
        }}
        onFocus={e => e.currentTarget.style.borderColor = '#444'}
        onBlur={e => e.currentTarget.style.borderColor = '#2a2a2a'}
      />
    </div>
  );
}
