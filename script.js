
// const BASE_URL = 'https://phi-lab-server.vercel.app/api/v1/lab';

// let allIssues = [];
// let currentFilter = 'all';

// const loginSection = document.getElementById('loginSection');
// const mainApp = document.getElementById('mainApp');
// const issuesGrid = document.getElementById('issuesGrid');
// const loading = document.getElementById('loading');
// const issueCountText = document.getElementById('issueCountText');
// const openCountText = document.getElementById('openCountText');
// const closedCountText = document.getElementById('closedCountText');
// const searchInput = document.getElementById('searchInput');
// const searchBtn = document.getElementById('searchBtn');
// const tabs = document.querySelectorAll('.tab');

// if (localStorage.getItem('isLoggedIn') === 'true') {
//   loginSection.classList.add('hidden');
//   mainApp.classList.remove('hidden');
//   fetchIssues();
// }

// document.getElementById('loginForm').addEventListener('submit', e => {
//   e.preventDefault();
//   const user = document.getElementById('username').value.trim();
//   const pass = document.getElementById('password').value.trim();
//   if (user === 'admin' && pass === 'admin123') {
//     localStorage.setItem('isLoggedIn', 'true');
//     loginSection.classList.add('hidden');
//     mainApp.classList.remove('hidden');
//     fetchIssues();
//   } else {
//     alert('Wrong credentials!');
//   }
// });

// async function fetchIssues() {
//   loading.classList.remove('hidden');
//   issuesGrid.innerHTML = '';
//   try {
//     const res = await fetch(`${BASE_URL}/issues`);
//     const json = await res.json();
//     allIssues = json.data || [];
//     updateHeaderCount(allIssues.length);
//     updateCounts();
//     renderIssues(currentFilter);
//   } catch (err) {
//     issuesGrid.innerHTML = '<p class="text-red-500 text-center py-10">Failed to load issues</p>';
//   } finally {
//     loading.classList.add('hidden');
//   }
// }

// function updateHeaderCount(count) {
//   issueCountText.textContent = `${count} Issues`;
// }

// function updateCounts() {
//   const open = allIssues.filter(i => i.status?.toLowerCase() === 'open').length;

// }

// function getPriorityBadge(priority) {
//   const p = (priority || 'medium').toUpperCase();
//   if (p === 'HIGH') return 'bg-lime-500 text-white';
//   if (p === 'MEDIUM') return 'bg-green-500 text-white';
//   if (p === 'LOW') return 'bg-purple-500 text-white';
//   return 'bg-gray-500 text-white';
// }

// function getPriorityBgOnly(priority) {
//   const p = (priority || 'medium').toUpperCase();
//   if (p === 'HIGH') return 'bg-lime-500';
//   if (p === 'MEDIUM') return 'bg-green-500';
//   if (p === 'LOW') return 'bg-purple-500';
//   return 'bg-gray-500';
// }

// function getPriorityIcon(priority) {
//   const p = (priority || 'medium').toLowerCase();

//   if (p === 'high') {
//     return `<img src="./assets/Open-Status.png" alt="High Priority" class="w-5 h-5">`;
//   }

//   if (p === 'medium') {
//     return `<img src="./assets/Open-Status.png" alt="Medium Priority" class="w-5 h-5">`;
//   }

//   if (p === 'low') {
//     return `<img src="./assets/Closed- Status .png" alt="Low Priority" class="w-5 h-5">`;
//   }

//   return `<svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//     <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>`;
// }

// function getLabelIcon(label) {
//   const l = label.toLowerCase().trim();

//   if (l === 'bug' || l.includes('bug')) {
//     return `<img src="./assets/Vector (1).png" alt="Bug" class="w-4 h-4">`;
//   }

//   if (l === 'enhancement' || l.includes('feature') || l.includes('enhancement')) {
//     return `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//       <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
//     </svg>`;
//   }

//   if (l === 'documentation' || l.includes('docs') || l.includes('documentation')) {
//     return `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//       <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//     </svg>`;
//   }

//   if (l.includes('help wanted') || l.includes('good first issue')) {
//     return `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//       <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//     </svg>`;
//   }

