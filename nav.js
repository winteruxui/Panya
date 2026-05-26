(function () {
  var isOpen = false;

  window.toggleUserMenu = function () {
    var popup = document.getElementById('user-popup');
    var row = document.querySelector('.user-row');
    if (!popup) return;
    isOpen = !isOpen;
    popup.classList.toggle('open', isOpen);
    if (row) row.classList.toggle('menu-open', isOpen);
  };

  window.signOut = function () {
    localStorage.removeItem('panya_token');
    window.location.href = 'signin.html';
  };

  document.addEventListener('click', function (e) {
    if (!isOpen) return;
    var popup = document.getElementById('user-popup');
    var row = document.querySelector('.user-row');
    if (!popup) return;
    if (popup.contains(e.target) || (row && row.contains(e.target))) return;
    isOpen = false;
    popup.classList.remove('open');
    if (row) row.classList.remove('menu-open');
  });
})();
