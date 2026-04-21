import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  loadAllOrgs, saveAllOrgs, loadActiveId, saveActiveId,
  loadSettings, saveSettings,
  createOrg, deleteOrg, duplicateOrg,
  addNode, updateNode, removeNode,
} from '../stores/orgStore.js';
import OrgTree from './OrgTree.jsx';
import Sidebar from './Sidebar.jsx';
import SettingsMenu from './SettingsMenu.jsx';
import NodeEditorInline from './editors/NodeEditorInline.jsx';
import NodeEditorPanel from './editors/NodeEditorPanel.jsx';
import NodeEditorModal from './editors/NodeEditorModal.jsx';

export default function App() {
  const [orgs, setOrgs] = useState({});
  const [activeId, setActiveId] = useState(null);
  const [settings, setSettings] = useState({ editMode: 'inline' });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editingNode, setEditingNode] = useState(null); // { node, parentId }
  const [addingTo, setAddingTo] = useState(null); // parentId for new node
  const [expanded, setExpanded] = useState({});
  const [expandAll, setExpandAll] = useState(false);
  const initialized = useRef(false);

  // ─── Init from localStorage ───
  useEffect(() => {
    const o = loadAllOrgs();
    const a = loadActiveId();
    const s = loadSettings();
    setOrgs(o);
    setActiveId(a in o ? a : Object.keys(o)[0]);
    setSettings(s);
    initialized.current = true;
  }, []);

  // ─── Persist on change ───
  useEffect(() => { if (initialized.current) saveAllOrgs(orgs); }, [orgs]);
  useEffect(() => { if (initialized.current && activeId) saveActiveId(activeId); }, [activeId]);
  useEffect(() => { if (initialized.current) saveSettings(settings); }, [settings]);

  const activeOrg = orgs[activeId];

  // ─── Org-level actions ───
  const handleCreateOrg = useCallback((name, subtitle) => {
    const org = createOrg(name, subtitle);
    setOrgs(prev => ({ ...prev, [org.id]: org }));
    setActiveId(org.id);
    setSidebarOpen(false);
  }, []);

  const handleDeleteOrg = useCallback((id) => {
    setOrgs(prev => {
      const next = deleteOrg(prev, id);
      if (activeId === id) {
        const remaining = Object.keys(next);
        setActiveId(remaining[0] || null);
      }
      return next;
    });
  }, [activeId]);

  const handleDuplicateOrg = useCallback((id) => {
    setOrgs(prev => duplicateOrg(prev, id));
  }, []);

  const handleRenameOrg = useCallback((id, name, subtitle) => {
    setOrgs(prev => ({
      ...prev,
      [id]: { ...prev[id], name, subtitle }
    }));
  }, []);

  const handleSwitchOrg = useCallback((id) => {
    setActiveId(id);
    setExpanded({});
    setExpandAll(false);
    setSidebarOpen(false);
  }, []);

  // ─── Node-level actions ───
  const handleAddNode = useCallback((parentId, nodeData) => {
    if (!activeOrg) return;
    const newRoot = addNode(activeOrg.root, parentId, nodeData);
    setOrgs(prev => ({
      ...prev,
      [activeId]: { ...prev[activeId], root: newRoot }
    }));
    setAddingTo(null);
  }, [activeOrg, activeId]);

  const handleUpdateNode = useCallback((nodeId, updates) => {
    if (!activeOrg) return;
    const newRoot = updateNode(activeOrg.root, nodeId, updates);
    setOrgs(prev => ({
      ...prev,
      [activeId]: { ...prev[activeId], root: newRoot }
    }));
    setEditingNode(null);
  }, [activeOrg, activeId]);

  const handleRemoveNode = useCallback((nodeId) => {
    if (!activeOrg) return;
    const newRoot = removeNode(activeOrg.root, nodeId);
    setOrgs(prev => ({
      ...prev,
      [activeId]: { ...prev[activeId], root: newRoot }
    }));
    setEditingNode(null);
  }, [activeOrg, activeId]);

  // ─── Expand/Collapse ───
  const toggleExpand = useCallback((nodeId) => {
    setExpanded(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  }, []);

  const handleExpandAll = useCallback(() => {
    if (!activeOrg) return;
    const all = {};
    function walk(node) {
      if (node.children?.length) {
        all[node.id] = true;
        node.children.forEach(walk);
      }
    }
    walk(activeOrg.root);
    setExpanded(all);
    setExpandAll(true);
  }, [activeOrg]);

  const handleCollapseAll = useCallback(() => {
    setExpanded({});
    setExpandAll(false);
  }, []);

  // ─── Edit mode dispatch ───
  const handleStartEdit = useCallback((node, parentId) => {
    setEditingNode({ node, parentId });
  }, []);

  const handleStartAdd = useCallback((parentId) => {
    setAddingTo(parentId);
  }, []);

  // ─── Loading state ───
  if (!initialized.current || !activeOrg) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--text3)', fontFamily: 'var(--font-body)' }}>Loading...</div>
      </div>
    );
  }

  const colorScheme = activeOrg.colorScheme || {};
  const nodeTypes = Object.entries(colorScheme).map(([key, v]) => ({ key, ...v }));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex' }}>
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <Sidebar
            orgs={orgs}
            activeId={activeId}
            onSwitch={handleSwitchOrg}
            onCreate={handleCreateOrg}
            onDelete={handleDeleteOrg}
            onDuplicate={handleDuplicateOrg}
            onRename={handleRenameOrg}
            onClose={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0, paddingBottom: 80 }}>
        {/* Header */}
        <div style={{
          padding: 'clamp(28px,4vw,48px) clamp(20px,5vw,52px) 20px',
          borderBottom: '1px solid #1a1a1a',
          marginBottom: 28,
          position: 'sticky',
          top: 0,
          background: '#0d0d0df0',
          backdropFilter: 'blur(14px)',
          zIndex: 10,
        }}>
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <div style={{
                  fontSize: 10, fontFamily: 'var(--font-body)', color: '#3d8aee',
                  letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6,
                }}>
                  {activeOrg.subtitle || 'Organization'}
                </div>
                <h1 style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3.5vw,34px)',
                  fontWeight: 700, color: '#ede9e3', letterSpacing: '-0.02em', lineHeight: 1.1,
                }}>
                  {activeOrg.name}
                </h1>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0, paddingTop: 4 }}>
                <HeaderButton onClick={() => setSidebarOpen(true)} title="Switch org">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="10" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="1" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="10" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/></svg>
                </HeaderButton>
                <HeaderButton onClick={() => setSettingsOpen(true)} title="Settings">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                </HeaderButton>
              </div>
            </div>

            {/* Controls row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 14, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 7 }}>
                <ControlButton active onClick={handleExpandAll}>Expand all</ControlButton>
                <ControlButton onClick={handleCollapseAll}>Collapse</ControlButton>
              </div>
              {/* Legend */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {nodeTypes.map(t => (
                  <div key={t.key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: '50%', background: t.color,
                      boxShadow: `0 0 5px ${t.color}77`,
                    }} />
                    <span style={{ fontSize: 11, color: '#484644', fontFamily: 'var(--font-body)' }}>{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tree */}
        <div style={{ padding: '0 clamp(20px,5vw,52px)', maxWidth: 880, margin: '0 auto' }}>
          <OrgTree
            node={activeOrg.root}
            colorScheme={colorScheme}
            expanded={expanded}
            expandAll={expandAll}
            onToggle={toggleExpand}
            onEdit={handleStartEdit}
            onAdd={handleStartAdd}
            onRemove={handleRemoveNode}
            onUpdateNode={handleUpdateNode}
            depth={0}
            isLast={true}
            editMode={settings.editMode}
          />
        </div>
      </div>

      {/* Edit node — dispatches to correct editor mode */}
      <AnimatePresence>
        {editingNode && settings.editMode === 'modal' && (
          <NodeEditorModal
            node={editingNode.node}
            colorScheme={colorScheme}
            onSave={(updates) => handleUpdateNode(editingNode.node.id, updates)}
            onDelete={() => handleRemoveNode(editingNode.node.id)}
            onClose={() => setEditingNode(null)}
          />
        )}
        {editingNode && settings.editMode === 'panel' && (
          <NodeEditorPanel
            node={editingNode.node}
            colorScheme={colorScheme}
            onSave={(updates) => handleUpdateNode(editingNode.node.id, updates)}
            onDelete={() => handleRemoveNode(editingNode.node.id)}
            onClose={() => setEditingNode(null)}
          />
        )}
      </AnimatePresence>

      {/* Add node */}
      <AnimatePresence>
        {addingTo && (
          <NodeEditorModal
            node={{ name: '', subtitle: '', type: Object.keys(colorScheme)[0], meta: '' }}
            colorScheme={colorScheme}
            isNew
            onSave={(data) => handleAddNode(addingTo, data)}
            onClose={() => setAddingTo(null)}
          />
        )}
      </AnimatePresence>

      {/* Settings */}
      <AnimatePresence>
        {settingsOpen && (
          <SettingsMenu
            settings={settings}
            onUpdate={(next) => setSettings(next)}
            onClose={() => setSettingsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Small UI primitives ───
function HeaderButton({ children, onClick, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 34, height: 34, borderRadius: 8, border: '1px solid #2a2a2a',
        background: 'transparent', color: '#666', cursor: 'pointer',
        transition: 'all 0.12s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#444'; e.currentTarget.style.color = '#999'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#666'; }}
    >
      {children}
    </button>
  );
}

function ControlButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-body)', fontSize: 11,
        color: active ? '#4a9eff' : '#3a3a3a',
        background: 'transparent',
        border: `1px solid ${active ? '#4a9eff55' : '#3a3a3a55'}`,
        borderRadius: 5, padding: '5px 12px', cursor: 'pointer',
        letterSpacing: '0.03em', transition: 'all 0.12s',
      }}
    >
      {children}
    </button>
  );
}