//   return `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//     <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//   </svg>`;
// }

// async function renderIssues(filter) {
//   loading.classList.remove('hidden'); 
//   issuesGrid.innerHTML = '';
//   currentFilter = filter;

//   await new Promise(resolve => setTimeout(resolve, 300));

//   let filtered = allIssues;
//   if (filter === 'open') filtered = allIssues.filter(i => i.status?.toLowerCase() === 'open');
//   if (filter === 'closed') filtered = allIssues.filter(i => i.status?.toLowerCase() === 'closed');

//   updateHeaderCount(filtered.length);

//   filtered.forEach(issue => {
//     const prioClass = getPriorityBadge(issue.priority);
//     const card = document.createElement('div');
//     card.className = `bg-white rounded-lg cursor-pointer border-t-4 ${issue.status?.toLowerCase() === 'open' ? 'border-green-500' : 'border-purple-500'}`;

//     card.innerHTML = `
//       <div class="p-4 space-y-3">
//         <div class="flex items-center justify-between gap-2 mb-2">
//           <div class="inline-flex items-center justify-center w-10 h-10 rounded-full ${getPriorityBgOnly(issue.priority)}">
//             ${getPriorityIcon(issue.priority)}
//           </div>
//           <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${prioClass}">
//             ${issue.priority?.toUpperCase() || 'MEDIUM'}
//           </span>
//         </div>
//         <h3 class="font-semibold mb-1 line-clamp-2">${issue.title}</h3>
//         <p class="text-sm text-gray-600 mb-3 line-clamp-3">${issue.description || 'No description...'}</p>
//         <div class="flex flex-wrap items-center gap-2 min-h-[40px]">
//           ${issue.labels?.map(l => {
//             let cls = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800';
//             if (l.toLowerCase() === 'bug') cls = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800';
//             if (l.toLowerCase().includes('help wanted')) cls = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800';
//             if (l.toLowerCase() === 'enhancement' || l.toLowerCase().includes('feature')) cls = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800';
//             if (l.toLowerCase() === 'documentation') cls = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800';

//          return `<span class="${cls} flex-nowrap">
//            ${getLabelIcon(l)}
//           ${l}
//        </span>`;
//           }).join(' ') || '<span class="text-xs text-gray-500">No labels</span>'}
//         </div>
//         <hr>
//         <div class="text-xs text-gray-500 flex justify-between">
//           <span>#${issue.id} by ${issue.author}</span>
//           <span>${new Date(issue.createdAt).toLocaleDateString('en-US')}</span>
//         </div>
//       </div>
//     `;

//     card.onclick = () => {
//       document.getElementById('modalTitle').textContent = issue.title;

//       // Status badge
//       const statusEl = document.getElementById('modalStatus');
//       const statusText = (issue.status || 'Unknown').toUpperCase();
//       statusEl.textContent = statusText;
//       statusEl.className = 'badge px-4 py-1.5 font-medium text-white rounded-full ' + 
//         (issue.status?.toLowerCase() === 'open' ? 'badge-success' : 'badge-error');

//       // Author & Date
//       document.getElementById('modalAuthor').textContent = issue.author || 'Unknown';
//       document.getElementById('modalCreated').textContent = '• ' + new Date(issue.createdAt).toLocaleDateString('en-GB', {
//         day: '2-digit', month: 'short', year: 'numeric'
//       });

//       // Description
//       document.getElementById('modalDesc').textContent = issue.description || 'No description provided.';

    
//       const labelsContainer = document.getElementById('modalLabelsContainer');
// labelsContainer.innerHTML = '';

// if (issue.labels && issue.labels.length > 0) {

//   issue.labels.forEach(l => {

//     const label = document.createElement('span');

//     let cls = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800';

//     if (l.toLowerCase() === 'bug') {
//       cls = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800';
//     }

//     if (l.toLowerCase().includes('help wanted')) {
//       cls = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800';
//     }

//     if (l.toLowerCase() === 'enhancement' || l.toLowerCase().includes('feature')) {
//       cls = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800';
//     }

//     if (l.toLowerCase() === 'documentation') {
//       cls = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800';
//     }

