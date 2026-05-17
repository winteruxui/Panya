/* Panya toast notification system
 * Usage: toast(message, type?, duration?)
 * Types: 'success' | 'error' | 'warning' | 'info'
 * Requires toast CSS from shared.css
 */
(function () {
  var TITLES = {
    success: 'Success',
    error:   'Error',
    warning: 'Warning',
    info:    'Info',
  };

  function getContainer() {
    var c = document.getElementById('toast-container');
    if (!c) {
      c = document.createElement('div');
      c.id = 'toast-container';
      document.body.appendChild(c);
    }
    return c;
  }

  function dismiss(el) {
    el.classList.add('toast-out');
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 220);
  }

  window.toast = function (message, type, duration) {
    type     = type     || 'success';
    duration = duration || 4000;

    var el = document.createElement('div');
    el.className = 'toast toast-' + type;

    /* icon — styled via CSS ::before */
    var iconEl = document.createElement('div');
    iconEl.className = 'toast-icon';
    el.appendChild(iconEl);

    /* body */
    var body = document.createElement('div');
    body.className = 'toast-body';

    var titleEl = document.createElement('div');
    titleEl.className = 'toast-title';
    titleEl.textContent = TITLES[type] || 'Notice';
    body.appendChild(titleEl);

    var msgEl = document.createElement('div');
    msgEl.className = 'toast-msg';
    msgEl.textContent = message;
    body.appendChild(msgEl);

    el.appendChild(body);

    /* close button */
    var closeBtn = document.createElement('button');
    closeBtn.className = 'toast-close';
    closeBtn.setAttribute('aria-label', 'Dismiss');
    closeBtn.textContent = '×';
    closeBtn.style.fontSize = '18px';
    closeBtn.style.lineHeight = '1';
    el.appendChild(closeBtn);

    /* progress bar */
    var bar = document.createElement('div');
    bar.className = 'toast-progress';
    bar.style.animationDuration = duration + 'ms';
    el.appendChild(bar);

    getContainer().appendChild(el);

    var timer = setTimeout(function () { dismiss(el); }, duration);

    closeBtn.addEventListener('click', function () {
      clearTimeout(timer);
      dismiss(el);
    });

    return el;
  };
})();
