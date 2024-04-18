/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
*/

(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = theme => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    var html = document.querySelector('html');
    html.removeAttribute('data-bs-theme');
    html.setAttribute('data-bs-theme', theme);
  }

  setTheme(getPreferredTheme())

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#bd-toggle')

    if (!themeSwitcher) {
      return
    }
    if (focus) {
      themeSwitcher.focus()
    }
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())
    document.querySelector("#bd-toggle").onclick = function(e){
      var html = document.querySelector('html');
      var theme = html.getAttribute('data-bs-theme');
      if (theme == 'light') {
        var theme = 'dark';
      } else {
        var theme = "light";
      }
      setStoredTheme(theme)
      setTheme(theme)
      showActiveTheme(theme, true)
      var $el = $(this), textNode = this.lastChild;
      $el.find('span').toggleClass('daylight nightlight');
      $el.toggleClass('bd-toggle');
    }
  })
})()
