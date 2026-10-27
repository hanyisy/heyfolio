/* =========================================================
   HeyFolio v2 — 인터랙션
   콘텐츠(스킬·프로젝트)는 js/data.js 에서 수정하세요.
   ========================================================= */
(() => {
    'use strict';

    const $ = (sel, el = document) => el.querySelector(sel);
    const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover)').matches;
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const { keywords, skillGroups, skills, projectTypes, projects } = HEYFOLIO;

    // 인트로 로딩 화면 (세션당 한 번만 노출)
    function initIntro() {
        const intro = $('#intro');
        if (!intro) return;
        if (root.classList.contains('intro-seen')) { intro.remove(); return; }

        const count = $('#introCount');
        const duration = 1600;
        let start = null;
        let finished = false;

        const finish = () => {
            if (finished) return;
            finished = true;
            count.textContent = '100';
            intro.classList.add('is-done');
            try { sessionStorage.setItem('heyfolio-intro', '1'); } catch (e) {}
            setTimeout(() => {
                root.classList.add('intro-seen');
                intro.remove();
            }, 700);
        };

        const tick = (time) => {
            if (finished) return;
            if (start === null) start = time;
            const p = Math.min((time - start) / duration, 1);
            count.textContent = Math.round(easeOut(p) * 100);
            if (p < 1) requestAnimationFrame(tick);
            else setTimeout(finish, 400);
        };
        requestAnimationFrame(tick);

        // 클릭하거나 키를 누르면 바로 건너뛰기
        intro.addEventListener('click', finish);
        document.addEventListener('keydown', finish, { once: true });
    }

    // 헤더 그림자 · 진행바 · 맨 위로 버튼
    function initScroll() {
        const header = $('#header');
        const bar = $('#progressBar');
        const toTop = $('#toTop');
        let ticking = false;

        const update = () => {
            const y = window.scrollY;
            const max = root.scrollHeight - window.innerHeight;
            header.classList.toggle('is-scrolled', y > 10);
            bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
            toTop.classList.toggle('is-show', y > window.innerHeight * 0.6);
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        }, { passive: true });
        update();

        toTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
    }

    // 메뉴 (모바일 토글 + 현재 섹션 표시)
    function initNav() {
        const nav = $('#nav');
        const btn = $('#menuToggle');
        const links = $$('a', nav);

        const setOpen = (open) => {
            nav.classList.toggle('is-open', open);
            btn.setAttribute('aria-expanded', open);
            btn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
        };

        btn.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
        links.forEach((a) => a.addEventListener('click', () => setOpen(false)));
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
        document.addEventListener('click', (e) => { if (!e.target.closest('#header')) setOpen(false); });

        const sections = links.map((a) => $(a.getAttribute('href'))).filter(Boolean);
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                links.forEach((a) => {
                    const on = a.getAttribute('href') === `#${entry.target.id}`;
                    a.classList.toggle('is-active', on);
                    if (on) a.setAttribute('aria-current', 'true');
                    else a.removeAttribute('aria-current');
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach((s) => io.observe(s));
    }

    // 다크 모드
    function initTheme() {
        const btn = $('#themeToggle');
        const meta = $('meta[name="theme-color"]');

        const apply = (theme) => {
            root.dataset.theme = theme;
            btn.setAttribute('aria-label', theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환');
            meta.content = theme === 'dark' ? '#0a1822' : '#eef2f4';
        };
        apply(root.dataset.theme === 'dark' ? 'dark' : 'light');

        btn.addEventListener('click', () => {
            const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
            apply(next);
            try { localStorage.setItem('heyfolio-theme', next); } catch (e) {}
        });
    }

    // 히어로 키워드 타이핑
    function initTyping() {
        const el = $('#typing');
        if (!el) return;
        let i = 0;

        if (reduceMotion) {
            setInterval(() => {
                i = (i + 1) % keywords.length;
                el.textContent = `#${keywords[i]}`;
            }, 2200);
            return;
        }

        let text = '';
        let deleting = false;
        const loop = () => {
            const word = `#${keywords[i]}`;
            text = deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1);
            el.textContent = text;

            let delay = deleting ? 70 : 150;
            if (!deleting && text === word) {
                delay = 1600;
                deleting = true;
            } else if (deleting && text === '') {
                deleting = false;
                i = (i + 1) % keywords.length;
                delay = 300;
            }
            setTimeout(loop, delay);
        };
        loop();
    }

    // 스킬 탭
    function initSkills() {
        const tabs = $('#skillTabs');
        const grid = $('#skillGrid');
        const groupLabel = Object.fromEntries(skillGroups.map((g) => [g.id, g.label]));

        tabs.innerHTML = skillGroups.map((g, idx) => {
            const n = g.id === 'all' ? skills.length : skills.filter((s) => s.group === g.id).length;
            return `<button type="button" class="seg__btn" role="tab" id="tab-${g.id}"
                aria-selected="${idx === 0}" aria-controls="skillGrid" tabindex="${idx === 0 ? 0 : -1}"
                data-group="${g.id}">${g.label}<span class="seg__count">${n}</span></button>`;
        }).join('');

        const render = (group) => {
            const list = group === 'all' ? skills : skills.filter((s) => s.group === group);
            grid.setAttribute('aria-labelledby', `tab-${group}`);
            grid.innerHTML = list.map((s, i) => `
                <article class="skill-card" style="--i:${i}">
                    <div class="skill-card__icon"><img src="${s.icon}" alt="" loading="lazy"></div>
                    <div>
                        <span class="skill-card__group">${groupLabel[s.group]}</span>
                        <h3>${s.name}</h3>
                        <p>${s.desc}</p>
                    </div>
                </article>`).join('');
        };

        const select = (btn) => {
            $$('.seg__btn', tabs).forEach((b) => {
                const on = b === btn;
                b.setAttribute('aria-selected', on);
                b.tabIndex = on ? 0 : -1;
            });
            render(btn.dataset.group);
        };

        tabs.addEventListener('click', (e) => {
            const btn = e.target.closest('.seg__btn');
            if (btn) select(btn);
        });

        // 방향키로 탭 이동
        tabs.addEventListener('keydown', (e) => {
            const btns = $$('.seg__btn', tabs);
            const idx = btns.indexOf(document.activeElement);
            if (idx < 0) return;
            const keyMap = {
                ArrowRight: btns[(idx + 1) % btns.length],
                ArrowLeft: btns[(idx - 1 + btns.length) % btns.length],
                Home: btns[0],
                End: btns[btns.length - 1]
            };
            const next = keyMap[e.key];
            if (!next) return;
            e.preventDefault();
            next.focus();
            select(next);
        });

        render('all');
    }

    // 프로젝트 필터 + 상세 모달
    function initProjects() {
        const filters = $('#projectFilters');
        const grid = $('#projectGrid');
        const modal = $('#projectModal');
        const preview = $('#modalPreview');
        const img = $('#modalImg');
        const typeLabel = Object.fromEntries(projectTypes.map((t) => [t.id, t.label]));
        let current = projects;
        let index = 0;

        filters.innerHTML = projectTypes.map((t, idx) => {
            const n = t.id === 'all' ? projects.length : projects.filter((p) => p.type === t.id).length;
            return `<button type="button" class="seg__btn" aria-pressed="${idx === 0}" data-type="${t.id}">
                ${t.label}<span class="seg__count">${n}</span></button>`;
        }).join('');

        const render = (type) => {
            current = type === 'all' ? projects : projects.filter((p) => p.type === type);
            grid.innerHTML = current.map((p, i) => `
                <article class="project-card" style="--i:${i}">
                    <button type="button" class="project-card__btn" data-index="${i}" aria-haspopup="dialog">
                        <span class="project-card__thumb">
                            <img src="${p.thumb}" alt="${p.name} 메인 화면" loading="lazy" decoding="async">
                        </span>
                        <span class="project-card__body">
                            <span class="badge badge--${p.type}">${typeLabel[p.type]}</span>
                            <span class="project-card__title">${p.name}</span>
                            <span class="project-card__summary">${p.summary}</span>
                            <span class="tag-row">${p.tags.slice(0, 4).map((t) => `<span>#${t}</span>`).join('')}</span>
                        </span>
                    </button>
                </article>`).join('');
        };

        filters.addEventListener('click', (e) => {
            const btn = e.target.closest('.seg__btn');
            if (!btn) return;
            $$('.seg__btn', filters).forEach((b) => b.setAttribute('aria-pressed', b === btn));
            render(btn.dataset.type);
        });

        const fill = (i) => {
            index = (i + current.length) % current.length;
            const p = current[index];
            $('#modalType').textContent = typeLabel[p.type];
            $('#modalType').className = `badge badge--${p.type}`;
            $('#modalSummary').textContent = p.summary;
            $('#modalTitle').textContent = p.name;
            $('#modalTags').innerHTML = p.tags.map((t) => `<li>#${t}</li>`).join('');
            $('#modalDesc').innerHTML = `<p>${p.text1}</p><p>${p.text2}</p>`;
            $('#modalLink').href = p.link;
            $('#modalCount').textContent = `${index + 1} / ${current.length}`;
            $('#modalPrev').disabled = $('#modalNext').disabled = current.length < 2;

            img.style.transition = 'none';
            img.style.transform = 'translateY(0)';
            img.src = p.preview;
            img.alt = `${p.name} 전체 페이지 미리보기`;
            preview.scrollTop = 0;
        };

        grid.addEventListener('click', (e) => {
            const btn = e.target.closest('.project-card__btn');
            if (!btn) return;
            fill(Number(btn.dataset.index));
            modal.showModal();
        });

        $('#modalPrev').addEventListener('click', () => fill(index - 1));
        $('#modalNext').addEventListener('click', () => fill(index + 1));
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.closest('[data-close]')) modal.close();
        });
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') fill(index - 1);
            if (e.key === 'ArrowRight') fill(index + 1);
        });

        // 미리보기: 마우스를 올리면 긴 화면을 아래까지 자동 스크롤
        if (canHover) {
            const scrollPreview = (down) => {
                const distance = img.offsetHeight - preview.clientHeight;
                if (distance <= 0) return;
                const sec = down ? Math.max(2, distance / 450) : 0.8;
                img.style.transition = `transform ${sec}s ${down ? 'linear' : 'cubic-bezier(.2,.8,.2,1)'}`;
                img.style.transform = `translateY(${down ? -distance : 0}px)`;
            };
            preview.addEventListener('mouseenter', () => scrollPreview(true));
            preview.addEventListener('mouseleave', () => scrollPreview(false));
            preview.addEventListener('focus', () => scrollPreview(true));
            preview.addEventListener('blur', () => scrollPreview(false));
        }

        render('all');
    }

    // 스크롤 등장 애니메이션
    function initReveal() {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        $$('.reveal').forEach((el) => io.observe(el));
    }

    // About 숫자 카운트업
    function initCounters() {
        $('#statProjects').dataset.count = projects.length;
        $('#statSkills').dataset.count = skills.length;

        const countUp = (el) => {
            const end = Number(el.dataset.count);
            if (reduceMotion) { el.textContent = end; return; }
            const duration = 1200;
            let start = null;
            const step = (time) => {
                if (start === null) start = time;
                const p = Math.min((time - start) / duration, 1);
                el.textContent = Math.round(easeOut(p) * end);
                if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        };

        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                io.unobserve(entry.target);
                countUp(entry.target);
            });
        }, { threshold: 0.6 });
        $$('[data-count]').forEach((el) => io.observe(el));
    }

    // 이메일 복사
    function initCopy() {
        const btn = $('#copyEmail');
        const toast = $('#toast');
        let timer;

        const show = (msg) => {
            toast.textContent = msg;
            toast.classList.add('is-show');
            clearTimeout(timer);
            timer = setTimeout(() => toast.classList.remove('is-show'), 2200);
        };

        btn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(btn.dataset.email);
                show('이메일 주소를 복사했어요 📋');
            } catch (e) {
                show(btn.dataset.email);
            }
        });
    }

    initIntro();
    initScroll();
    initNav();
    initTheme();
    initTyping();
    initSkills();
    initProjects();
    initReveal();
    initCounters();
    initCopy();
})();
