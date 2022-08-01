userbase.init({ appId: '3f437452-5213-4dbe-9500-45cef6c70c21' })
    .then((session) => session.user ? showProfile(session.user.username) : showAuth())
    .catch(() => showAuth())
    .finally(() => document.getElementById('loading-view').classList.add('none'))