import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Sidebar({ orgs, activeId, onSwitch, onCreate, onDelete, onDuplicate, onRename, onClose }) {
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  const orgList = Object.values(orgs);

  function countNodes(node) {
    let c = 1;
    (node.children || []).forEach(ch => c += countNodes(ch));
    return c;
  }

  const handleCreate = () => {
    if (newName.trim()) {
      onCreate(newName.trim(), newSubtitle.trim());
      setNewName('');
      setNewSubtitle('');
      setCreating(false);
    }
  };

  const handleRename = (id) => {
    if (renameValue.trim()) {
      onRename(id, renameValue.trim(), orgs[id]?.subtitle || '');
      setRenamingId(null);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          zIndex: 50,
        }}
      />

      {/* Sidebar panel */}
      <motion.div
        initial={{ x: -320, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -320, opacity: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        style={{
          position: 'fixed', left: 0, top: 0, bottom: 0,
          width: 320, background: '#111', borderRight: '1px solid #222',
          zIndex: 51, display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px 20px 16px', borderBottom: '1px solid #1e1e1e',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              fontSize: 10, fontFamily: 'var(--font-body)', color: '#3d8aee',
              letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4,
            }}>
              Organizations
            </div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600,
              color: '#ede9e3',
            }}>
              Your Structures
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 30, height: 30, borderRadius: 6, border: '1px solid #2a2a2a',
              background: 'transparent', color: '#666', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16,
            }}
          >
            &times;
          </button>
        </div>

        {/* Org cards list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
          {orgList.map(org => {
            const isActive = org.id === activeId;
            const nodeCount = countNodes(org.root);
            const typeColors = Object.values(org.colorScheme || {}).map(c => c.color);
            const isHovered = hoveredCard === org.id;

            return (
              <div
                key={org.id}
                onClick={() => onSwitch(org.id)}
                onMouseEnter={() => setHoveredCard(org.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: '14px 16px', marginBottom: 8,
                  background: isActive ? '#1a1a2e' : isHovered ? '#181818' : '#141414',
                  border: `1px solid ${isActive ? '#2a2a5a' : '#1e1e1e'}`,
                  borderRadius: 10, cursor: 'pointer',
                  transition: 'all 0.12s',
                }}
              >
                {renamingId === org.id ? (
                  <input
                    autoFocus
                    value={renameValue}
                    onChange={e => setRenameValue(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleRename(org.id); if (e.key === 'Escape') setRenamingId(null); }}
                    onBlur={() => handleRename(org.id)}
                    onClick={e => e.stopPropagation()}
                    style={{
                      width: '100%', background: '#0d0d0d', border: '1px solid #333',
                      borderRadius: 5, padding: '6px 8px', color: '#ede9e3',
                      fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600,
                      outline: 'none',
                    }}
                  />
                ) : (
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600,
                    color: isActive ? '#a0b4f0' : '#d4d1cc', marginBottom: 4,
                    lineHeight: 1.25,
                  }}>
                    {org.name}
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                  {/* Color dots preview */}
                  <div style={{ display: 'flex', gap: 3 }}>
                    {typeColors.slice(0, 4).map((c, i) => (
                      <div key={i} style={{
                        width: 5, height: 5, borderRadius: '50%', background: c,
                        opacity: 0.7,
                      }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 10, color: '#555', fontFamily: 'var(--font-body)' }}>
                    {nodeCount} node{nodeCount !== 1 ? 's' : ''}
                  </span>
                  {org.subtitle && (
                    <span style={{ fontSize: 10, color: '#444', fontFamily: 'var(--font-body)' }}>
                      {org.subtitle}
                    </span>
                  )}
                </div>

                {/* Action buttons on hover */}
                {isHovered && (
                  <div style={{ display: 'flex', gap: 6, marginTop: 8 }} onClick={e => e.stopPropagation()}>
                    <SmallBtn onClick={() => { setRenamingId(org.id); setRenameValue(org.name); }}>Rename</SmallBtn>
                    <SmallBtn onClick={() => onDuplicate(org.id)}>Duplicate</SmallBtn>
                    {orgList.length > 1 && (
                      <SmallBtn danger onClick={() => {
                        if (confirm(`Delete "${org.name}"?`)) onDelete(org.id);
                      }}>Delete</SmallBtn>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Create new */}
          {creating ? (
            <div style={{
              padding: '14px 16px', background: '#141414',
              border: '1px solid #2a2a2a', borderRadius: 10, marginTop: 4,
            }}>
              <input
                autoFocus
                placeholder="Organization name"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleCreate(); if (e.key === 'Escape') setCreating(false); }}
                style={{
                  width: '100%', background: '#0d0d0d', border: '1px solid #333',
                  borderRadius: 5, padding: '8px 10px', color: '#ede9e3',
                  fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 500,
                  outline: 'none', marginBottom: 6,
                }}
              />
              <input
                placeholder="Subtitle (optional)"
                value={newSubtitle}
                onChange={e => setNewSubtitle(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleCreate(); }}
                style={{
                  width: '100%', background: '#0d0d0d', border: '1px solid #2a2a2a',
                  borderRadius: 5, padding: '6px 10px', color: '#999',
                  fontFamily: 'var(--font-body)', fontSize: 11,
                  outline: 'none', marginBottom: 10,
                }}
              />
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={handleCreate} style={{
                  flex: 1, padding: '7px 0', borderRadius: 6, border: 'none',
                  background: '#4a9eff', color: '#fff', fontFamily: 'var(--font-body)',
                  fontSize: 12, fontWeight: 500, cursor: 'pointer',
                }}>Create</button>
                <button onClick={() => setCreating(false)} style={{
                  padding: '7px 14px', borderRadius: 6, border: '1px solid #333',
                  background: 'transparent', color: '#888', fontFamily: 'var(--font-body)',
                  fontSize: 12, cursor: 'pointer',
                }}>Cancel</button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setCreating(true)}
              style={{
                width: '100%', padding: '12px 16px', marginTop: 4,
                background: 'transparent', border: '1px dashed #2a2a2a',
                borderRadius: 10, color: '#555', fontFamily: 'var(--font-body)',
                fontSize: 12, cursor: 'pointer', transition: 'all 0.12s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#444'; e.currentTarget.style.color = '#888'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#555'; }}
            >
              + New organization
            </button>
          )}
        </div>
      </motion.div>
    </>
  );
}

function SmallBtn({ children, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '3px 8px', borderRadius: 4,
        border: `1px solid ${danger ? '#5a202055' : '#2a2a2a'}`,
        background: danger ? '#5a202022' : 'transparent',
        color: danger ? '#f06060' : '#777',
        fontFamily: 'var(--font-body)', fontSize: 10, cursor: 'pointer',
        transition: 'all 0.1s',
      }}
    >
      {children}
    </button>
  );
}
