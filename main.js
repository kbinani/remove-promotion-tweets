$(function() {
  const promiseGetUserIdList = () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(["user_id_list"], function(items) {
        const err = chrome.runtime.lastError;
        if (err) {
          reject(err);
        } else {
          if (items.user_id_list) {
            resolve(items.user_id_list);
          } else {
            resolve({});
          }
        }
      });
    });
  };

  const promiseUpdateUserIdList = (user_id_list) => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({"user_id_list": user_id_list}, function() {
        const err = chrome.runtime.lastError;
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  $("body").on({
    DOMNodeInserted: async () => {
      const user_id_list = await promiseGetUserIdList();
      $("a.js-action-profile-promoted.js-promoted-badge").each(function() {
        const user_id = $(this).attr("data-user-id");
        if (!user_id) {
          return;
        }
        user_id_list[user_id] = 0;
      });
      await promiseUpdateUserIdList(user_id_list);

      $("div.promoted-tweet").each(function() {
        $(this).css("display", "none");
      });
    }
  });
});