//     label.className = cls;
//     label.textContent = l;

//     labelsContainer.appendChild(label);

//   });

// } else {

//   labelsContainer.innerHTML = '<span class="text-sm text-gray-500">No labels</span>';

// }

//       // Assignee
//       document.getElementById('modalAssignee').textContent = issue.author || 'Unassigned';

//       // Priority - red rounded badge
//       const priorityEl = document.getElementById('modalPriority');
//       const prioText = (issue.priority || 'MEDIUM').toUpperCase();
//       let prioBg = 'bg-gray-500';
//       if (prioText === 'HIGH') prioBg = 'bg-red-600';
//       else if (prioText === 'MEDIUM') prioBg = 'bg-yellow-500';
//       else if (prioText === 'LOW') prioBg = 'bg-green-600';

//       priorityEl.textContent = prioText;
//       priorityEl.className = `px-5 py-1.5 rounded-full text-sm font-bold text-white ${prioBg}`;

//       document.getElementById('issueModal').showModal();
//     };
//     issuesGrid.appendChild(card);
//   });

//   loading.classList.add('hidden');
// }

// tabs.forEach(tab => {
//   tab.addEventListener('click', () => {
//     tabs.forEach(t => t.classList.remove('tab-active'));
//     tab.classList.add('tab-active');
//     renderIssues(tab.dataset.tab);
//   });
// });

//  searchBtn.addEventListener('click', performSearch);
//  searchInput.addEventListener('keypress', e => { if (e.key === 'Enter')     performSearch(); });

// async function performSearch() {
//   const q = searchInput.value.trim();
//   if (!q) return fetchIssues();

//   loading.classList.remove('hidden');
//   issuesGrid.innerHTML = '';
//   try {
//     const res = await fetch(`${BASE_URL}/issues/search?q=${encodeURIComponent(q)}`);
//     const json = await res.json();
//     allIssues = json.data || [];
//     updateHeaderCount(allIssues.length);
//     updateCounts();
//     renderIssues('all');
//   } catch (err) {
//     issuesGrid.innerHTML = '<p class="text-red-500 text-center py-10">Search failed</p>';
//   } finally {
//     loading.classList.add('hidden');
//   }
// }



// const BASE_URL = 'https://phi-lab-server.vercel.app/api/v1/lab';

// let allIssues = [];
// let currentFilter = 'all';

// const loginSection = document.getElementById('loginSection');
// const mainApp = document.getElementById('mainApp');
// const issuesGrid = document.getElementById('issuesGrid');
// const loading = document.getElementById('loading');
// const issueCountText = document.getElementById('issueCountText');
// const openCountText = document.getElementById('openCountText');
// const closedCountText = document.getElementById('closedCountText');
// const searchInput = document.getElementById('searchInput');
// const searchBtn = document.getElementById('searchBtn');
// const tabs = document.querySelectorAll('.tab');

// // Auto-login
// // if (localStorage.getItem('isLoggedIn') === 'true') {
// //   loginSection.classList.add('hidden');
// //   mainApp.classList.remove('hidden');
// //   fetchIssues();
// // }

// // Login
// document.getElementById('loginForm').addEventListener('submit', e => {
//   e.preventDefault();
//   const user = document.getElementById('username').value.trim();
//   const pass = document.getElementById('password').value.trim();
//   if (user === 'admin' && pass === 'admin123') {
//     localStorage.setItem('isLoggedIn', 'true');
//     loginSection.classList.add('hidden');
//     mainApp.classList.remove('hidden');
//     fetchIssues();
//   } else {
//     alert('Wrong credentials!');
//   }
// });

// // Fetch all issues
// async function fetchIssues() {
//   loading.classList.remove('hidden');
//   issuesGrid.innerHTML = '';
//   try {
//     const res = await fetch(`${BASE_URL}/issues`);
//     const json = await res.json();
//     allIssues = json.data || [];
//     updateHeaderCount(allIssues.length);
//     updateCounts();
//     renderIssues(currentFilter);
//   } catch (err) {
//     issuesGrid.innerHTML = '<p class="text-red-500 text-center py-10">Failed to load issues</p>';
//   } finally {
//     loading.classList.add('hidden');
//   }
// }

