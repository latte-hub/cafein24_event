// 관리자 페이지(admin.html / seed.html) 공통 코드
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { firebaseConfig, EVENT } from "./firebase-config.js";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export { EVENT };

export const $ = id => document.getElementById(id);
export const won = n => (n||0).toLocaleString('ko-KR');
export const fmtPhone = d => d && d.length===11 ? d.slice(0,3)+'-'+d.slice(3,7)+'-'+d.slice(7) : (d||'');
export const fmtTime = ts => { if(!ts) return ''; const d = ts.toDate ? ts.toDate() : new Date(ts); const p = n => String(n).padStart(2,'0'); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`; };
export const isAdminEmail = email => !!email && email.toLowerCase().endsWith('@'+EVENT.adminDomain);
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// 로그인 게이트: 관리자면 onReady(user), 아니면 로그인 화면 유지
export function requireAdmin(onReady){
  const gate = $('gate'), main = $('main'), msg = $('gate-msg');
  $('btn-login').addEventListener('click', async () => {
    msg.textContent = '';
    try{
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ hd: EVENT.adminDomain, prompt:'select_account' });
      await signInWithPopup(auth, provider);
    }catch(e){ console.error(e); msg.textContent = '로그인에 실패했어요. 팝업 차단을 풀고 다시 시도해 주세요. ('+e.code+')'; }
  });
  document.querySelectorAll('[data-logout]').forEach(b => b.addEventListener('click', () => signOut(auth)));
  onAuthStateChanged(auth, user => {
    if(user && isAdminEmail(user.email)){
      gate.hidden = true; main.hidden = false;
      document.querySelectorAll('[data-logout]').forEach(b => b.hidden = false);
      document.querySelectorAll('[data-user]').forEach(el => el.textContent = user.email);
      onReady(user);
    }else{
      gate.hidden = false; main.hidden = true;
      if(user){ msg.textContent = `${user.email} 은(는) 관리자 계정이 아니에요. @${EVENT.adminDomain} 구글 계정으로 로그인해 주세요.`; signOut(auth); }
    }
  });
}

// CSV 내려받기 (엑셀에서 한글이 깨지지 않도록 BOM 포함)
export function downloadCsv(filename, header, rows){
  const cell = v => { const s = String(v ?? ''); return /[",\n]/.test(s) ? '"'+s.replace(/"/g,'""')+'"' : s; };
  const text = [header, ...rows].map(r => r.map(cell).join(',')).join('\r\n');
  const blob = new Blob(['﻿'+text], { type:'text/csv;charset=utf-8' });
  const a = Object.assign(document.createElement('a'), { href:URL.createObjectURL(blob), download:filename });
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}

// 스티커 번호 문자 (0/O, 1/I 처럼 헷갈리는 글자 제외)
export const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export function randomCode(storeCode){
  const a = new Uint32Array(6); crypto.getRandomValues(a);
  return storeCode + '-' + Array.from(a, n => CODE_CHARS[n % CODE_CHARS.length]).join('');
}
export function shuffle(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } return arr; }

// 이 저장소가 열린 주소 기준으로 play.html 절대주소 만들기
export const baseUrl = () => location.href.replace(/[^/]*$/, '');
export const playUrl = code => baseUrl() + 'play.html?c=' + code;
