const BASE_URL = 'https://phi-lab-server.vercel.app/api/v1/lab';

let allIssues = [];
let currentFilter = 'all';

const loginSection = document.getElementById('loginSection');
const mainApp = document.getElementById('mainApp');
const issuesGrid = document.getElementById('issuesGrid');
const loading = document.getElementById('loading');
const issueCountText = document.getElementById('issueCountText');
const openCountText = document.getElementById('openCountText');
const closedCountText = document.getElementById('closedCountText');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const tabs = document.querySelectorAll('.tab');

if (localStorage.getItem('isLoggedIn') === 'true') {
  loginSection.classList.add('hidden');
  mainApp.classList.remove('hidden');
  fetchIssues();
}

document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();
  if (user === 'admin' && pass === 'admin123') {
    localStorage.setItem('isLoggedIn', 'true');
    loginSection.classList.add('hidden');
    mainApp.classList.remove('hidden');
    fetchIssues();
  } else {
    alert('Wrong credentials!');
  }
});

async function fetchIssues() {
  loading.classList.remove('hidden');
  issuesGrid.innerHTML = '';
  try {
    const res = await fetch(`${BASE_URL}/issues`);
    const json = await res.json();
    allIssues = json.data || [];
    updateCounts();
    renderIssues(currentFilter);
  } catch (err) {
    issuesGrid.innerHTML = '<p class="text-red-500 text-center py-10">Failed to load issues</p>';
  } finally {
    loading.classList.add('hidden');
  }
}

function updateCounts() {
  const open = allIssues.filter(i => i.status?.toLowerCase() === 'open').length;
  issueCountText.textContent = `${allIssues.length} Issues`;
  openCountText.textContent = `${open} Open`;
  closedCountText.textContent = `${allIssues.length - open} Closed`;
}

function getPriorityBadge(priority) {
  const p = (priority || 'medium').toUpperCase();
  if (p === 'HIGH') return 'bg-lime-500 text-white'
  if (p === 'MEDIUM') return 'bg-green-500 text-white';
  if (p === 'LOW') return 'bg-purple-500 text-white';
  return 'bg-gray-500 text-white';
}

async function renderIssues(filter) {
  loading.classList.remove('hidden'); // Show spinner on tab change / filter
  issuesGrid.innerHTML = '';
  currentFilter = filter;

  await new Promise(resolve => setTimeout(resolve, 300)); // simulate small delay for spinner visibility

  let filtered = allIssues;
  if (filter === 'open') filtered = allIssues.filter(i => i.status?.toLowerCase() === 'open');
  if (filter === 'closed') filtered = allIssues.filter(i => i.status?.toLowerCase() === 'closed');

  filtered.forEach(issue => {
    const prioClass = getPriorityBadge(issue.priority);
    const card = document.createElement('div');
    card.className = `bg-white rounded-lg shadow hover:shadow-md cursor-pointer border-t-4 ${issue.status?.toLowerCase() === 'open' ? 'border-green-500' : 'border-purple-500'}`;

    card.innerHTML = `
      <div class="p-4">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold  ${prioClass} mb-2">
        
          ${issue.priority?.toUpperCase() || 'MEDIUM'}
        </span>
        <h3 class="font-semibold mb-1 line-clamp-2">${issue.title}</h3>
        <p class="text-sm text-gray-600 mb-3 line-clamp-3">${issue.description || 'No description...'}</p>
        <div class="flex flex-wrap gap-2 mb-3">
          ${issue.labels?.map(l => {
            let cls = 'px-2 py-1 rounded-full text-xs';
            if (l.toLowerCase() === 'bug') cls += ' bg-red-100 text-red-800';
            if (l.toLowerCase().includes('help wanted')) cls += ' bg-yellow-100 text-yellow-800';
            return `<span class="${cls}">${l}</span>`;
          }).join('') || ''}
        </div>
        <div class="text-xs text-gray-500 flex justify-between">
          <span>#${issue.id} by ${issue.author}</span>
          <span>${new Date(issue.createdAt).toLocaleDateString('en-US')}</span>
        </div>
      </div>
    `;

    card.onclick = () => {
      document.getElementById('modalTitle').textContent = issue.title;
      document.getElementById('modalDesc').textContent = issue.description;
      document.getElementById('modalStatus').textContent = issue.status;
      document.getElementById('modalPriority').textContent = issue.priority?.toUpperCase() || 'MEDIUM';
      document.getElementById('modalLabels').textContent = issue.labels?.join(', ') || 'None';
      document.getElementById('modalAuthor').textContent = issue.author;
      document.getElementById('modalCreated').textContent = new Date(issue.createdAt).toLocaleDateString();
      document.getElementById('issueModal').showModal();
    };
    issuesGrid.appendChild(card);
  });

  loading.classList.add('hidden');
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('tab-active'));
    tab.classList.add('tab-active');
    renderIssues(tab.dataset.tab); // spinner show here
  });
});

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', e => { if (e.key === 'Enter') performSearch(); });

async function performSearch() {
  const q = searchInput.value.trim();
  if (!q) return fetchIssues();

  loading.classList.remove('hidden');
  issuesGrid.innerHTML = '';
  try {
    const res = await fetch(`${BASE_URL}/issues/search?q=${encodeURIComponent(q)}`);
    const json = await res.json();
    allIssues = json.data || [];
    updateCounts();
    renderIssues('all');
  } catch (err) {
    issuesGrid.innerHTML = '<p class="text-red-500 text-center py-10">Search failed</p>';
  } finally {
    loading.classList.add('hidden');
  }
}