// // Update header count
// function updateHeaderCount(count) {
//   issueCountText.textContent = `${count} Issues`;
// }

// // Update open/closed counts
// function updateCounts() {
//   const open = allIssues.filter(i => i.status?.toLowerCase() === 'open').length;
//   const closed = allIssues.filter(i => i.status?.toLowerCase() === 'closed').length;

//   // openCountText.textContent = open;
//   // closedCountText.textContent = closed;
// }

// // Priority badge class
// function getPriorityBadge(priority) {
//   const p = (priority || 'medium').toUpperCase();
//   if (p === 'HIGH') return 'bg-lime-500 text-white';
//   if (p === 'MEDIUM') return 'bg-green-500 text-white';
//   if (p === 'LOW') return 'bg-purple-500 text-white';
//   return 'bg-gray-500 text-white';
// }

// // Priority background only
// function getPriorityBgOnly(priority) {
//   const p = (priority || 'medium').toUpperCase();
//   if (p === 'HIGH') return 'bg-lime-500';
//   if (p === 'MEDIUM') return 'bg-green-500';
//   if (p === 'LOW') return 'bg-purple-500';
//   return 'bg-gray-500';
// }

// // Priority icon
// function getPriorityIcon(priority) {
//   const p = (priority || 'medium').toLowerCase();
//   if (p === 'high' || p === 'medium') {
//     return `<img src="./assets/Open-Status.png" alt="${p} Priority" class="w-5 h-5">`;
//   }
//   if (p === 'low') {
//     return `<img src="./assets/Closed- Status .png" alt="Low Priority" class="w-5 h-5">`;
//   }
//   return `<svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//     <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>`;
// }

// // Label icon
// function getLabelIcon(label) {
//   const l = label.toLowerCase().trim();
//   if (l === 'bug' || l.includes('bug')) return `<img src="./assets/Vector (1).png" alt="Bug" class="w-4 h-4">`;
//   if (l === 'enhancement' || l.includes('feature')) return `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//       <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
//     </svg>`;
//   if (l.includes('docs') || l.includes('documentation')) return `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//       <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//     </svg>`;
//   if (l.includes('help wanted') || l.includes('good first issue')) return `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//       <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//     </svg>`;
//   return `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//     <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//   </svg>`;
// }

// // Helper to create label span
// function createLabelSpan(label) {
//   const span = document.createElement('span');
//   let cls = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800';
//   const l = label.toLowerCase();

//   if (l === 'bug') cls = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800';
//   else if (l.includes('help wanted')) cls = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800';
//   else if (l === 'enhancement' || l.includes('feature')) cls = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800';
//   else if (l.includes('docs') || l.includes('documentation')) cls = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800';

//   span.className = cls;
//   span.textContent = label;
//   return span;
// }

// // Render issues
// async function renderIssues(filter) {
//   loading.classList.remove('hidden'); 
//   issuesGrid.innerHTML = '';
//   currentFilter = filter;

//   await new Promise(resolve => setTimeout(resolve, 300));

//   let filtered = allIssues;
//   if (filter === 'open') filtered = allIssues.filter(i => i.status?.toLowerCase() === 'open');
//   if (filter === 'closed') filtered = allIssues.filter(i => i.status?.toLowerCase() === 'closed');

//   updateHeaderCount(filtered.length);

//   filtered.forEach(issue => {
//     const prioClass = getPriorityBadge(issue.priority);
//     const card = document.createElement('div');
//     card.className = `bg-white rounded-lg cursor-pointer border-t-4 ${issue.status?.toLowerCase() === 'open' ? 'border-green-500' : 'border-purple-500'}`;

