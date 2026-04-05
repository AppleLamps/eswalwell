(() => {
  const socialData = [
    {d:'Oct 7',v:2.5},{d:'Oct 8',v:12.2},{d:'Oct 9',v:3.8},{d:'Oct 10',v:3.2},{d:'Oct 15',v:2.3},
    {d:'Oct 19',v:2.7},{d:'Oct 27',v:2.2},{d:'Nov 7',v:2.5},{d:'Nov 10',v:4.4},{d:'Nov 12',v:13.4},
    {d:'Nov 13',v:22.3},{d:'Nov 14',v:13.1},{d:'Nov 15',v:4.1},{d:'Nov 16',v:2.8},{d:'Nov 21',v:5.4},
    {d:'Nov 22',v:4.6},{d:'Nov 23',v:4.4},{d:'Nov 24',v:4.4},{d:'Nov 25',v:3.8},{d:'Nov 26',v:4.3},
    {d:'Dec 2',v:4.8},{d:'Dec 14',v:2.5},{d:'Dec 15',v:3.3},{d:'Dec 16',v:3.5},{d:'Dec 17',v:2.9},
    {d:'Dec 18',v:5.7},{d:'Dec 19',v:4.7},{d:'Dec 20',v:4.6},{d:'Jan 8',v:3.7},{d:'Jan 9',v:4.4},
    {d:'Jan 11',v:5.7},{d:'Jan 12',v:4.1},{d:'Jan 17',v:4.4},{d:'Jan 18',v:5.0},{d:'Jan 19',v:3.9},
    {d:'Jan 22',v:2.8},{d:'Jan 23',v:2.7},{d:'Jan 24',v:3.6},{d:'Feb 4',v:1.9},{d:'Feb 5',v:2.3},
    {d:'Feb 10',v:3.8},{d:'Feb 11',v:4.7},{d:'Feb 12',v:3.0},{d:'Feb 17',v:3.0},{d:'Feb 20',v:0.9},
    {d:'Mar 1',v:11.7},{d:'Mar 2',v:5.2},{d:'Mar 12',v:3.9},{d:'Mar 13',v:3.4},{d:'Mar 21',v:2.0},
    {d:'Mar 22',v:2.1},{d:'Mar 23',v:1.7},{d:'Mar 25',v:2.5},{d:'Mar 27',v:2.0},{d:'Mar 28',v:2.2},
    {d:'Mar 29',v:7.9},{d:'Mar 30',v:4.6},{d:'Mar 31',v:7.9},{d:'Apr 1',v:6.1},{d:'Apr 2',v:13.3},
    {d:'Apr 3',v:7.5}
  ];

  function filterFindings(severity, evt) {
    const rows = document.querySelectorAll('#findings-table tbody tr');
    if (!rows.length) {
      return;
    }

    const buttons = document.querySelectorAll('.filter-btn[data-severity]');
    const clickedButton = evt?.currentTarget || evt?.target;

    buttons.forEach((btn) => btn.classList.remove('active'));
    if (clickedButton && clickedButton.classList) {
      clickedButton.classList.add('active');
    }

    rows.forEach((row) => {
      row.style.display =
        severity === 'all' || row.dataset.sev === severity ? '' : 'none';
    });
  }

  function bindFilters() {
    const buttons = document.querySelectorAll('.filter-btn[data-severity]');
    buttons.forEach((btn) => {
      btn.addEventListener('click', (evt) => filterFindings(btn.dataset.severity, evt));
    });
  }

  function wrapTablesForResponsiveOverflow() {
    const tables = document.querySelectorAll('table');
    tables.forEach((table) => {
      if (table.parentElement.classList.contains('table-wrap')) {
        return;
      }
      const wrapper = document.createElement('div');
      wrapper.className = 'table-wrap';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }

  function initScrollSpy() {
    const links = Array.from(document.querySelectorAll('.nav a[href^="#"], .section-jump-fab a[href^="#"]'));
    const sections = links
      .map((link) => {
        const id = link.getAttribute('href')?.slice(1);
        const section = id ? document.getElementById(id) : null;
        return { id, section, link };
      })
      .filter((item) => item.section);

    if (!sections.length) {
      return;
    }

    function updateActiveLink() {
      const scrollPosition = window.scrollY + 140;
      let currentId = sections[0].id;

      sections.forEach((item) => {
        if (item.section.offsetTop <= scrollPosition) {
          currentId = item.id;
        }
      });

      links.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${currentId}`;
        link.classList.toggle('active', isActive);
      });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
  }

  function initSectionJumpFab() {
    const fab = document.querySelector('.section-jump-fab');
    if (!fab) {
      return;
    }

    const toggle = document.getElementById('section-jump-toggle');
    const menu = document.getElementById('section-jump-menu');

    const setOpen = (open) => {
      fab.classList.toggle('open', open);
      if (toggle) {
        toggle.setAttribute('aria-expanded', String(open));
      }
    };

    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        setOpen(!fab.classList.contains('open'));
      });

      menu.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
          setOpen(false);
        }
      });
    }

    document.addEventListener('click', (event) => {
      if (!fab.contains(event.target)) {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    });
  }

  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) {
      return;
    }

    function toggleBackToTop() {
      btn.classList.toggle('visible', window.scrollY > 300);
    }

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    toggleBackToTop();
  }

  function renderSocialChart() {
    const chart = document.getElementById('social-chart');
    if (!chart) {
      return;
    }

    chart.setAttribute('role', 'img');
    chart.setAttribute('aria-label', 'Daily social interaction chart');

    const maxValue = Math.max(...socialData.map((d) => d.v));

    socialData.forEach((item) => {
      const bar = document.createElement('div');
      bar.className = 'chart-bar';
      bar.style.height = `${(item.v / maxValue) * 100}%`;

      if (item.v > 10) {
        bar.style.background = 'var(--critical)';
      } else if (item.v > 5) {
        bar.style.background = 'var(--high)';
      } else {
        bar.style.background = 'var(--text-tertiary)';
      }

      bar.innerHTML = `<span class="tooltip">${item.d}: ${item.v}M</span>`;
      chart.appendChild(bar);
    });
  }

  function init() {
    bindFilters();
    wrapTablesForResponsiveOverflow();
    initScrollSpy();
    initSectionJumpFab();
    initBackToTop();
    renderSocialChart();
  }

  window.filterFindings = filterFindings;

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
