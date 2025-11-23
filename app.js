   // Mini Social — Option A dummy casual feed
    const STORAGE = { USERS: 'ms_users_v3', CURRENT: 'ms_current_v3', POSTS: 'ms_posts_v3' };

    // DOM
    const authBtn = document.getElementById('authBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const authModal = document.getElementById('authModal');
    const authForm = document.getElementById('authForm');
    const authTitle = document.getElementById('authTitle');
    const toggleAuth = document.getElementById('toggleAuth');
    const closeAuth = document.getElementById('closeAuth');
    const fullnameRow = document.getElementById('fullnameRow');
    const fullName = document.getElementById('fullName');
    const emailIn = document.getElementById('email');
    const passwordIn = document.getElementById('password');

    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const userAvatar = document.getElementById('userAvatar');

    const createCard = document.getElementById('createCard');
    const newPostBtn = document.getElementById('newPostBtn');
    const createText = document.getElementById('createText');
    const createImage = document.getElementById('createImage');
    const postSubmit = document.getElementById('postSubmit');
    const cancelPost = document.getElementById('cancelPost');
    const createAvatar = document.getElementById('createAvatar');
    const emojiToggle = document.getElementById('emojiToggle');
    const emojiPanel = document.getElementById('emojiPanel');

    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const feed = document.getElementById('feed');
    const suggested = document.getElementById('suggested');
    const toast = document.getElementById('toast');

    // emojis
    const EMOJIS = ['😀','😅','😂','😍','😎','👍','👏','🔥','😢','🤯','🙌','🤍','❤️','🎉','😴','😇','🤔'];

    // app state
    let users = JSON.parse(localStorage.getItem(STORAGE.USERS) || 'null');
    let currentUser = JSON.parse(localStorage.getItem(STORAGE.CURRENT) || 'null');
    let posts = JSON.parse(localStorage.getItem(STORAGE.POSTS) || 'null');

    function saveAll(){
      localStorage.setItem(STORAGE.USERS, JSON.stringify(users));
      localStorage.setItem(STORAGE.CURRENT, JSON.stringify(currentUser));
      localStorage.setItem(STORAGE.POSTS, JSON.stringify(posts));
    }

    function uid(prefix='id'){ return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2,6); }
    function showToast(msg){ toast.textContent = msg; toast.classList.remove('hidden'); setTimeout(()=> toast.classList.add('hidden'), 2200); }

    // seed casual dummy users + posts (Option A)
    function seed(){
      if(!users){
        users = [
          {id:'u_ali', name:'Ali Khan', email:'ali@ex.com', avatar:'https://i.pravatar.cc/150?img=12', password:'1234'},
          {id:'u_sara', name:'Sara Malik', email:'sara@ex.com', avatar:'https://i.pravatar.cc/150?img=46', password:'1234'},
          {id:'u_hamid', name:'Hamid', email:'hamid@ex.com', avatar:'https://i.pravatar.cc/150?img=32', password:'1234'},
          {id:'u_farah', name:'Farah', email:'farah@ex.com', avatar:'https://i.pravatar.cc/150?img=8', password:'1234'},
          {id:'u_ahmed', name:'Ahmed', email:'ahmed@ex.com', avatar:'https://i.pravatar.cc/150?img=25', password:'1234'},
          {id:'u_noor', name:'Noor', email:'noor@ex.com', avatar:'https://i.pravatar.cc/150?img=60', password:'1234'},
          {id:'u_bilal', name:'Bilal', email:'bilal@ex.com', avatar:'https://i.pravatar.cc/150?img=15', password:'1234'},
          {id:'u_zara', name:'Zara', email:'zara@ex.com', avatar:'https://i.pravatar.cc/150?img=68', password:'1234'}
        ];
      }

      if(!posts){
        posts = [
          {id:'p1', authorId:'u_sara', authorName:'Sara Malik', avatar:'https://i.pravatar.cc/150?img=46', text:'Good morning! Coffee and a cute cat to start the day 😺', image:'https://placekitten.com/800/450', time:new Date(Date.now()-3600*1000*2).toISOString(), likes:4, likedBy:['ali@ex.com']},
          {id:'p2', authorId:'u_ali', authorName:'Ali Khan', avatar:'https://i.pravatar.cc/150?img=12', text:'Sunny day at the park 🌞 — perfect for a walk', image:'https://picsum.photos/800/450?random=1', time:new Date(Date.now()-3600*1000*4).toISOString(), likes:6, likedBy:['sara@ex.com','farah@ex.com']},
          {id:'p3', authorId:'u_hamid', authorName:'Hamid', avatar:'https://i.pravatar.cc/150?img=32', text:'Made a quick pasta tonight 🍝', image:'https://picsum.photos/800/450?random=2', time:new Date(Date.now()-3600*1000*8).toISOString(), likes:2, likedBy:[]},
          {id:'p4', authorId:'u_farah', authorName:'Farah', avatar:'https://i.pravatar.cc/150?img=8', text:'Throwback to my last trip ✈️', image:'https://picsum.photos/800/450?random=3', time:new Date(Date.now()-3600*1000*26).toISOString(), likes:9, likedBy:['ali@ex.com','noor@ex.com']},
          {id:'p5', authorId:'u_ahmed', authorName:'Ahmed', avatar:'https://i.pravatar.cc/150?img=25', text:'Gym session done 💪 feeling strong', image:'', time:new Date(Date.now()-3600*1000*30).toISOString(), likes:1, likedBy:[]},
          {id:'p6', authorId:'u_noor', authorName:'Noor', avatar:'https://i.pravatar.cc/150?img=60', text:'Anyone knows a good cafe in the city?', image:'', time:new Date(Date.now()-3600*1000*52).toISOString(), likes:0, likedBy:[]},
          {id:'p7', authorId:'u_bilal', authorName:'Bilal', avatar:'https://i.pravatar.cc/150?img=15', text:'Weekend meme — enjoy 😂', image:'https://picsum.photos/800/450?random=4', time:new Date(Date.now()-3600*1000*80).toISOString(), likes:3, likedBy:['zara@ex.com']}
        ];
      }
      saveAll();
    }

    function openAuth(mode='login'){
      authModal.classList.remove('hidden');
      if(mode==='login'){
        authTitle.textContent = 'Login'; fullnameRow.classList.add('hidden'); toggleAuth.textContent = "Don't have account? Signup"; document.getElementById('authSubmit').textContent = 'Login';
      } else {
        authTitle.textContent = 'Create account'; fullnameRow.classList.remove('hidden'); toggleAuth.textContent = 'Already have account? Login'; document.getElementById('authSubmit').textContent = 'Signup';
      }
    }
    function closeAuthModal(){ authModal.classList.add('hidden'); authForm.reset(); }

    function login(email,pwd){ const u = users.find(x=>x.email===email && x.password===pwd); if(!u) throw new Error('Invalid credentials'); currentUser = {id:u.id, name:u.name, email:u.email, avatar:u.avatar}; saveAll(); renderUI(); showToast('Logged in as ' + u.name); }
    function signup(name,email,pwd){ if(users.find(x=>x.email===email)) throw new Error('Email already used'); const u = {id:uid('u'), name, email, avatar:'https://i.pravatar.cc/150?img='+Math.floor(Math.random()*70+1), password:pwd}; users.push(u); currentUser = {id:u.id,name:u.name,email:u.email,avatar:u.avatar}; saveAll(); renderUI(); showToast('Account created'); }
    function logout(){ currentUser = null; saveAll(); renderUI(); showToast('Logged out'); }

    function createPost(text,image){ if(!currentUser) return showToast('Please login'); const p={id:uid('p'), authorId:currentUser.id, authorName:currentUser.name, avatar:currentUser.avatar, text:text.trim(), image:image.trim(), time:new Date().toISOString(), likes:0, likedBy:[]}; posts.unshift(p); saveAll(); renderFeed(); showToast('Post created'); }
    function toggleLike(postId){ if(!currentUser) return showToast('Please login'); const p = posts.find(x=>x.id===postId); if(!p) return; const i=p.likedBy.indexOf(currentUser.email); if(i===-1) p.likedBy.push(currentUser.email); else p.likedBy.splice(i,1); p.likes=p.likedBy.length; saveAll(); renderFeed(); }
    function deletePost(postId){ const p=posts.find(x=>x.id===postId); if(!p) return; const author = users.find(u=>u.id===p.authorId); if(!currentUser || currentUser.email !== author.email){ if(!confirm('You are not the author. Remove from view?')) return; } if(!confirm('Delete this post?')) return; posts = posts.filter(x=>x.id!==postId); saveAll(); renderFeed(); showToast('Post deleted'); }

    function sharePost(id){ const p = posts.find(x=>x.id===id); if(!p) return; const text = `${p.authorName}: ${p.text} ${p.image? '\n' + p.image : ''}\n— Mini Social (${formatTime(p.time)})`; if(navigator.share){ navigator.share({ text }).then(()=> showToast('Shared')).catch(()=> { navigator.clipboard.writeText(text).then(()=> showToast('Copied post to clipboard')); }); } else if(navigator.clipboard){ navigator.clipboard.writeText(text).then(()=> showToast('Copied post to clipboard')); } else { prompt('Copy this post', text); } }

    function formatTime(iso){ try{return new Date(iso).toLocaleString();}catch{return iso;} }

    function renderFeed(){ const q = searchInput.value.trim().toLowerCase(); const sort = sortSelect.value; let list = posts.slice(); if(q) list = list.filter(p=> p.text.toLowerCase().includes(q) || p.authorName.toLowerCase().includes(q)); if(sort==='latest') list.sort((a,b)=> new Date(b.time)-new Date(a.time)); if(sort==='oldest') list.sort((a,b)=> new Date(a.time)-new Date(b.time)); if(sort==='mostLiked') list.sort((a,b)=> b.likes - a.likes); feed.innerHTML=''; if(!list.length){ feed.innerHTML='<div class="bg-white p-6 rounded shadow text-center text-gray-500">No posts — be the first!</div>'; return; } for(const p of list){ const card = document.createElement('article'); card.className='bg-white rounded-lg shadow p-4'; card.innerHTML = `
          <div class="flex justify-between items-start">
            <div class="flex items-center gap-3">
              <img src="${escapeHtml(p.avatar)}" alt="a" class="max-thumb" />
              <div>
                <div class="font-semibold">${escapeHtml(p.authorName)}</div>
                <div class="text-xs text-gray-500">${formatTime(p.time)}</div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button class="text-sm text-gray-500" data-id="${p.id}" data-action="share">Share</button>
              <button class="text-sm text-red-600" data-id="${p.id}" data-action="delete">Delete</button>
            </div>
          </div>
          <p class="mt-3 text-gray-800 break-words">${linkify(escapeHtml(p.text))}</p>
          ${p.image? `<img src="${escapeHtml(p.image)}" onerror="this.style.display='none'" class="w-full mt-3 rounded object-cover max-h-80"/>` : ''}
          <div class="mt-3 flex items-center gap-3">
            <button class="likeBtn inline-flex items-center gap-2" data-id="${p.id}">${p.likedBy.includes(currentUser?.email||'') ? '❤️' : '🤍'} <span class="ml-1">${p.likes}</span></button>
          </div>
        `; card.querySelectorAll('[data-action]').forEach(btn=> btn.addEventListener('click', e=>{ const id = btn.getAttribute('data-id'); const act = btn.getAttribute('data-action'); if(act==='delete') deletePost(id); if(act==='share') sharePost(id); })); card.querySelector('.likeBtn').addEventListener('click', ()=> toggleLike(p.id)); feed.appendChild(card); } }

    function renderSuggested(){ suggested.innerHTML=''; users.slice(0,5).forEach(u=>{ const el = document.createElement('div'); el.className='flex items-center gap-3'; el.innerHTML = `<img src="${u.avatar}" class="w-10 h-10 rounded-full object-cover"/><div class="flex-1 text-sm">${u.name}<div class="text-xs text-gray-500">@${u.email.split('@')[0]}</div></div><button class="px-2 py-1 text-sm border rounded followBtn">Follow</button>`; el.querySelector('.followBtn').addEventListener('click', ()=> showToast('Following ' + u.name)); suggested.appendChild(el); }); }

    function renderUI(){ if(currentUser){ userInfo.classList.remove('hidden'); userName.textContent = currentUser.name; userAvatar.src = currentUser.avatar; createAvatar.src = currentUser.avatar; createCard.classList.remove('hidden'); newPostBtn.classList.remove('hidden'); authBtn.classList.add('hidden'); logoutBtn.classList.remove('hidden'); } else { userInfo.classList.add('hidden'); createCard.classList.add('hidden'); newPostBtn.classList.add('hidden'); authBtn.classList.remove('hidden'); logoutBtn.classList.add('hidden'); } renderFeed(); renderSuggested(); }

    function escapeHtml(s){ return String(s||'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }
    function linkify(text){ return String(text||'').replace(/(https?:\/\/[^\s]+)/g, '<a class="text-emerald-600" target="_blank" href="$1">$1</a>'); }

    authBtn.addEventListener('click', ()=> openAuth('login'));
    closeAuth.addEventListener('click', closeAuthModal);
    toggleAuth.addEventListener('click', (e)=>{ e.preventDefault(); if(fullnameRow.classList.contains('hidden')) openAuth('signup'); else openAuth('login'); });
    authForm.addEventListener('submit', (e)=>{ e.preventDefault(); const em = emailIn.value.trim(); const pw = passwordIn.value; try{ if(fullnameRow.classList.contains('hidden')) login(em,pw); else signup(fullName.value.trim(), em, pw); closeAuthModal(); }catch(err){ alert(err.message); } });
    logoutBtn.addEventListener('click', ()=> { logout(); });

    newPostBtn.addEventListener('click', ()=>{ if(!currentUser) return openAuth('login'); createCard.classList.toggle('hidden'); createText.focus(); });
    postSubmit.addEventListener('click', ()=>{ const t = createText.value; const img = createImage.value || ''; if(!t.trim() && !img.trim()) return showToast('Text or image required'); createPost(t,img); createText.value=''; createImage.value=''; createCard.classList.add('hidden'); });
    cancelPost.addEventListener('click', ()=>{ createCard.classList.add('hidden'); createText.value=''; createImage.value=''; });

    emojiToggle.addEventListener('click', ()=> emojiPanel.classList.toggle('hidden'));
    EMOJIS.forEach(e=>{ const b=document.createElement('button'); b.type='button'; b.className='p-1 text-lg'; b.textContent=e; b.addEventListener('click', ()=>{ createText.value += e; emojiPanel.classList.add('hidden'); createText.focus(); }); emojiPanel.appendChild(b); });

    searchInput.addEventListener('input', renderFeed); sortSelect.addEventListener('change', renderFeed);

    function boot(){ if(posts===null) posts=null; seed(); currentUser = JSON.parse(localStorage.getItem(STORAGE.CURRENT) || 'null'); renderUI(); }

    boot();

    // expose for debugging
    window.MiniSocial = { users, posts, currentUser };