//     card.innerHTML = `
//       <div class="p-4 space-y-3">
//         <div class="flex items-center justify-between gap-2 mb-2">
//           <div class="inline-flex items-center justify-center w-10 h-10 rounded-full ${getPriorityBgOnly(issue.priority)}">
//             ${getPriorityIcon(issue.priority)}
//           </div>
//           <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${prioClass}">
//             ${issue.priority?.toUpperCase() || 'MEDIUM'}
//           </span>
//         </div>
//         <h3 class="font-semibold mb-1 line-clamp-2">${issue.title}</h3>
//         <p class="text-sm text-gray-600 mb-3 line-clamp-3">${issue.description || 'No description...'}</p>
//         <div class="flex flex-wrap items-center gap-2 min-h-[40px]">
//           ${issue.labels?.map(l => {
//             const span = createLabelSpan(l);
//             return span.outerHTML;
//           }).join(' ') || '<span class="text-xs text-gray-500">No labels</span>'}
//         </div>
//         <hr>
//         <div class="text-xs text-gray-500 flex justify-between">
//           <span>#${issue.id} by ${issue.author}</span>
//           <span>${new Date(issue.createdAt).toLocaleDateString('en-US')}</span>
//         </div>
//       </div>
//     `;

//     // Click to open modal
//     card.onclick = () => openIssueModal(issue);

//     issuesGrid.appendChild(card);
//   });

//   loading.classList.add('hidden');
// }

// // Open issue modal
// function openIssueModal(issue) {
//   document.getElementById('modalTitle').textContent = issue.title;

//   // Status badge
//   const statusEl = document.getElementById('modalStatus');
//   const statusText = (issue.status || 'Unknown').toUpperCase();
//   statusEl.textContent = statusText;
//   statusEl.className = 'badge px-4 py-1.5 font-medium text-white rounded-full ' + 
//     (issue.status?.toLowerCase() === 'open' ? 'badge-success' : 'badge-error');

//   document.getElementById('modalAuthor').textContent = issue.author || 'Unknown';
//   document.getElementById('modalCreated').textContent = '• ' + new Date(issue.createdAt).toLocaleDateString('en-GB', {
//     day: '2-digit', month: 'short', year: 'numeric'
//   });
//   document.getElementById('modalDesc').textContent = issue.description || 'No description provided.';

//   // Labels
//   const labelsContainer = document.getElementById('modalLabelsContainer');
//   labelsContainer.innerHTML = '';
//   (issue.labels || []).forEach(l => labelsContainer.appendChild(createLabelSpan(l)));
//   if (!issue.labels || issue.labels.length === 0) labelsContainer.innerHTML = '<span class="text-sm text-gray-500">No labels</span>';

//   // Assignee
//   document.getElementById('modalAssignee').textContent = issue.author || 'Unassigned';

//   // Priority
//   const priorityEl = document.getElementById('modalPriority');
//   const prioText = (issue.priority || 'MEDIUM').toUpperCase();
//   let prioBg = 'bg-gray-500';
//   if (prioText === 'HIGH') prioBg = 'bg-lime-500';
//   else if (prioText === 'MEDIUM') prioBg = 'bg-green-500';
//   else if (prioText === 'LOW') prioBg = 'bg-purple-500';
//   priorityEl.textContent = prioText;
//   priorityEl.className = `px-5 py-1.5 rounded-full text-sm font-bold text-white ${prioBg}`;

//   document.getElementById('issueModal').showModal();
// }

// // Tabs filter
// tabs.forEach(tab => {
//   tab.addEventListener('click', () => {
//     tabs.forEach(t => t.classList.remove('tab-active'));
//     tab.classList.add('tab-active');
//     renderIssues(tab.dataset.tab);
//   });
// });

// // Search
// searchBtn.addEventListener('click', performSearch);
// searchInput.addEventListener('keypress', e => { if (e.key === 'Enter') performSearch(); });

// async function performSearch() {
//   const q = searchInput.value.trim();
//   if (!q) {
//     currentFilter = 'all';
//     return fetchIssues();
//   }

//   loading.classList.remove('hidden');
//   issuesGrid.innerHTML = '';
//   try {
//     const res = await fetch(`${BASE_URL}/issues/search?q=${encodeURIComponent(q)}`);
//     const json = await res.json();
//     allIssues = json.data || [];
//     updateHeaderCount(allIssues.length);
//     updateCounts();
//     renderIssues('all');
//   } catch (err) {
//     issuesGrid.innerHTML = '<p class="text-red-500 text-center py-10">Search failed</p>';
//   } finally {
//     loading.classList.add('hidden');
//   }
// }


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

