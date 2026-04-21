// Org data store — manages all org structures with localStorage persistence
import { googleOrg, blankOrg } from '../data/google.js';

const STORAGE_KEY = 'org-viz-data';
const SETTINGS_KEY = 'org-viz-settings';
const ACTIVE_KEY = 'org-viz-active';

// ─── Default settings ───
const defaultSettings = {
  editMode: 'inline', // 'inline' | 'panel' | 'modal'
};

// ─── Helpers ───
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// ─── Load / Save ───
export function loadAllOrgs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* fall through */ }
  // First run — seed with Google org
  const initial = { [googleOrg.id]: deepClone(googleOrg) };
  saveAllOrgs(initial);
  return initial;
}

export function saveAllOrgs(orgs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orgs));
}

export function loadActiveId() {
  return localStorage.getItem(ACTIVE_KEY) || googleOrg.id;
}

export function saveActiveId(id) {
  localStorage.setItem(ACTIVE_KEY, id);
}

export function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return { ...defaultSettings, ...JSON.parse(raw) };
  } catch (e) { /* fall through */ }
  return { ...defaultSettings };
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// ─── CRUD operations on org structures ───
export function createOrg(name, subtitle) {
  const id = generateId();
  const org = deepClone(blankOrg);
  org.id = id;
  org.name = name || 'New Organization';
  org.subtitle = subtitle || '';
  org.root.id = 'root-' + id;
  return org;
}

export function deleteOrg(orgs, orgId) {
  const next = { ...orgs };
  delete next[orgId];
  return next;
}

export function duplicateOrg(orgs, orgId) {
  const source = orgs[orgId];
  if (!source) return orgs;
  const copy = deepClone(source);
  copy.id = generateId();
  copy.name = source.name + ' (copy)';
  // Re-generate all node IDs to avoid collisions
  function reId(node) {
    node.id = generateId();
    (node.children || []).forEach(reId);
  }
  reId(copy.root);
  return { ...orgs, [copy.id]: copy };
}

// ─── CRUD operations on nodes within an org ───
function findNode(node, id) {
  if (node.id === id) return node;
  for (const child of (node.children || [])) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
}

function findParent(node, id) {
  for (const child of (node.children || [])) {
    if (child.id === id) return node;
    const found = findParent(child, id);
    if (found) return found;
  }
  return null;
}

export function addNode(root, parentId, newNode) {
  const tree = deepClone(root);
  const parent = findNode(tree, parentId);
  if (parent) {
    if (!parent.children) parent.children = [];
    parent.children.push({ ...newNode, id: generateId(), children: [] });
  }
  return tree;
}

export function updateNode(root, nodeId, updates) {
  const tree = deepClone(root);
  const node = findNode(tree, nodeId);
  if (node) {
    Object.assign(node, updates);
  }
  return tree;
}

export function removeNode(root, nodeId) {
  const tree = deepClone(root);
  const parent = findParent(tree, nodeId);
  if (parent) {
    parent.children = parent.children.filter(c => c.id !== nodeId);
  }
  return tree;
}

export function moveNode(root, nodeId, newParentId) {
  const tree = deepClone(root);
  const parent = findParent(tree, nodeId);
  if (!parent) return tree;
  const nodeIdx = parent.children.findIndex(c => c.id === nodeId);
  const [node] = parent.children.splice(nodeIdx, 1);
  const newParent = findNode(tree, newParentId);
  if (newParent) {
    if (!newParent.children) newParent.children = [];
    newParent.children.push(node);
  }
  return tree;
}
