import { motion } from 'framer-motion';

const EDIT_MODES = [
  {
    key: 'inline',
    label: 'Inline + Context Menu',
    description: 'Right-click or hover to edit. Quick edits happen in a popover directly on the node.',
  },
  {
    key: 'panel',
    label: 'Side Panel',
    description: 'Click a node to open a side drawer with a full edit form. Keeps the tree visible.',
  },
  {
    key: 'modal',
    label: 'Modal Dialog',
    description: 'Click a node to open a centered modal form. Clean and focused.',
  },
];

export default function SettingsMenu({ settings, onUpdate, onClose }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100 }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 440, maxWidth: '90vw',
          background: '#141414', border: '1px solid #2a2a2a',
          borderRadius: 14, padding: 28, zIndex: 101,
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <div style={{
              fontSize: 10, fontFamily: 'var(--font-body)', color: '#3d8aee',
              letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4,
            }}>
              Preferences
            </div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: '#ede9e3',
            }}>
              Settings
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

        {/* Edit mode selection */}
        <div style={{ marginBottom: 8 }}>
          <div style={{
            fontSize: 10, color: '#666', fontFamily: 'var(--font-body)',
            letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10,
          }}>
            Node Editing Interface
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {EDIT_MODES.map(mode => {
              const isActive = settings.editMode === mode.key;
              return (
                <button
                  key={mode.key}
                  onClick={() => onUpdate({ ...settings, editMode: mode.key })}
                  style={{
                    textAlign: 'left', padding: '12px 16px',
                    background: isActive ? '#1a1a2e' : '#111',
                    border: `1px solid ${isActive ? '#3a3a6a' : '#1e1e1e'}`,
                    borderRadius: 10, cursor: 'pointer',
                    transition: 'all 0.12s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {/* Radio indicator */}
                    <div style={{
                      width: 14, height: 14, borderRadius: '50%',
                      border: `2px solid ${isActive ? '#4a9eff' : '#333'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {isActive && (
                        <div style={{
                          width: 6, height: 6, borderRadius: '50%', background: '#4a9eff',
                        }} />
                      )}
                    </div>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600,
                        color: isActive ? '#a0b4f0' : '#aaa', marginBottom: 2,
                      }}>
                        {mode.label}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-body)', fontSize: 11,
                        color: isActive ? '#666' : '#444', lineHeight: 1.4,
                      }}>
                        {mode.description}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
}