// Login only after user enters credentials
document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();
  if (user === 'admin' && pass === 'admin123') {
    loginSection.classList.add('hidden');
    mainApp.classList.remove('hidden');
    fetchIssues();
  } else {
    alert('Wrong credentials!');
  }
});

// Fetch all issues
async function fetchIssues() {
  loading.classList.remove('hidden');
  issuesGrid.innerHTML = '';
  try {
    const res = await fetch(`${BASE_URL}/issues`);
    const json = await res.json();
    allIssues = json.data || [];
    updateHeaderCount(allIssues.length);
    updateCounts();
    renderIssues(currentFilter);
  } catch (err) {
    issuesGrid.innerHTML = '<p class="text-red-500 text-center py-10">Failed to load issues</p>';
  } finally {
    loading.classList.add('hidden');
  }
}

// Update header count
function updateHeaderCount(count) {
  issueCountText.textContent = `${count} Issues`;
}

// Update open/closed counts
function updateCounts() {
  const open = allIssues.filter(i => i.status?.toLowerCase() === 'open').length;
  const closed = allIssues.filter(i => i.status?.toLowerCase() === 'closed').length;
  // Uncomment below if you want to show counts
  // openCountText.textContent = open;
  // closedCountText.textContent = closed;
}

// Priority badge class
function getPriorityBadge(priority) {
  const p = (priority || 'medium').toUpperCase();
  if (p === 'HIGH') return 'bg-lime-500 text-white';
  if (p === 'MEDIUM') return 'bg-green-500 text-white';
  if (p === 'LOW') return 'bg-purple-500 text-white';
  return 'bg-gray-500 text-white';
}

// Priority background only
function getPriorityBgOnly(priority) {
  const p = (priority || 'medium').toUpperCase();
  if (p === 'HIGH') return 'bg-lime-500';
  if (p === 'MEDIUM') return 'bg-green-500';
  if (p === 'LOW') return 'bg-purple-500';
  return 'bg-gray-500';
}

// Priority icon
function getPriorityIcon(priority) {
  const p = (priority || 'medium').toLowerCase();
  if (p === 'high' || p === 'medium') {
    return `<img src="./assets/Open-Status.png" alt="${p} Priority" class="w-5 h-5">`;
  }
  if (p === 'low') {
    return `<img src="./assets/Closed- Status .png" alt="Low Priority" class="w-5 h-5">`;
  }
  return `<svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>`;
}

// Label icon
function getLabelIcon(label) {
  const l = label.toLowerCase().trim();
  if (l === 'bug' || l.includes('bug')) return `<img src="./assets/Vector (1).png" alt="Bug" class="w-4 h-4">`;
  if (l === 'enhancement' || l.includes('feature')) return `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>`;
  if (l.includes('docs') || l.includes('documentation')) return `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>`;
  if (l.includes('help wanted') || l.includes('good first issue')) return `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>`;
  return `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>`;
}

// Helper to create label span
function createLabelSpan(label) {
  const span = document.createElement('span');
  let cls = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800';
  const l = label.toLowerCase();
  if (l === 'bug') cls = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800';
  else if (l.includes('help wanted')) cls = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800';
  else if (l === 'enhancement' || l.includes('feature')) cls = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800';
  else if (l.includes('docs') || l.includes('documentation')) cls = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800';
  span.className = cls;
  span.textContent = label;
  return span;
}

