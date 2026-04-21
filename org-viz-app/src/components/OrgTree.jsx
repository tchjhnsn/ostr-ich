import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NodeEditorInline from './editors/NodeEditorInline.jsx';

export default function OrgTree({
  node, colorScheme, expanded, expandAll, onToggle, onEdit, onAdd, onRemove,
  onUpdateNode,
  depth = 0, isLast = false, editMode,
}) {
  const [hovered, setHovered] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [inlineEdit, setInlineEdit] = useState(false);
  const ref = useRef(null);

  const theme = colorScheme[node.type] || colorScheme[Object.keys(colorScheme)[0]] || {};
  const hasChildren = node.children?.length > 0;
  const isOpen = expandAll || expanded[node.id];
  const isRoot = depth === 0;

  const nodeStyle = {
    flex: 1, display: 'flex', alignItems: 'center', gap: isRoot ? 10 : 10,
    padding: isRoot ? '14px 18px' : '11px 14px',
    marginBottom: 4,
    background: theme.bg || '#161616',
    border: `1px solid ${hovered ? (theme.color || '#444') + '66' : (theme.border || '#2e2e2e')}`,
    borderRadius: isRoot ? 10 : 7,
    cursor: 'pointer', userSelect: 'none',
    transition: 'border-color 0.12s',
    position: 'relative',
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    const rect = ref.current.getBoundingClientRect();
    setContextMenu({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleClick = () => {
    if (editMode === 'inline') {
      if (hasChildren) onToggle(node.id);
    } else {
      onEdit(node, null);
    }
  };

  const handleDoubleClick = () => {
    if (editMode === 'inline') {
      setInlineEdit(true);
    } else {
      onEdit(node, null);
    }
  };

  const handleEditAction = () => {
    if (editMode === 'inline') {
      setInlineEdit(true);
    } else {
      onEdit(node, null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        {/* Tree connector lines */}
        {depth > 0 && (
          <div style={{ width: 24, flexShrink: 0, position: 'relative' }}>
            <div style={{
              position: 'absolute', left: 11, top: 0,
              bottom: isLast ? '50%' : 0,
              width: 1, background: '#232323',
            }} />
            <div style={{
              position: 'absolute', left: 11, top: '50%',
              width: 13, height: 1, background: '#232323',
            }} />
          </div>
        )}

        {/* Node card */}
        <div
          ref={ref}
          tabIndex={0}
          style={nodeStyle}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          onContextMenu={handleContextMenu}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setContextMenu(null); }}
        >
          {/* Dot indicator */}
          <div style={{
            width: isRoot ? 9 : 7, height: isRoot ? 9 : 7,
            borderRadius: '50%', background: theme.color || '#555350', flexShrink: 0,
            boxShadow: `0 0 ${isRoot ? 10 : 6}px ${(theme.color || '#555350')}55`,
          }} />

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: isRoot ? 15 : 13, fontWeight: 600,
              color: isRoot ? (theme.textBright || '#d4d1cc') : (theme.textBright || '#7eb8f7'),
              lineHeight: 1.25,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {node.name}
            </div>
            {node.subtitle && (
              <div style={{
                fontSize: isRoot ? 12 : 11,
                color: theme.textDim || '#585654',
                fontFamily: 'var(--font-body)',
                marginTop: 2,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {node.subtitle}
              </div>
            )}
            {node.meta && (
              <div style={{
                fontSize: 10, color: theme.color || '#4a9eff',
                fontFamily: 'var(--font-body)', marginTop: 3,
                letterSpacing: '0.04em',
              }}>
                {node.meta}
              </div>
            )}
          </div>

          {/* Right side — children count + chevron */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            {/* Action buttons on hover */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  style={{ display: 'flex', gap: 4 }}
                >
                  <ActionBtn title="Add child" onClick={(e) => { e.stopPropagation(); onAdd(node.id); }}>+</ActionBtn>
                  <ActionBtn title="Edit" onClick={(e) => { e.stopPropagation(); handleEditAction(); }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M7.5 1.5l1 1-5.5 5.5H2V7L7.5 1.5z" stroke="currentColor" strokeWidth="0.8"/></svg>
                  </ActionBtn>
                  {depth > 0 && (
                    <ActionBtn title="Remove" onClick={(e) => { e.stopPropagation(); onRemove(node.id); }} danger>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
                    </ActionBtn>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {hasChildren && (
              <span style={{
                fontSize: 10, color: theme.textDim || '#585654',
                background: '#ffffff06', padding: '2px 6px', borderRadius: 4,
                border: `1px solid ${theme.border || '#2e2e2e'}`,
                fontFamily: 'var(--font-body)',
              }}>
                {node.children.length}
              </span>
            )}
            {hasChildren && (
              <motion.span
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.15 }}
                style={{
                  display: 'inline-block', fontSize: 10,
                  color: theme.textDim || '#585654', lineHeight: 1,
                  cursor: 'pointer',
                }}
                onClick={(e) => { e.stopPropagation(); onToggle(node.id); }}
              >
                ▶
              </motion.span>
            )}
          </div>

          {/* Context menu */}
          <AnimatePresence>
            {contextMenu && (
              <ContextMenu
                x={contextMenu.x}
                y={contextMenu.y}
                items={[
                  { label: 'Edit node', action: () => { setContextMenu(null); handleEditAction(); } },
                  { label: 'Add child', action: () => { setContextMenu(null); onAdd(node.id); } },
                  ...(hasChildren ? [{ label: isOpen ? 'Collapse' : 'Expand', action: () => { setContextMenu(null); onToggle(node.id); } }] : []),
                  ...(depth > 0 ? [{ label: 'Remove', action: () => { setContextMenu(null); onRemove(node.id); }, danger: true }] : []),
                ]}
                onClose={() => setContextMenu(null)}
              />
            )}
          </AnimatePresence>

          {/* Inline editor */}
          <AnimatePresence>
            {inlineEdit && editMode === 'inline' && (
              <NodeEditorInline
                node={node}
                colorScheme={colorScheme}
                onSave={(updates) => { onUpdateNode?.(node.id, updates); setInlineEdit(false); }}
                onDelete={depth > 0 ? () => { onRemove(node.id); setInlineEdit(false); } : undefined}
                onClose={() => setInlineEdit(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Children */}
      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ overflow: 'hidden', paddingLeft: depth === 0 ? 24 : 24 }}
          >
            {node.children.map((child, i) => (
              <OrgTree
                key={child.id}
                node={child}
                colorScheme={colorScheme}
                expanded={expanded}
                expandAll={expandAll}
                onToggle={onToggle}
                onEdit={onEdit}
                onAdd={onAdd}
                onRemove={onRemove}
                onUpdateNode={onUpdateNode}
                depth={depth + 1}
                isLast={i === node.children.length - 1}
                editMode={editMode}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActionBtn({ children, onClick, title, danger }) {
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 20, height: 20, borderRadius: 4,
        border: `1px solid ${danger ? '#5a202055' : '#ffffff12'}`,
        background: danger ? '#5a202022' : '#ffffff08',
        color: danger ? '#f06060' : '#888',
        cursor: 'pointer', fontSize: 12, fontWeight: 500,
        transition: 'all 0.1s',
      }}
    >
      {children}
    </button>
  );
}

function ContextMenu({ x, y, items, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.1 }}
      style={{
        position: 'absolute', left: x, top: y,
        background: '#1e1e1e', border: '1px solid #333',
        borderRadius: 8, padding: '4px 0', zIndex: 100,
        minWidth: 140, boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item, i) => (
        <button
          key={i}
          onClick={item.action}
          style={{
            display: 'block', width: '100%', textAlign: 'left',
            padding: '8px 14px', background: 'transparent', border: 'none',
            color: item.danger ? '#f06060' : '#ccc',
            fontFamily: 'var(--font-body)', fontSize: 12, cursor: 'pointer',
            transition: 'background 0.1s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#2a2a2a'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          {item.label}
        </button>
      ))}
    </motion.div>
  );
}
