import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function NodeEditorPanel({ node, colorScheme, onSave, onDelete, onClose }) {
  const [name, setName] = useState(node.name || '');
  const [subtitle, setSubtitle] = useState(node.subtitle || '');
  const [meta, setMeta] = useState(node.meta || '');
  const [type, setType] = useState(node.type || Object.keys(colorScheme)[0]);

  // Reset when node changes
  useEffect(() => {
    setName(node.name || '');
    setSubtitle(node.subtitle || '');
    setMeta(node.meta || '');
    setType(node.type || Object.keys(colorScheme)[0]);
  }, [node.id]);

  const typeOptions = Object.entries(colorScheme).map(([key, val]) => ({ key, ...val }));
  const theme = colorScheme[type] || {};

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), subtitle: subtitle.trim(), meta: meta.trim(), type });
  };

  return (
    <motion.div
      initial={{ x: 380, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 380, opacity: 0 }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
      style={{
        position: 'fixed', right: 0, top: 0, bottom: 0,
        width: 360, background: '#111', borderLeft: '1px solid #222',
        zIndex: 40, display: 'flex', flexDirection: 'column',
        boxShadow: '-10px 0 40px rgba(0,0,0,0.3)',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '24px 20px 16px', borderBottom: '1px solid #1e1e1e',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600,
          color: theme.textBright || '#ede9e3',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: theme.color || '#555',
            boxShadow: `0 0 8px ${(theme.color || '#555')}55`,
          }} />
          Edit Node
        </div>
        <button
          onClick={onClose}
          style={{
            width: 28, height: 28, borderRadius: 6, border: '1px solid #2a2a2a',
            background: 'transparent', color: '#666', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14,
          }}
        >
          &times;
        </button>
      </div>

      {/* Form */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px' }}>
        <PanelField label="Name" value={name} onChange={setName} autoFocus />
        <PanelField label="Subtitle" value={subtitle} onChange={setSubtitle} />
        <PanelField label="Meta info" value={meta} onChange={setMeta} placeholder="e.g. CEO: Name" />

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, color: '#666', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
            Type
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {typeOptions.map(t => (
              <button
                key={t.key}
                onClick={() => setType(t.key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 12px', borderRadius: 7,
                  border: `1px solid ${type === t.key ? t.color + '66' : '#1e1e1e'}`,
                  background: type === t.key ? t.bg : 'transparent',
                  color: type === t.key ? t.textBright : '#555',
                  fontFamily: 'var(--font-body)', fontSize: 12,
                  cursor: 'pointer', transition: 'all 0.12s', textAlign: 'left',
                }}
              >
                <div style={{
                  width: 6, height: 6, borderRadius: '50%', background: t.color,
                  opacity: type === t.key ? 1 : 0.4,
                }} />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '16px 20px', borderTop: '1px solid #1e1e1e',
        display: 'flex', gap: 8,
      }}>
        {onDelete && (
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
          padding: '8px 16px', borderRadius: 7, border: '1px solid #333',
          background: 'transparent', color: '#888', fontFamily: 'var(--font-body)',
          fontSize: 12, cursor: 'pointer',
        }}>
          Cancel
        </button>
        <button onClick={handleSave} style={{
          padding: '8px 20px', borderRadius: 7, border: 'none',
          background: '#4a9eff', color: '#fff', fontFamily: 'var(--font-body)',
          fontSize: 12, fontWeight: 500, cursor: 'pointer',
        }}>
          Save
        </button>
      </div>
    </motion.div>
  );
}

function PanelField({ label, value, onChange, autoFocus, placeholder }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 10, color: '#666', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
        {label}
      </div>
      <input
        autoFocus={autoFocus}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', background: '#0a0a0a', border: '1px solid #242424',
          borderRadius: 7, padding: '9px 12px', color: '#ede9e3',
          fontFamily: 'var(--font-body)', fontSize: 13, outline: 'none',
        }}
        onFocus={e => e.currentTarget.style.borderColor = '#3a3a3a'}
        onBlur={e => e.currentTarget.style.borderColor = '#242424'}
      />
    </div>
  );
}