// Render issues
async function renderIssues(filter) {
  loading.classList.remove('hidden'); 
  issuesGrid.innerHTML = '';
  currentFilter = filter;

  await new Promise(resolve => setTimeout(resolve, 300));

  let filtered = allIssues;
  if (filter === 'open') filtered = allIssues.filter(i => i.status?.toLowerCase() === 'open');
  if (filter === 'closed') filtered = allIssues.filter(i => i.status?.toLowerCase() === 'closed');

  updateHeaderCount(filtered.length);

  filtered.forEach(issue => {
    const prioClass = getPriorityBadge(issue.priority);
    const card = document.createElement('div');
    card.className = `bg-white rounded-lg cursor-pointer border-t-4 ${issue.status?.toLowerCase() === 'open' ? 'border-green-500' : 'border-purple-500'}`;

    card.innerHTML = `
      <div class="p-4 space-y-3">
        <div class="flex items-center justify-between gap-2 mb-2">
          <div class="inline-flex items-center justify-center w-10 h-10 rounded-full ${getPriorityBgOnly(issue.priority)}">
            ${getPriorityIcon(issue.priority)}
          </div>
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${prioClass}">
            ${issue.priority?.toUpperCase() || 'MEDIUM'}
          </span>
        </div>
        <h3 class="font-semibold mb-1 line-clamp-2">${issue.title}</h3>
        <p class="text-sm text-gray-600 mb-3 line-clamp-3">${issue.description || 'No description...'}</p>
        <div class="flex flex-wrap items-center gap-2 min-h-[40px]">
          ${issue.labels?.map(l => createLabelSpan(l).outerHTML).join(' ') || '<span class="text-xs text-gray-500">No labels</span>'}
        </div>
        <hr>
        <div class="text-xs text-gray-500 flex justify-between">
          <span>#${issue.id} by ${issue.author}</span>
          <span>${new Date(issue.createdAt).toLocaleDateString('en-US')}</span>
        </div>
      </div>
    `;

    card.onclick = () => openIssueModal(issue);
    issuesGrid.appendChild(card);
  });

  loading.classList.add('hidden');
}

// Open issue modal
function openIssueModal(issue) {
  document.getElementById('modalTitle').textContent = issue.title;

  const statusEl = document.getElementById('modalStatus');
  const statusText = (issue.status || 'Unknown').toUpperCase();
  statusEl.textContent = statusText;
  statusEl.className = 'badge px-4 py-1.5 font-medium text-white rounded-full ' + 
    (issue.status?.toLowerCase() === 'open' ? 'badge-success' : 'badge-error');

  document.getElementById('modalAuthor').textContent = issue.author || 'Unknown';
  document.getElementById('modalCreated').textContent = '• ' + new Date(issue.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
  document.getElementById('modalDesc').textContent = issue.description || 'No description provided.';

  const labelsContainer = document.getElementById('modalLabelsContainer');
  labelsContainer.innerHTML = '';
  (issue.labels || []).forEach(l => labelsContainer.appendChild(createLabelSpan(l)));
  if (!issue.labels || issue.labels.length === 0) labelsContainer.innerHTML = '<span class="text-sm text-gray-500">No labels</span>';

  document.getElementById('modalAssignee').textContent = issue.author || 'Unassigned';

  const priorityEl = document.getElementById('modalPriority');
  const prioText = (issue.priority || 'MEDIUM').toUpperCase();
  let prioBg = 'bg-gray-500';
  if (prioText === 'HIGH') prioBg = 'bg-lime-500';
  else if (prioText === 'MEDIUM') prioBg = 'bg-green-500';
  else if (prioText === 'LOW') prioBg = 'bg-purple-500';
  priorityEl.textContent = prioText;
  priorityEl.className = `px-5 py-1.5 rounded-full text-sm font-bold text-white ${prioBg}`;

  document.getElementById('issueModal').showModal();
}

// Tabs filter
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('tab-active'));
    tab.classList.add('tab-active');
    renderIssues(tab.dataset.tab);
  });
});

// Search
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', e => { if (e.key === 'Enter') performSearch(); });

async function performSearch() {
  const q = searchInput.value.trim();
  if (!q) {
    currentFilter = 'all';
    return fetchIssues();
  }

  loading.classList.remove('hidden');
  issuesGrid.innerHTML = '';
  try {
    const res = await fetch(`${BASE_URL}/issues/search?q=${encodeURIComponent(q)}`);
    const json = await res.json();
    allIssues = json.data || [];
    updateHeaderCount(allIssues.length);
    updateCounts();
    renderIssues('all');
  } catch (err) {
    issuesGrid.innerHTML = '<p class="text-red-500 text-center py-10">Search failed</p>';
  } finally {
    loading.classList.add('hidden');
  }
}